import { useRef, useMemo } from 'react'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

// MediaPipe hand landmarks connections (skeleton structure)
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // Index
  [0, 9], [9, 10], [10, 11], [11, 12], // Middle
  [0, 13], [13, 14], [14, 15], [15, 16], // Ring
  [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
  [5, 9], [9, 13], [13, 17] // Palm connections
]

function HandBone({ start, end, landmarks, offsetX = -1.5 }) {
  const scale = 3
  const offsetY = -1.5
  const offsetZ = -2

  const startLandmark = landmarks[start]
  const endLandmark = landmarks[end]
  
  const x1 = (startLandmark.x - 0.5) * scale + offsetX
  const y1 = -(startLandmark.y - 0.5) * scale + offsetY
  const z1 = startLandmark.z * scale + offsetZ
  
  const x2 = (endLandmark.x - 0.5) * scale + offsetX
  const y2 = -(endLandmark.y - 0.5) * scale + offsetY
  const z2 = endLandmark.z * scale + offsetZ

  const midpoint = [
    (x1 + x2) / 2,
    (y1 + y2) / 2,
    (z1 + z2) / 2
  ]
  
  const length = Math.sqrt(
    Math.pow(x2 - x1, 2) + 
    Math.pow(y2 - y1, 2) + 
    Math.pow(z2 - z1, 2)
  )

  const direction = new THREE.Vector3(x2 - x1, y2 - y1, z2 - z1).normalize()
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction
  )

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.03, 0.03, length, 12]} />
      <meshStandardMaterial 
        color="#00d4ff" 
        emissive="#00d4ff" 
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  )
}

function HandJoint({ landmark, index, position }) {
  let color, size, emissiveIntensity
  
  if (index === 0) {
    // Wrist - slightly larger, cyan
    color = "#00d4ff"
    size = 0.045
    emissiveIntensity = 0.7
  } else if ([4, 8, 12, 16, 20].includes(index)) {
    // Fingertips - yellow/orange glow, slightly larger
    color = "#ffaa00"
    size = 0.04
    emissiveIntensity = 0.9
  } else {
    // Other joints - blue, smaller
    color = "#00d4ff"
    size = 0.035
    emissiveIntensity = 0.5
  }

  return (
    <Sphere args={[size, 12, 12]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        metalness={0.8}
        roughness={0.2}
      />
    </Sphere>
  )
}

function SingleHandVisualization({ handData, offsetX = -1.5 }) {
  const landmarkPositions = useMemo(() => {
    if (!handData || !handData.landmarks) {
      return []
    }

    const landmarks = handData.landmarks
    const positions = []
    const scale = 3
    const offsetY = -1.5
    const offsetZ = -2

    landmarks.forEach((landmark) => {
      const x = (landmark.x - 0.5) * scale + offsetX
      const y = -(landmark.y - 0.5) * scale + offsetY
      const z = landmark.z * scale + offsetZ
      positions.push([x, y, z])
    })

    return positions
  }, [handData, offsetX])

  if (!handData || !handData.landmarks || landmarkPositions.length === 0) {
    return null
  }

  return (
    <group>
      {/* Hand bones (connections) */}
      {HAND_CONNECTIONS.map(([start, end]) => (
        <HandBone
          key={`bone-${start}-${end}`}
          start={start}
          end={end}
          landmarks={handData.landmarks}
          offsetX={offsetX}
        />
      ))}
      
      {/* Hand joints (landmarks as spheres) */}
      {landmarkPositions.map((position, index) => (
        <HandJoint
          key={`joint-${index}`}
          landmark={handData.landmarks[index]}
          index={index}
          position={position}
        />
      ))}
    </group>
  )
}

export default function HandVisualization({ handData }) {
  const groupRef = useRef()
  
  if (!handData) {
    return null
  }

  // Support both array (two hands) and single object (backward compatibility)
  const hands = Array.isArray(handData) ? handData : [handData]

  return (
    <group ref={groupRef}>
      {hands.map((hand, index) => (
        <SingleHandVisualization
          key={`hand-${index}`}
          handData={hand}
          offsetX={index === 0 ? -1.5 : 1.5} // Position second hand on the right
        />
      ))}
    </group>
  )
}
