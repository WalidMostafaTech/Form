import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";

const Model = ({ modelRef }) => {
  const { scene } = useGLTF("/models/scene.glb");
  return <primitive object={scene} ref={modelRef} scale={1.5} />;
};

const Product = () => {
  const modelRef = useRef();
  const [knobX, setKnobX] = useState(0);

  return (
    <main>
      <section className="bg-[#D2B48C] h-[calc(100vh-30px)] pt-24 pb-6 flex flex-col items-center justify-between">
        {/* 🔥 TITLE */}
        <div className="text-center text-black">
          <h1 className="text-4xl font-bold uppercase tracking-tight mb-4">
            geometry
          </h1>

          <div className="text-xs uppercase tracking-widest flex flex-wrap">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="px-2 lg:px-4 not-last:border-e-2 border-black font-medium"
              >
                Berries
              </span>
            ))}
          </div>
        </div>

        {/* 🔥 3D SECTION */}
        <div className="relative h-[50%] lg:h-[75%] max-h-[600px] aspect-square flex items-center justify-center">
          {/* الدائرة */}
          <div className="absolute w-full h-[100px] border border-black rounded-[100%] bottom-0"></div>

          {/* CANVAS */}
          <div className="h-[80%] aspect-square!">
            <Canvas camera={{ fov: 45 }}>
              <color attach="background" args={["#D2B48C"]} />

              <Stage environment={null} intensity={0.5}>
                <Model modelRef={modelRef} />
              </Stage>
            </Canvas>
          </div>

          {/* 🔥 DRAG SLIDER */}
          <div className="absolute -bottom-5 w-[70%] max-w-[400px] h-[40px] flex items-center justify-center">
            <input
              type="range"
              min={-150}
              max={150}
              value={knobX}
              onChange={(e) => {
                const value = Number(e.target.value);
                const delta = value - knobX;

                setKnobX(value);

                if (modelRef.current) {
                  modelRef.current.rotation.y += delta * 0.01;
                }
              }}
              className="custom-range w-[200px]"
            />
          </div>
        </div>

        {/* 🔥 bottom controls */}
        <div className="w-full max-w-lg px-4 grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          <select className="border border-black rounded px-8 py-1 bg-transparent outline-none">
            <option>10oz</option>
            <option>12oz</option>
          </select>

          <div className="flex items-center border border-black rounded">
            <button className="px-2 cursor-pointer text-lg font-medium">
              -
            </button>
            <span className="flex-1 text-center">1</span>
            <button className="px-2 cursor-pointer text-lg font-medium">
              +
            </button>
          </div>

          <button className="col-span-2 bg-black text-white px-6 py-2 font-bold rounded cursor-pointer">
            $22.50 - Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
};

export default Product;
