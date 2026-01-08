import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa'

const experiences = [
  {
    title: 'University Research Associate II',
    company: 'Batangas State University',
    period: 'June 2024 - Present',
    type: 'Contractual',
    projects: [
      {
        name: 'TRIOE: Tinkering Resource for Internet of Everything',
        budget: 'Php 1,400,000',
        description: 'University funded project'
      }
    ],
    responsibilities: [
      'PCB design for TRIOE Boards',
      'Deploying and maintaining applications to university servers',
      'Consultation services for student and faculty researchers\' projects'
    ]
  },
  {
    title: 'Science Research Specialist I',
    company: 'Batangas State University',
    period: 'November 2022 - April 2024',
    type: 'Contractual',
    projects: [
      {
        name: 'ATLANTIS – An IoT based Artificial Intelligence Aquaponic Control and Monitoring System',
        budget: 'Php 4,999,371.60',
        description: 'DOST-S4CP-CRADLE funded project'
      },
      {
        name: 'BUCO PI – BatstateU Customizable Open Platform for IoT',
        budget: 'Php 1,000,000',
        description: 'University funded project'
      }
    ],
    responsibilities: [
      'PCB design for NVIDIA Jetson SOM carrier board',
      'Python programming',
      'Linux Server Operation and Maintenance',
      'RS485 sensor system management',
      'Greenhouse actuator controls',
      'DAVIS Weather station installation and dashboard maintenance'
    ]
  },
  {
    title: 'Electronics Engineer',
    company: 'ROBIN Ph',
    period: 'November 2021 - November 2022',
    type: 'Contractual',
    responsibilities: [
      'Designing electrical and electronic requirements for reverse vendo machine',
      'Arduino and Python programming',
      'External and internal component CAD modelling'
    ]
  },
  {
    title: 'Network Engineer',
    company: 'IntegrityNet Solutions Services',
    period: 'February 2019 - November 2021',
    responsibilities: [
      'Focus on electrical needs of radio stations',
      'Developing hardware/prototypes that automate basic tasks',
      'Monitoring and maintaining device status and uptimes',
      'Arduino, Python, KiCAD, 3D modelling and slicing softwares',
      'Laser cutting machines operation',
      'Office works including maintaining and renewing radio station licenses c/o National Telecommunications Commission Region IV-A'
    ]
  },
  {
    title: 'Engineer 1 – Innovations, Development, and Technical Department',
    company: 'Go!Foton Micro Optics Philippines Inc.',
    period: 'June 2018 - February 2019',
    responsibilities: [
      'Software and hardware development on prototypes using microcontrollers',
      'Jigs and fixtures development',
      'Improving yield and quality on the production line',
      'PCB design using KiCAD',
      '3D modelling using AutoCAD',
      '3D printing using CURA',
      'Arduino programming for automation projects'
    ]
  },
  {
    title: 'Customer Service Representative',
    company: 'Alorica Philippines Inc.',
    period: 'September 2017 - November 2017',
    responsibilities: [
      'Acquired proficiency in verbal and written skills in English communication',
      'Customer handling'
    ]
  }
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="experience"
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
            Professional Experience
          </h2>

          <div style={{
            position: 'relative',
            paddingLeft: '30px'
          }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '15px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(180deg, #00d4ff, #7b2ff7)'
            }} />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                style={{
                  position: 'relative',
                  marginBottom: '60px',
                  paddingLeft: '40px'
                }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  left: '-25px',
                  top: '5px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                  border: '4px solid var(--dark)',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)'
                }} />

                <div style={{
                  padding: '30px',
                  background: 'var(--light-gray)',
                  borderRadius: '15px',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                  e.currentTarget.style.transform = 'translateX(10px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '15px',
                    flexWrap: 'wrap'
                  }}>
                    <FaBriefcase style={{ color: '#00d4ff', fontSize: '20px' }} />
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: 'var(--text)',
                      margin: 0
                    }}>
                      {exp.title}
                    </h3>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '20px',
                    flexWrap: 'wrap'
                  }}>
                    <p style={{
                      color: '#00d4ff',
                      fontSize: '18px',
                      fontWeight: 600,
                      margin: 0
                    }}>
                      {exp.company}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--text-muted)'
                    }}>
                      <FaCalendarAlt />
                      <span>{exp.period}</span>
                      {exp.type && (
                        <span style={{
                          padding: '4px 12px',
                          background: 'rgba(0, 212, 255, 0.2)',
                          borderRadius: '12px',
                          fontSize: '12px',
                          marginLeft: '10px'
                        }}>
                          {exp.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {exp.projects && exp.projects.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{
                        color: '#7b2ff7',
                        fontSize: '18px',
                        marginBottom: '10px'
                      }}>
                        Projects:
                      </h4>
                      {exp.projects.map((project, pIndex) => (
                        <div key={pIndex} style={{
                          padding: '15px',
                          background: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: '10px',
                          marginBottom: '10px'
                        }}>
                          <p style={{
                            color: 'var(--text)',
                            fontWeight: 600,
                            marginBottom: '5px'
                          }}>
                            {project.name}
                          </p>
                          <p style={{
                            color: '#00d4ff',
                            fontSize: '14px',
                            marginBottom: '5px'
                          }}>
                            {project.budget}
                          </p>
                          <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '14px'
                          }}>
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <h4 style={{
                      color: '#7b2ff7',
                      fontSize: '18px',
                      marginBottom: '10px'
                    }}>
                      Key Responsibilities:
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0
                    }}>
                      {exp.responsibilities.map((resp, rIndex) => (
                        <li key={rIndex} style={{
                          color: 'var(--text-muted)',
                          marginBottom: '8px',
                          paddingLeft: '20px',
                          position: 'relative'
                        }}>
                          <span style={{
                            position: 'absolute',
                            left: '0',
                            color: '#00d4ff'
                          }}>
                            ▸
                          </span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
