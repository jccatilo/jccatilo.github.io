import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { FaGraduationCap, FaCertificate } from 'react-icons/fa'

const education = [
  {
    degree: 'Master of Science in Artificial Intelligence',
    institution: 'Batangas State University Main Campus II',
    period: '2021 - Present',
    type: 'Graduate'
  },
  {
    degree: 'Bachelor of Science in Electronics Engineering, Major in Information and Computing Technology',
    institution: 'Batangas State University Main Campus II',
    period: '2012 - 2017',
    type: 'Undergraduate'
  }
]

const certifications = [
  {
    name: 'Electronics Engineer License',
    issuer: 'Professional Regulation Commission of the Philippines',
    licenseNo: '0069142',
    type: 'License'
  },
  {
    name: 'Electronics Technician License',
    issuer: 'Professional Regulation Commission of the Philippines',
    licenseNo: '0015995',
    type: 'License'
  },
  {
    name: 'IT Security: Defense against the digital arts',
    issuer: 'Coursera',
    date: 'September 2020',
    credentialId: 'H8Q2NVU3A4WZ',
    type: 'Certificate'
  },
  {
    name: 'Crash Course on Python',
    issuer: 'Coursera',
    date: 'May 2021',
    credentialId: 'PCSDT6BUAFRB',
    type: 'Certificate'
  },
  {
    name: 'Practical Web Application Security and Testing',
    issuer: 'TCM Security, Inc.',
    date: 'June 2023 – present',
    type: 'Certificate'
  }
]

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="education"
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
            marginBottom: '60px',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Education & Certifications
          </h2>

          {/* Education Section */}
          <div style={{ marginBottom: '80px' }}>
            <h3 style={{
              fontSize: '32px',
              marginBottom: '40px',
              color: '#00d4ff',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <FaGraduationCap />
              Educational Background
            </h3>

            <div style={{
              display: 'grid',
              gap: '30px'
            }}>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  style={{
                    padding: '30px',
                    background: 'var(--light-gray)',
                    borderRadius: '15px',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <h4 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: 'var(--text)',
                    marginBottom: '10px'
                  }}>
                    {edu.degree}
                  </h4>
                  <p style={{
                    color: '#00d4ff',
                    fontSize: '18px',
                    marginBottom: '8px'
                  }}>
                    {edu.institution}
                  </p>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '16px'
                  }}>
                    {edu.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 style={{
              fontSize: '32px',
              marginBottom: '40px',
              color: '#7b2ff7',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <FaCertificate />
              Certifications and Licenses
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '25px'
            }}>
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  style={{
                    padding: '25px',
                    background: 'var(--light-gray)',
                    borderRadius: '15px',
                    border: '1px solid rgba(123, 47, 247, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(123, 47, 247, 0.5)'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(123, 47, 247, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(123, 47, 247, 0.2)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: 'var(--text)',
                    marginBottom: '12px'
                  }}>
                    {cert.name}
                  </h4>
                  <p style={{
                    color: '#7b2ff7',
                    fontSize: '16px',
                    marginBottom: '8px'
                  }}>
                    {cert.issuer}
                  </p>
                  {cert.date && (
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}>
                      {cert.date}
                    </p>
                  )}
                  {cert.licenseNo && (
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '14px',
                      marginBottom: '5px'
                    }}>
                      License No: {cert.licenseNo}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '14px'
                    }}>
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
