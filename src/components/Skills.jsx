import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

function SkillSphere({ skill, index }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * (0.2 + index * 0.1)
      meshRef.current.rotation.y = state.clock.elapsedTime * (0.3 + index * 0.1)
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.5, 32, 32]} position={[index * 2 - 2, 0, 0]}>
      <MeshDistortMaterial
        color={index % 2 === 0 ? "#00d4ff" : "#7b2ff7"}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.6}
      />
    </Sphere>
  )
}

const skillCategories = [
  {
    category: 'Hardware & Electronics',
    skills: [
      'PCB Design (KiCAD)',
      'Microcontrollers (Arduino)',
      'Embedded Systems',
      'Hardware Prototyping',
      '3D Modeling (AutoCAD)',
      '3D Printing (CURA)',
      'Laser Cutting',
      'RS485 Sensor Systems'
    ],
    color: '#00d4ff'
  },
  {
    category: 'Programming & Development',
    skills: [
      'Python',
      'Arduino Programming',
      'Linux Server Management',
      'Automation Scripts',
      'IoT Development',
      'Network Programming'
    ],
    color: '#7b2ff7'
  },
  {
    category: 'Systems & Infrastructure',
    skills: [
      'Linux Server Operation',
      'Server Deployment',
      'Application Maintenance',
      'Network Security',
      'Device Monitoring',
      'Uptime Management'
    ],
    color: '#00d4ff'
  },
  {
    category: 'AI & IoT',
    skills: [
      'NVIDIA Jetson Development',
      'IoT Systems',
      'Sensor Integration',
      'Actuator Controls',
      'Weather Station Systems',
      'Dashboard Development'
    ],
    color: '#7b2ff7'
  }
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 50px',
        background: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        width: '100%'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '60px',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Skills & Expertise
          </h2>

          {/* 3D Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              height: '300px',
              marginBottom: '80px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'var(--dark-gray)',
              border: '1px solid rgba(0, 212, 255, 0.2)'
            }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7b2ff7" />
              {[0, 1, 2, 3].map((i) => (
                <SkillSphere key={i} skill={skillCategories[i]} index={i} />
              ))}
            </Canvas>
          </motion.div>

          {/* Skills Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                style={{
                  padding: '30px',
                  background: 'var(--light-gray)',
                  borderRadius: '15px',
                  border: `1px solid ${category.color}40`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${category.color}80`
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 10px 30px ${category.color}30`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${category.color}40`
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: category.color,
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{
                    width: '4px',
                    height: '24px',
                    background: category.color,
                    borderRadius: '2px'
                  }} />
                  {category.category}
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 + skillIndex * 0.05 }}
                      style={{
                        padding: '10px 15px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        border: `1px solid ${category.color}20`
                      }}
                    >
                      <p style={{
                        color: 'var(--text)',
                        fontSize: '15px',
                        margin: 0
                      }}>
                        {skill}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
