import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { FaGraduationCap, FaExternalLinkAlt } from 'react-icons/fa'

const publications = [
  {
    title: 'A novel screening tool system for depressive disorders using social media and artificial neural network',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u_SrXJQAAAAJ&authuser=1&citation_for_view=u_SrXJQAAAAJ:u-x6o8ySG0sC',
    description: 'Research on developing an innovative screening tool for depressive disorders leveraging social media data and artificial neural network technology.'
  },
  {
    title: 'Spoken-digit classification using artificial neural network',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u_SrXJQAAAAJ&authuser=1&citation_for_view=u_SrXJQAAAAJ:d1gkVwhDpl0C',
    description: 'Study on spoken-digit classification utilizing artificial neural network approaches for speech recognition applications.'
  },
  {
    title: 'INTELLIGENT SYSTEMS AND APPLICATIONS IN ENGINEERING',
    link: 'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=u_SrXJQAAAAJ&authuser=1&citation_for_view=u_SrXJQAAAAJ:u5HHmVD_uO8C',
    description: 'Research publication on intelligent systems and their applications in engineering contexts.'
  }
]

export default function Research() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="research"
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
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Research & Publications
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
            Explore my published research papers and contributions to the field of intelligent systems, artificial neural networks, and engineering applications.
          </motion.p>

          {/* Google Scholar Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              marginBottom: '60px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <motion.a
              href="https://scholar.google.com/citations?view_op=list_works&hl=en&authuser=1&user=u_SrXJQAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '20px 40px',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(123, 47, 247, 0.1))',
                borderRadius: '15px',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                textDecoration: 'none',
                color: '#00d4ff',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.6)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <FaGraduationCap style={{ fontSize: '24px' }} />
              <span>View My Google Scholar Profile</span>
              <FaExternalLinkAlt style={{ fontSize: '16px' }} />
            </motion.a>
          </motion.div>

          {/* Publications List */}
          <div style={{
            display: 'grid',
            gap: '30px',
            marginTop: '40px'
          }}>
            {publications.map((publication, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                style={{
                  padding: '30px',
                  background: 'var(--light-gray)',
                  borderRadius: '20px',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  marginBottom: '15px',
                  flexWrap: 'wrap'
                }}>
                  <h3 style={{
                    fontSize: '22px',
                    margin: 0,
                    color: '#00d4ff',
                    lineHeight: 1.4,
                    flex: 1,
                    minWidth: '200px'
                  }}>
                    {publication.title}
                  </h3>
                  <span style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    padding: '4px 10px',
                    background: 'rgba(123, 47, 247, 0.1)',
                    borderRadius: '12px',
                    border: '1px solid rgba(123, 47, 247, 0.2)',
                    whiteSpace: 'nowrap',
                    alignSelf: 'flex-start'
                  }}>
                    Co-author
                  </span>
                </div>
                <p style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  fontSize: '16px',
                  marginBottom: '20px'
                }}>
                  {publication.description}
                </p>
                <motion.a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#7b2ff7',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: 500,
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#00d4ff'}
                  onMouseLeave={(e) => e.target.style.color = '#7b2ff7'}
                >
                  View Publication
                  <FaExternalLinkAlt style={{ fontSize: '14px' }} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
