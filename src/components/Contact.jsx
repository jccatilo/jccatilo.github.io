import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { FaEnvelope, FaPhone, FaGithub, FaGlobe, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

function ContactSphere() {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.5}>
      <MeshDistortMaterial
        color="#7b2ff7"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
      />
    </Sphere>
  )
}

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'catilo.johncarlo07@gmail.com',
    href: 'mailto:catilo.johncarlo07@gmail.com',
    color: '#00d4ff'
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '(+63) 908-266-5764',
    href: 'tel:+639082665764',
    color: '#00d4ff'
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/jccatilo',
    href: 'https://github.com/jccatilo',
    color: '#7b2ff7'
  },
  {
    icon: FaGlobe,
    label: 'Portfolio',
    value: 'jccatilo.github.io',
    href: 'https://jccatilo.github.io',
    color: '#7b2ff7'
  }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 50px',
        background: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background 3D Element */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '10%',
        transform: 'translateY(-50%)',
        width: '300px',
        height: '300px',
        opacity: 0.3,
        zIndex: 1
      }}>
        <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ContactSphere />
        </Canvas>
      </div>

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Get In Touch
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '18px',
              marginBottom: '60px',
              maxWidth: '600px',
              margin: '0 auto 60px'
            }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your team.
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon
              return (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '30px',
                    background: 'var(--light-gray)',
                    borderRadius: '15px',
                    border: `1px solid ${contact.color}40`,
                    textDecoration: 'none',
                    color: 'var(--text)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${contact.color}80`
                    e.currentTarget.style.boxShadow = `0 10px 30px ${contact.color}30`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${contact.color}40`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `${contact.color}20`,
                    border: `2px solid ${contact.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <Icon style={{ fontSize: '24px', color: contact.color }} />
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    color: contact.color
                  }}>
                    {contact.label}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    margin: 0,
                    wordBreak: 'break-word'
                  }}>
                    {contact.value}
                  </p>
                </motion.a>
              )
            })}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              textAlign: 'center',
              padding: '40px 20px',
              borderTop: '1px solid rgba(0, 212, 255, 0.2)',
              marginTop: '60px'
            }}
          >
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '16px',
              marginBottom: '20px'
            }}>
              © 2024 John Carlo A. Catilo. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://github.com/jccatilo"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <FaGithub />
              </a>
              <a
                href="mailto:catilo.johncarlo07@gmail.com"
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '20px',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                <FaEnvelope />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
