import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";

const Model = ({ modelRef }) => {
  const { scene } = useGLTF("/models/scene.glb");
  return <primitive object={scene} ref={modelRef} scale={1.5} />;
};

const Product = () => {
  const modelRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [knobX, setKnobX] = useState(0);

  const maxMove = 80; // أقصى حركة يمين/شمال

  // 🎯 عند الضغط
  const handlePointerDown = (e) => {
    setIsDragging(true);
    setLastX(e.clientX);
  };

  // 🎯 عند الإفلات
  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // 🎯 أثناء السحب
  const handlePointerMove = (e) => {
    if (!isDragging || !modelRef.current) return;

    const delta = e.clientX - lastX;
    setLastX(e.clientX);

    // تحريك الـ slider
    setKnobX((prev) => {
      let next = prev + delta;

      if (next > maxMove) next = maxMove;
      if (next < -maxMove) next = -maxMove;

      return next;
    });

    // تحريك الموديل (Rotation Y فقط)
    modelRef.current.rotation.y += delta * 0.01;
  };

  return (
    <main>
      <section className="bg-[#D2B48C] h-screen pt-20 flex flex-col items-center justify-between">
        {/* 🔥 TITLE */}
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
            geometry
          </h1>

          <div className="text-xs uppercase tracking-widest flex flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="px-2 lg:px-4 py-1 not-last:border-e border-black"
              >
                Berries
              </span>
            ))}
          </div>
        </div>

        {/* 🔥 3D SECTION */}
        <div className="relative w-full h-[400px] flex items-center justify-center">
          {/* الدائرة */}
          <div className="absolute w-[400px] h-[100px] border border-black/30 rounded-[100%] bottom-10"></div>

          {/* CANVAS */}
          <div className="w-full h-full">
            <Canvas camera={{ fov: 45 }}>
              <color attach="background" args={["#D2B48C"]} />

              <Stage environment={null} intensity={0.5}>
                <Model modelRef={modelRef} />
              </Stage>
            </Canvas>
          </div>

          {/* 🔥 DRAG SLIDER */}
          <div className="absolute bottom-6 w-[200px] h-[40px] flex items-center justify-center">
            {/* الخط */}
            <div className="absolute w-full h-[2px] bg-black/30 rounded"></div>

            {/* الدائرة draggable */}
            <div
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10 select-none"
              style={{ transform: `translateX(${knobX}px)` }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerUp}
            >
              ↔
            </div>
          </div>
        </div>

        {/* 🔥 bottom controls */}
        <div className="w-full max-w-6xl px-10 flex flex-wrap justify-center gap-4 my-4">
          <select className="border border-black px-8 py-3 bg-transparent">
            <option>10oz</option>
            <option>12oz</option>
          </select>

          <div className="flex items-center border border-black px-4 gap-4">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>

          <button className="bg-black text-white px-6 py-3 font-bold">
            $22.50 - Add to Cart
          </button>
        </div>
      </section>
    </main>
  );
};

export default Product;
