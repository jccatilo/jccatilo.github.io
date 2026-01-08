import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { FaProjectDiagram, FaMoneyBillWave, FaBuilding } from 'react-icons/fa'

const projects = [
  {
    name: 'TRIOE: Tinkering Resource for Internet of Everything',
    organization: 'Batangas State University',
    budget: 'Php 1,400,000',
    type: 'University Funded',
    description: 'A comprehensive IoT tinkering resource platform with custom PCB designs for TRIOE Boards. Includes server deployment and application maintenance.',
    technologies: ['PCB Design', 'Linux Servers', 'IoT', 'Hardware Development'],
    status: 'Ongoing'
  },
  {
    name: 'ATLANTIS – An IoT based Artificial Intelligence Aquaponic Control and Monitoring System',
    organization: 'Batangas State University',
    budget: 'Php 4,999,371.60',
    type: 'DOST-S4CP-CRADLE Funded',
    description: 'Advanced IoT system for aquaponics greenhouse with AI integration. Features RS485 sensor systems, greenhouse actuator controls, and comprehensive monitoring dashboards.',
    technologies: ['Python', 'NVIDIA Jetson', 'IoT', 'AI', 'RS485', 'Linux Servers'],
    status: 'Completed'
  },
  {
    name: 'BUCO PI – BatstateU Customizable Open Platform for IoT',
    organization: 'Batangas State University',
    budget: 'Php 1,000,000',
    type: 'University Funded',
    description: 'Customizable open platform for IoT development with PCB design for NVIDIA Jetson SOM carrier board. Enables rapid prototyping and development of IoT solutions.',
    technologies: ['PCB Design', 'NVIDIA Jetson', 'IoT', 'Python', 'Linux'],
    status: 'Completed'
  },
  {
    name: 'Reverse Vendo Machine',
    organization: 'ROBIN Ph',
    description: 'Complete electrical and electronic design for reverse vending machine. Includes Arduino and Python programming, along with CAD modeling for external and internal components.',
    technologies: ['Arduino', 'Python', 'CAD Modeling', 'Electronics Design'],
    status: 'Completed'
  },
  {
    name: 'Radio Station Automation & Monitoring System',
    organization: 'IntegrityNet Solutions Services',
    description: 'Hardware prototypes and automation systems for monitoring and maintaining device status and uptimes for radio stations. Includes integration with National Telecommunications Commission systems.',
    technologies: ['Arduino', 'Python', 'KiCAD', '3D Modeling', 'Laser Cutting', 'Automation'],
    status: 'Completed'
  },
  {
    name: 'Production Line Automation & Quality Improvement',
    organization: 'Go!Foton Micro Optics Philippines Inc.',
    description: 'Software and hardware development for prototypes using microcontrollers, jigs, and fixtures to improve yield and quality on the production line.',
    technologies: ['Arduino', 'KiCAD', 'AutoCAD', '3D Printing', 'CURA', 'Automation'],
    status: 'Completed'
  }
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="projects"
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
        maxWidth: '1400px',
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
            Featured Projects
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '30px'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                style={{
                  padding: '35px',
                  background: 'var(--light-gray)',
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-10px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '6px 15px',
                  borderRadius: '20px',
                  background: project.status === 'Ongoing' 
                    ? 'rgba(0, 212, 255, 0.2)' 
                    : 'rgba(123, 47, 247, 0.2)',
                  border: `1px solid ${project.status === 'Ongoing' ? '#00d4ff' : '#7b2ff7'}`,
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: project.status === 'Ongoing' ? '#00d4ff' : '#7b2ff7'
                }}>
                  {project.status}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <FaProjectDiagram style={{ color: '#00d4ff', fontSize: '24px' }} />
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: 'var(--text)',
                    margin: 0,
                    flex: 1,
                    paddingRight: '80px'
                  }}>
                    {project.name}
                  </h3>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '15px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#7b2ff7'
                  }}>
                    <FaBuilding />
                    <span style={{ fontSize: '14px' }}>{project.organization}</span>
                  </div>
                  {project.budget && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#00d4ff'
                    }}>
                      <FaMoneyBillWave />
                      <span style={{ fontSize: '14px' }}>{project.budget}</span>
                    </div>
                  )}
                </div>

                {project.type && (
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    marginBottom: '15px',
                    fontStyle: 'italic'
                  }}>
                    {project.type}
                  </p>
                )}

                <p style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '20px',
                  fontSize: '15px'
                }}>
                  {project.description}
                </p>

                <div>
                  <h4 style={{
                    color: '#00d4ff',
                    fontSize: '16px',
                    marginBottom: '12px'
                  }}>
                    Technologies:
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(0, 212, 255, 0.1)',
                          border: '1px solid rgba(0, 212, 255, 0.3)',
                          borderRadius: '15px',
                          fontSize: '12px',
                          color: '#00d4ff'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
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
