import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 10 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color={hovered ? "#7f0606" : "#111"}
        clearcoat={1}
        roughness={0.5}
        reflect={0.5}
        shadowSide={2}
        flatShading={true}
        zIndex={-1}
        transparent={true}
        opacity={0.5}
        side={2}
        depthWrite={false}
        depthTest={false}
        alphaTest={0.5}
        premultipliedAlpha={true}
        blending={2}
        blendDst={2}
        blendDstAlpha={2}
        blendEquation={100}
        blendEquationAlpha={100}
        blendSrc={2}
        blendSrcAlpha={2}
      />
      <Html center>
        <div
          style={{
            perspective: "1000px",
            perspectiveOrigin: "100% 100%",
            transformStyle: "preserve-3d",
            zIndex: 1,

            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            color: "#ddd",
          }}
        >
          {hovered ? "Love" : ""}
        </div>
      </Html>
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      style={{
        background: `radial-gradient(circle at 50% 5%, #666, #111)`,
        width: "100vw",
        height: "100vh",
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, 10, -10]} decay={0} intensity={Math.PI} />

      <scene
        castShadow={true}
        receiveShadow={true}
        shadowSide={2}
        position={[0, 0, 0]}
      >
        <Box position={[0, 0, 0]} key={1} />
        <Box position={[1.5, 0, 0]} key={2} />
        <Box position={[-1.5, 1.5, 0]} key={3} />
        <Box position={[1.5, 1.5, 0]} key={4} />
        <Box position={[-1.5, -1.5, 0]} key={5} />
        <Box position={[1.5, -1.5, 0]} key={6} />
        <Box position={[0, 1.5, 0]} key={7} />
        <Box position={[0, -1.5, 0]} key={8} />
        <Box position={[-1.5, 0, 0]} key={9} />
      </scene>

      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={Math.PI / 2}
        enablePan={true}
        enableZoom={true}
        enableDamping={true}
        dampingFactor={0.25}
        rotateSpeed={Math.PI / 2}
        zoomSpeed={1}
        panSpeed={1}
        target={[0, 0, 0]}
        enableKeys={true}
        enableRotate={true}
      />
    </Canvas>
  );
}
