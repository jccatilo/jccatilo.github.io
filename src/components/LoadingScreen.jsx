import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          textAlign: 'center'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: 60,
            height: 60,
            border: '4px solid #1a1a1a',
            borderTop: '4px solid #00d4ff',
            borderRadius: '50%',
            margin: '0 auto 20px'
          }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#00d4ff', fontSize: '18px' }}
        >
          Loading Portfolio...
        </motion.p>
      </motion.div>
    </div>
  )
}
