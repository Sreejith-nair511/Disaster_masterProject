"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Text, Html } from "@react-three/drei"
import * as THREE from "three"
import { Badge } from "@/components/ui/badge"

// Terrain component
function Terrain({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  const mesh = useRef()
  const [heightMap] = useLoader(THREE.TextureLoader, ["/placeholder.svg?height=1024&width=1024"])

  // Generate terrain geometry
  const generateTerrain = () => {
    const geometry = new THREE.PlaneGeometry(10, 10, 128, 128)
    const vertices = geometry.attributes.position.array

    for (let i = 0; i < vertices.length; i += 3) {
      // Skip x and z coordinates
      vertices[i + 1] = Math.sin(vertices[i] / 2) * Math.cos(vertices[i + 2] / 2) * 1.5
    }

    geometry.computeVertexNormals()
    return geometry
  }

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={generateTerrain()} attach="geometry" />
      <meshStandardMaterial color="#138808" roughness={0.8} metalness={0.1} wireframe={false} />
    </mesh>
  )
}

// Water component
function Water({ position = [0, -0.2, 0], scale = [1, 1, 1] }) {
  const mesh = useRef()
  const [time, setTime] = useState(0)

  useFrame((state) => {
    setTime(state.clock.getElapsedTime())
    mesh.current.material.uniforms.uTime.value = time * 0.5
  })

  return (
    <mesh ref={mesh} position={position} scale={scale} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12, 1, 1]} />
      <shaderMaterial
        transparent={true}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#1E88E5") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          
          void main() {
            vec2 uv = vUv;
            float wave1 = sin(uv.x * 10.0 + uTime) * 0.05;
            float wave2 = sin(uv.y * 8.0 + uTime * 0.8) * 0.05;
            float alpha = 0.6 + sin(uv.x * 5.0 + uv.y * 5.0 + uTime) * 0.1;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </mesh>
  )
}

// Disaster marker component
function DisasterMarker({ position, type, severity, details }) {
  const { camera } = useThree()
  const [showDetails, setShowDetails] = useState(false)
  const markerRef = useRef()

  useFrame(() => {
    if (markerRef.current) {
      markerRef.current.lookAt(camera.position)
    }
  })

  const getColor = () => {
    switch (type) {
      case "flood":
        return "#1E88E5"
      case "earthquake":
        return "#D81B60"
      case "landslide":
        return "#6D4C41"
      case "cloudburst":
        return "#8E24AA"
      case "cyclone":
        return "#00ACC1"
      default:
        return "#757575"
    }
  }

  return (
    <group position={position}>
      <mesh ref={markerRef} position={[0, 1.5, 0]} onClick={() => setShowDetails(!showDetails)}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={getColor()} />
        {showDetails && (
          <Html position={[0, 0.5, 0]} center distanceFactor={10}>
            <div className="w-48 rounded-lg bg-background p-2 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium capitalize">{type}</h3>
                <Badge
                  variant={severity === "high" ? "destructive" : severity === "medium" ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {severity}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{details}</p>
            </div>
          </Html>
        )}
      </mesh>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {type.toUpperCase()}
      </Text>
    </group>
  )
}

// Main component
export default function TerrainMapCanvas({ onLoaded }) {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      onLoaded && onLoaded()
    }, 1000)
    return () => clearTimeout(timer)
  }, [onLoaded])

  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Environment preset="sunset" />
      <Terrain position={[0, 0, 0]} scale={[1, 1, 1]} />
      <Water position={[0, -0.2, 0]} scale={[1, 1, 1]} />

      {/* Disaster markers */}
      <DisasterMarker
        position={[2, 0, 1]}
        type="flood"
        severity="high"
        details="Severe flooding expected in this area due to heavy rainfall"
      />
      <DisasterMarker
        position={[-2, 0, -1]}
        type="landslide"
        severity="medium"
        details="Potential landslides due to soil erosion and rainfall"
      />
      <DisasterMarker
        position={[0, 0, -3]}
        type="earthquake"
        severity="low"
        details="Minor seismic activity detected in this region"
      />
      <DisasterMarker
        position={[-3, 0, 2]}
        type="cyclone"
        severity="high"
        details="Cyclone approaching from the Bay of Bengal"
      />

      <Html position={[-4.5, 0, -4.5]}>
        <div className="bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
          <p className="text-xs font-medium">Kerala Region</p>
          <p className="text-xs text-muted-foreground">Interactive 3D Map</p>
        </div>
      </Html>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2 - 0.1}
      />
    </Canvas>
  )
}
