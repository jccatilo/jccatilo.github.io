import { useEffect, useRef, useState, useCallback } from 'react'

export function useHandTracking(onHandUpdate) {
  const videoRef = useRef(null)
  const handsRef = useRef(null)
  const cameraRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState(null)

  const handleResults = useCallback((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // Process each hand
      const handsData = results.multiHandLandmarks.map((landmarks, index) => {
        const wrist = landmarks[0] // Wrist position (landmark 0)
        const thumb = landmarks[4] // Thumb tip (landmark 4)
        const indexFinger = landmarks[8] // Index finger tip (landmark 8)
        
        // Calculate pinch distance (distance between thumb and index finger)
        const pinchDistance = Math.sqrt(
          Math.pow(thumb.x - indexFinger.x, 2) +
          Math.pow(thumb.y - indexFinger.y, 2) +
          Math.pow(thumb.z - indexFinger.z, 2)
        )
        
        // Normalize pinch distance (typically ranges from 0 to ~0.15 when pinched to ~0.4 when open)
        const normalizedPinch = Math.min(pinchDistance / 0.4, 1)
        
        return {
          handIndex: index,
          x: 1 - wrist.x, // Mirrored X coordinate
          y: wrist.y,
          z: wrist.z,
          pinchDistance: normalizedPinch,
          isPinched: normalizedPinch < 0.3, // Pinched if distance is less than 30% of max
          landmarks: landmarks.map(landmark => ({
            ...landmark,
            x: 1 - landmark.x // Mirror all landmark X coordinates
          }))
        }
      })
      
      if (onHandUpdate) {
        // Return array of hands (for two-hand support)
        onHandUpdate(handsData)
      }
    } else {
      if (onHandUpdate) {
        onHandUpdate(null)
      }
    }
  }, [onHandUpdate])

  useEffect(() => {
    let hands = null
    let camera = null
    let mounted = true

    const initializeHandTracking = async () => {
      try {
        // Load MediaPipe scripts if needed
        if (typeof window === 'undefined' || !window.Hands || !window.Camera) {
          await loadMediaPipeScripts()
        }

        if (!mounted) return

        // Create video element (hidden)
        const video = document.createElement('video')
        video.style.position = 'fixed'
        video.style.top = '-9999px'
        video.style.left = '-9999px'
        video.style.width = '320px'
        video.style.height = '240px'
        video.setAttribute('playsinline', '')
        video.setAttribute('muted', '')
        document.body.appendChild(video)
        videoRef.current = video

        // Initialize MediaPipe Hands
        hands = new window.Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
          }
        })

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        })

        hands.onResults(handleResults)
        handsRef.current = hands

        // Initialize Camera
        camera = new window.Camera(video, {
          onFrame: async () => {
            if (hands && video.readyState === video.HAVE_ENOUGH_DATA) {
              await hands.send({ image: video })
            }
          },
          width: 640,
          height: 480
        })
        cameraRef.current = camera
        camera.start()

        if (mounted) {
          setIsInitialized(true)
        }
      } catch (err) {
        console.error('Error initializing hand tracking:', err)
        if (mounted) {
          setError(err.message)
        }
      }
    }

    initializeHandTracking()

    return () => {
      mounted = false
      if (cameraRef.current) {
        try {
          cameraRef.current.stop()
        } catch (e) {}
      }
      if (videoRef.current) {
        try {
          if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop())
          }
          if (videoRef.current.parentNode) {
            videoRef.current.parentNode.removeChild(videoRef.current)
          }
        } catch (e) {}
      }
    }
  }, [handleResults])

  return { isInitialized, error, videoRef }
}

async function loadMediaPipeScripts() {
  return new Promise((resolve, reject) => {
    if (window.Hands && window.Camera) {
      resolve()
      return
    }

    // Load Hands
    const handsScript = document.createElement('script')
    handsScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js'
    handsScript.crossOrigin = 'anonymous'
    
    handsScript.onload = () => {
      // Load Camera utils
      const cameraScript = document.createElement('script')
      cameraScript.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js'
      cameraScript.crossOrigin = 'anonymous'
      
      cameraScript.onload = () => {
        // Wait a bit for globals to be available
        setTimeout(() => {
          if (window.Hands && window.Camera) {
            resolve()
          } else {
            reject(new Error('MediaPipe scripts loaded but globals not available'))
          }
        }, 100)
      }
      cameraScript.onerror = () => reject(new Error('Failed to load camera_utils'))
      document.head.appendChild(cameraScript)
    }
    
    handsScript.onerror = () => reject(new Error('Failed to load hands'))
    document.head.appendChild(handsScript)
  })
}
