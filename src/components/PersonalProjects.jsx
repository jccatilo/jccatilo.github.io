import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FaTimes, FaExternalLinkAlt, FaTag } from 'react-icons/fa'

const personalProjects = [
  {
    id: 1,
    title: 'Bluetooth Controlled Arduino Toy Car',
    shortDesc: 'Toy car with anti-collision feature.',
    description: 'Toy car with anti-collision feature. It is built with acrylic chassis, HC-05 BT module, Arduino Mega 2560, and ultrasonic sensor. I built this after graduation and before my board exam due to... boredom. LOL',
    image: '/images/portfolio/modals/car.jpg',
    tags: ['Arduino', 'DIY', 'Bluetooth'],
    link: 'https://www.youtube.com/watch?v=e_kuyDUQr6I'
  },
  {
    id: 2,
    title: 'Augmented Reality',
    shortDesc: 'A.R. project made using vuforia.',
    description: 'A.R. project made using vuforia. I can imagine a lot of applications for this.',
    image: '/images/portfolio/modals/ar1.jpg',
    tags: ['Augmented Reality', 'AR', 'Vuforia'],
    link: 'https://www.youtube.com/watch?v=dsSec22Jx40'
  },
  {
    id: 3,
    title: 'Kilobolt Game',
    shortDesc: 'This was from an old tutorial from the Kilobolt website.',
    description: 'This was from an old tutorial from the Kilobolt website. I think it doesn\'t exist anymore. I\'m glad I was able to test it. It was so cool!',
    image: '/images/portfolio/modals/kilobolt1.jpg',
    tags: ['Kilobolt', 'Game', 'Eclipse', 'Shooting game'],
    link: 'https://www.youtube.com/watch?v=NBmD1F_YPVI'
  },
  {
    id: 4,
    title: 'Python File Organizer',
    shortDesc: 'Use this to organize files into folders according to file type in just one snap.',
    description: 'Use this to organize files into folders according to file type in just one snap.',
    image: '/images/portfolio/modals/py.jpg',
    tags: ['Python', 'File Manipulation'],
    link: 'https://www.youtube.com/watch?v=bHPz2Nw9FI0'
  },
  {
    id: 5,
    title: 'Printer Server',
    shortDesc: 'ESP8266, Max3421E. One of my projects in IntegrityNet Solutions and services for their Zumumu line.',
    description: 'ESP8266, Max3421E. One of my projects in IntegrityNet Solutions and services for their Zumumu line.',
    image: '/images/portfolio/modals/ps2.png',
    tags: ['Printer', 'Server', 'ESP8266', 'Max3421'],
    link: 'http://www.behance.net'
  },
  {
    id: 6,
    title: 'OTP Prototype',
    shortDesc: 'Design in KiCAD and was sent to China for production.',
    description: 'Design in KiCAD and was sent to China for fabrication. This was one of my projects in IntegraNet Network Services as an R&D Engineer. It uses E-paper and has idle current consumption of 64microamps! It is powered by just a 3.3V CR2032 coin cell battery.',
    image: '/images/portfolio/modals/otp1.png',
    tags: ['One time password', 'Atmega328p', 'ds3231', 'epaper', 'KiCAD'],
    link: 'http://www.behance.net'
  },
  {
    id: 7,
    title: 'DIY 120-inch Video Wall',
    shortDesc: 'Made using nine 40-inch TVs.',
    description: 'Made using 9 40-inch LED TVs and some acrylic and wood. It took like 3 months to finish the 1st one.',
    image: '/images/portfolio/modals/tv.png',
    tags: ['3x3', 'Video wall'],
    link: 'https://www.youtube.com/watch?v=quIW3_TK1Oc'
  },
  {
    id: 8,
    title: 'Engraving Images on Wood',
    shortDesc: 'CO2 laser engraver.',
    description: 'This was made possible with the use of CO2 Laser engraver in our fabrication laboratory in IntegraNet Network Services. It was so fun! We tweaked some settings of the laser software and also the image itself.',
    image: '/images/portfolio/modals/laser.jpg',
    tags: ['kpop', 'engraving'],
    link: 'https://www.youtube.com/watch?v=3w_ba7GR6Kg'
  }
]

function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto'
            }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--light-gray)',
                borderRadius: '20px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                border: '2px solid rgba(0, 212, 255, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 212, 255, 0.3)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0, 212, 255, 0.2)',
                  border: '2px solid #00d4ff',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00d4ff',
                  cursor: 'pointer',
                  zIndex: 1,
                  fontSize: '20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#00d4ff'
                  e.currentTarget.style.color = 'var(--dark)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)'
                  e.currentTarget.style.color = '#00d4ff'
                }}
              >
                <FaTimes />
              </button>

              {/* Image */}
              <div style={{
                width: '100%',
                height: '400px',
                background: 'var(--dark-gray)',
                borderRadius: '20px 20px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.8
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', project.image)
                    e.target.style.display = 'none'
                    const placeholder = e.target.parentElement.querySelector('.image-placeholder')
                    if (!placeholder) {
                      const placeholderDiv = document.createElement('div')
                      placeholderDiv.className = 'image-placeholder'
                      placeholderDiv.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 247, 0.1)); color: #00d4ff; font-size: 18px; text-align: center; padding: 20px;'
                      placeholderDiv.textContent = project.title
                      e.target.parentElement.appendChild(placeholderDiv)
                    }
                  }}
                  onLoad={(e) => {
                    e.target.style.opacity = 1
                  }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '40px' }}>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: 'var(--text)',
                  marginBottom: '20px',
                  background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {project.title}
                </h3>

                <p style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  fontSize: '16px',
                  marginBottom: '25px'
                }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '30px',
                  alignItems: 'center'
                }}>
                  <FaTag style={{ color: '#7b2ff7', marginRight: '5px' }} />
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '6px 14px',
                        background: 'rgba(123, 47, 247, 0.2)',
                        border: '1px solid rgba(123, 47, 247, 0.4)',
                        borderRadius: '20px',
                        fontSize: '13px',
                        color: '#7b2ff7'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '12px 30px',
                      background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
                      border: 'none',
                      borderRadius: '25px',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)'
                    }}
                  >
                    <FaExternalLinkAlt />
                    View Details
                  </motion.a>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '12px 30px',
                      background: 'transparent',
                      border: '2px solid #00d4ff',
                      borderRadius: '25px',
                      color: '#00d4ff',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function PersonalProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
    document.body.style.overflow = 'auto'
  }

  return (
    <section
      id="portfolio"
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
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Check Out Some of My Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px',
            marginTop: '60px'
          }}>
            {personalProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => openModal(project)}
                style={{
                  position: 'relative',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--light-gray)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Image Container */}
                <div style={{
                  width: '100%',
                  height: '250px',
                  background: 'var(--dark-gray)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', project.image)
                      e.target.style.display = 'none'
                      const container = e.target.parentElement
                      const existingPlaceholder = container.querySelector('.image-placeholder')
                      if (!existingPlaceholder) {
                        const placeholder = document.createElement('div')
                        placeholder.className = 'image-placeholder'
                        placeholder.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 247, 0.1)); color: #00d4ff; font-size: 14px; text-align: center; padding: 20px; position: absolute; top: 0; left: 0;'
                        placeholder.textContent = project.title
                        container.appendChild(placeholder)
                      }
                    }}
                    onLoad={(e) => {
                      e.target.style.opacity = 1
                    }}
                  />
                  
                  {/* Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <div>
                      <h5 style={{
                        color: 'var(--text)',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '8px'
                      }}>
                        {project.title}
                      </h5>
                      <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '14px',
                        margin: 0
                      }}>
                        {project.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Plus Icon */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(0, 212, 255, 0.2)',
                    border: '2px solid #00d4ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00d4ff',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = 1
                    e.currentTarget.parentElement.querySelector('div[style*="opacity: 0"]').style.opacity = 1
                  }}
                  >
                    +
                  </div>
                </div>

                {/* Content */}
                <div style={{
                  padding: '20px',
                  background: 'var(--light-gray)'
                }}>
                  <h5 style={{
                    color: 'var(--text)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '8px'
                  }}>
                    {project.title}
                  </h5>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '14px',
                    margin: 0,
                    lineHeight: 1.6
                  }}>
                    {project.shortDesc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}
