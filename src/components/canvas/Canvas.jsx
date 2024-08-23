import { useRef } from "react";
import "./Canvas.css";
import { Canvas, useFrame } from "@react-three/fiber";

export default function MatrixCanvas() {
  const canvasRef = useRef(null);

  return <Canvas ref={canvasRef} className="MatrixCanvas" />;
}
