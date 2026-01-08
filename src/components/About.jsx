import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 50px',
        background: 'var(--dark-gray)',
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
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            About Me
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            marginTop: '60px'
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                padding: '30px',
                background: 'var(--light-gray)',
                borderRadius: '20px',
                border: '1px solid rgba(0, 212, 255, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: '24px',
                marginBottom: '15px',
                color: '#00d4ff'
              }}>
                Professional Summary
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                fontSize: '16px'
              }}>
                A developer with 8+ years of experience developing and maintaining projects 
                involving microcontrollers, Python, Linux Servers, and their hardware counterparts. 
                Passionate about pursuing a career in IT that designs/maintains software and devices 
                for network security, productivity, and automation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                padding: '30px',
                background: 'var(--light-gray)',
                borderRadius: '20px',
                border: '1px solid rgba(123, 47, 247, 0.2)'
              }}
            >
              <h3 style={{
                fontSize: '24px',
                marginBottom: '15px',
                color: '#7b2ff7'
              }}>
                Current Focus
              </h3>
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                fontSize: '16px'
              }}>
                Currently working as a University Research Associate II at Batangas State University, 
                focusing on PCB design, server deployment, and maintaining applications. Contributing 
                to innovative IoT and AI projects while providing consultation services for student 
                and faculty researchers.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              marginTop: '60px',
              padding: '40px',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 247, 0.1))',
              borderRadius: '20px',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              textAlign: 'center'
            }}
          >
            <h3 style={{
              fontSize: '28px',
              marginBottom: '20px',
              color: '#00d4ff'
            }}>
              What I Do
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px',
              marginTop: '30px'
            }}>
              {[
                'PCB Design & Hardware Development',
                'Python Programming & Automation',
                'Linux Server Management',
                'IoT & Embedded Systems',
                'Network Security',
                '3D Modeling & CAD'
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  style={{
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    border: '1px solid rgba(0, 212, 255, 0.2)'
                  }}
                >
                  <p style={{
                    color: 'var(--text)',
                    fontSize: '16px'
                  }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
