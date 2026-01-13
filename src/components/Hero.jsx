import { useRef, Suspense, useState, useEffect, forwardRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { FaGithub, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa'
import { useHandTracking } from '../hooks/useHandTracking'
import HandVisualization from './HandVisualization'

function InteractiveObject({ handPosition }) {
  const meshRef = useRef()
  const targetPosition = useRef({ x: 0, y: 0, z: 0 })
  const targetRotation = useRef({ x: 0, y: 0 })
  const targetScale = useRef(1)
  const isGrabbing = useRef(false)
  
  useEffect(() => {
    if (handPosition && Array.isArray(handPosition) && handPosition.length > 0) {
      const primaryHand = handPosition[0] // First hand is primary
      const secondaryHand = handPosition[1] // Second hand if available
      
      // GRAB AND DRAG: Use primary hand position directly for position control
      // Map hand position (0-1) to 3D space coordinates
      targetPosition.current.x = (primaryHand.x - 0.5) * 4
      targetPosition.current.y = -(primaryHand.y - 0.5) * 3
      targetPosition.current.z = (primaryHand.z || 0) * 2 - 1
      
      // PINCH TO SCALE: Use pinch distance to control scale
      // Pinch distance: 0 (pinched) to 1 (open)
      // Invert so pinching makes it smaller, opening makes it bigger
      const pinchScale = primaryHand.pinchDistance || 0.5
      // Scale from 0.5 (min when pinched) to 2.0 (max when open)
      targetScale.current = 0.5 + pinchScale * 1.5
      
      // TWO-HAND SUPPORT: Average position if two hands, or use relative distance for rotation
      if (secondaryHand) {
        // Average position of both hands for more stable control
        targetPosition.current.x = ((primaryHand.x + secondaryHand.x) / 2 - 0.5) * 4
        targetPosition.current.y = -((primaryHand.y + secondaryHand.y) / 2 - 0.5) * 3
        targetPosition.current.z = ((primaryHand.z + secondaryHand.z) / 2 || 0) * 2 - 1
        
        // Rotation based on relative position of hands
        const handDiffX = secondaryHand.x - primaryHand.x
        const handDiffY = secondaryHand.y - primaryHand.y
        targetRotation.current.y = handDiffX * Math.PI
        targetRotation.current.x = -handDiffY * Math.PI
        
        // Two-hand scale: use average pinch distance
        const avgPinch = (primaryHand.pinchDistance + secondaryHand.pinchDistance) / 2
        targetScale.current = 0.5 + avgPinch * 1.5
      } else {
        // Single hand: rotation based on position
        targetRotation.current.y = (primaryHand.x - 0.5) * Math.PI * 2
        targetRotation.current.x = (primaryHand.y - 0.5) * Math.PI * 2
      }
      
      isGrabbing.current = primaryHand.isPinched
    } else if (handPosition && !Array.isArray(handPosition)) {
      // Backward compatibility: single hand object format
      targetPosition.current.x = (handPosition.x - 0.5) * 4
      targetPosition.current.y = -(handPosition.y - 0.5) * 3
      targetPosition.current.z = (handPosition.z || 0) * 2 - 1
      targetRotation.current.y = (handPosition.x - 0.5) * Math.PI * 2
      targetRotation.current.x = (handPosition.y - 0.5) * Math.PI * 2
      targetScale.current = 1 + (handPosition.z || 0) * 1.5
    } else {
      // Reset to center and default scale when no hand
      targetPosition.current = { x: 0, y: 0, z: 0 }
      targetRotation.current = { x: 0, y: 0 }
      targetScale.current = 1
      isGrabbing.current = false
    }
  }, [handPosition])
  
  useFrame((state) => {
    if (meshRef.current) {
      // GRAB AND DRAG: More direct control (faster interpolation when grabbing)
      const lerpSpeed = isGrabbing.current ? 0.3 : 0.15
      
      // Smoothly interpolate position
      meshRef.current.position.x += (targetPosition.current.x - meshRef.current.position.x) * lerpSpeed
      meshRef.current.position.y += (targetPosition.current.y - meshRef.current.position.y) * lerpSpeed
      meshRef.current.position.z += (targetPosition.current.z - meshRef.current.position.z) * lerpSpeed
      
      // Smoothly interpolate rotation
      meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.1
      meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.1
      
      // Smoothly interpolate scale (faster when pinching for responsive feel)
      const scaleSpeed = isGrabbing.current ? 0.2 : 0.1
      const currentScale = meshRef.current.scale.x
      const scaleDiff = targetScale.current - currentScale
      meshRef.current.scale.x += scaleDiff * scaleSpeed
      meshRef.current.scale.y += scaleDiff * scaleSpeed
      meshRef.current.scale.z += scaleDiff * scaleSpeed
      
      // Auto-rotate when no hand detected
      if (!handPosition || (Array.isArray(handPosition) && handPosition.length === 0)) {
        meshRef.current.rotation.x += 0.002
        meshRef.current.rotation.y += 0.003
      }
    }
  })

  return (
    <AtomStructure ref={meshRef} />
  )
}

const AtomStructure = forwardRef(function AtomStructure(props, meshRef) {
  const groupRef = useRef()
  const orbit1Ref = useRef()
  const orbit2Ref = useRef()
  const orbit3Ref = useRef()
  const electron1Ref = useRef()
  const electron2Ref = useRef()
  const electron3Ref = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate electron orbits
      const time = state.clock.elapsedTime
      
      if (orbit1Ref.current) {
        orbit1Ref.current.rotation.y = time * 0.5
        orbit1Ref.current.rotation.x = time * 0.3
      }
      if (orbit2Ref.current) {
        orbit2Ref.current.rotation.y = -time * 0.4
        orbit2Ref.current.rotation.z = time * 0.5
      }
      if (orbit3Ref.current) {
        orbit3Ref.current.rotation.x = time * 0.6
        orbit3Ref.current.rotation.z = -time * 0.4
      }
      
      // Move electrons along orbits
      if (electron1Ref.current) {
        const radius = 1.2
        electron1Ref.current.position.x = Math.cos(time * 0.5) * radius
        electron1Ref.current.position.z = Math.sin(time * 0.5) * radius
        electron1Ref.current.position.y = Math.sin(time * 0.3) * 0.3
      }
      if (electron2Ref.current) {
        const radius = 1.0
        electron2Ref.current.position.x = Math.cos(-time * 0.4) * radius
        electron2Ref.current.position.y = Math.sin(-time * 0.4) * radius
        electron2Ref.current.position.z = Math.cos(time * 0.5) * 0.5
      }
      if (electron3Ref.current) {
        const radius = 1.1
        electron3Ref.current.position.y = Math.cos(time * 0.6) * radius
        electron3Ref.current.position.z = Math.sin(time * 0.6) * radius
        electron3Ref.current.position.x = Math.sin(-time * 0.4) * 0.4
      }
    }
  })

  return (
    <group ref={(node) => {
      groupRef.current = node
      if (meshRef && typeof meshRef === 'function') {
        meshRef(node)
      } else if (meshRef) {
        meshRef.current = node
      }
    }}>
      {/* Nucleus - Central core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Nucleus glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Electron Orbit 1 - Horizontal */}
      <group ref={orbit1Ref}>
        <mesh>
          <torusGeometry args={[1.2, 0.02, 8, 100]} />
          <meshStandardMaterial
            color="#7b2ff7"
            emissive="#7b2ff7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Electron 1 */}
        <mesh ref={electron1Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ffaa00"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Electron Orbit 2 - Vertical */}
      <group ref={orbit2Ref}>
        <mesh>
          <torusGeometry args={[1.0, 0.02, 8, 100]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial
            color="#7b2ff7"
            emissive="#7b2ff7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Electron 2 */}
        <mesh ref={electron2Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ffaa00"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Electron Orbit 3 - Diagonal */}
      <group ref={orbit3Ref}>
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.1, 0.02, 8, 100]} />
          <meshStandardMaterial
            color="#7b2ff7"
            emissive="#7b2ff7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
          />
        </mesh>
        {/* Electron 3 */}
        <mesh ref={electron3Ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ffaa00"
            emissive="#ffaa00"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  )
})

function FloatingParticles() {
  const particles = useRef()
  const particleCount = 100
  
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" />
    </points>
  )
}

export default function Hero() {
  const [handPosition, setHandPosition] = useState(null)
  const { isInitialized, error } = useHandTracking(setHandPosition)

  const scrollToSection = (id) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)'
      }}
    >
      {/* 3D Canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2ff7" />
            <InteractiveObject handPosition={handPosition} />
            <FloatingParticles />
            {handPosition && <HandVisualization handData={handPosition} />}
            {!handPosition && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '1200px',
        padding: '0 20px',
        marginTop: '80px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            style={{
              fontSize: 'clamp(40px, 8vw, 80px)',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2
            }}
          >
            John Carlo A. Catilo
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              fontSize: 'clamp(18px, 3vw, 28px)',
              color: 'var(--text-muted)',
              marginBottom: '10px'
            }}
          >
            Electronics Engineer & Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'var(--text-muted)',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}
          >
            8+ years of experience developing and maintaining projects involving microcontrollers, 
            Python, Linux Servers, and hardware. Passionate about network security, productivity, and automation.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}
          >
            <motion.a
              href="https://github.com/jccatilo"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'var(--text)',
                fontSize: '24px',
                padding: '12px',
                borderRadius: '50%',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="mailto:catilo.johncarlo07@gmail.com"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'var(--text)',
                fontSize: '24px',
                padding: '12px',
                borderRadius: '50%',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <FaEnvelope />
            </motion.a>
            <motion.a
              href="tel:+639082665764"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'var(--text)',
                fontSize: '24px',
                padding: '12px',
                borderRadius: '50%',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <FaPhone />
            </motion.a>
            <motion.a
              href="https://jccatilo.github.io"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: 'var(--text)',
                fontSize: '24px',
                padding: '12px',
                borderRadius: '50%',
                background: 'rgba(0, 212, 255, 0.1)',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <FaGlobe />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <motion.button
              onClick={() => scrollToSection('#projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                border: 'none',
                borderRadius: '50px',
                color: 'var(--text)',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)'
              }}
            >
              View Projects
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '15px 40px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: 'transparent',
                border: '2px solid #00d4ff',
                borderRadius: '50px',
                color: '#00d4ff',
                cursor: 'pointer'
              }}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '30px',
            height: '50px',
            border: '2px solid #00d4ff',
            borderRadius: '25px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '10px'
          }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '6px',
              height: '10px',
              background: '#00d4ff',
              borderRadius: '3px'
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
