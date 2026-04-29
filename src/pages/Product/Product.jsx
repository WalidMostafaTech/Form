import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Model = ({ modelRef }) => {
  const { scene } = useGLTF("/models/scene.glb");
  return <primitive object={scene} ref={modelRef} scale={1.5} />;
};

const Product = () => {
  const modelRef = useRef();
  const circleRef = useRef();
  const canvasRef = useRef();
  const contentRef = useRef();
  const sliderRef = useRef();
  const leftListRef = useRef();
  const rightListRef = useRef();

  const [knobX, setKnobX] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // 🔵 تكبير الدائرة
    tl.to(circleRef.current, {
      height: "100%",
      duration: 1,
      ease: "power2.out",
    });

    // 🎨 اخفاء الكانفاس
    tl.to(
      canvasRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<",
    );

    // 🎚️ اخفاء السلايدر
    tl.to(
      sliderRef.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.6,
      },
      "<",
    );

    // 🆕 اظهار المحتوى الجديد
    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<",
    );

    // 👇 LEFT LIST STAGGER
    tl.to(
      leftListRef.current.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      },
      "-=0.3",
    );

    // 👇 RIGHT LIST STAGGER
    tl.to(
      rightListRef.current.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
      },
      "<",
    );

    // 📌 ScrollTrigger بدون scrub
    ScrollTrigger.create({
      trigger: ".product-section",
      start: "top top",
      end: "+=300",
      pin: true,
      anticipatePin: 1,

      onEnter: () => {
        gsap.delayedCall(0.4, () => {
          tl.play();
        });
      },

      onUpdate: (self) => {
        if (self.direction === -1 && self.progress < 0.9) {
          tl.reverse();
        }
      },
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      tl.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  const leftListItems = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    title: `Berry ${i + 1}`,
    description: `Description of Berry ${i + 1}`,
    icon: "https://pngimg.com/uploads/pokemon/pokemon_PNG129.png",
    image:
      "https://www.k12digest.com/wp-content/uploads/2024/03/1-3-550x330.jpg",
    content: `Detailed content for Berry ${i + 1}`,
  }));

  const rightListItems = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    title: `Berry ${i + 1}`,
    description: `Description of Berry ${i + 1}`,
    icon: "https://pngimg.com/uploads/pokemon/pokemon_PNG129.png",
    image:
      "https://www.k12digest.com/wp-content/uploads/2024/03/1-3-550x330.jpg",
    content: `Detailed content for Berry ${i + 1}`,
  }));

  return (
    <main style={{ background: "#D2B48C" }}>
      <section className="product-section h-[calc(100vh-30px)] pt-24 pb-12 flex flex-col items-center justify-between">
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
        <div className="w-full flex items-center justify-center gap-3 h-[50%] lg:h-[75%] max-h-[600px]">
          <ul
            ref={leftListRef}
            className="flex flex-col gap-2 h-full justify-evenly"
          >
            {leftListItems.map((item, i) => (
              <li
                key={item.id}
                style={{ opacity: 0, transform: "translateY(-40px)" }}
                className={`flex flex-row-reverse text-end items-center gap-3 relative
                ${i === 0 ? "translate-x-16 rtl:-translate-x-16" : i === 1 ? "translate-x-2 rtl:-translate-x-2" : i === 3 ? "translate-x-2 rtl:-translate-x-2" : i === 4 ? "translate-x-16 rtl:-translate-x-16" : ""}`}
              >
                <span className="w-12 h-0.5 bg-black absolute top-1/2 translate-y-1/2 inset-s-[100%]" />

                <div className="w-10 h-10 overflow-hidden">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative h-full aspect-square flex items-center justify-center">
            {/* 🔵 الدائرة */}
            <div
              ref={circleRef}
              className="absolute w-full h-[100px] border border-black rounded-[100%] bottom-0"
            ></div>

            {/* 🎨 Canvas */}
            <div
              ref={canvasRef}
              className="h-[80%] aspect-square flex items-center justify-center"
            >
              <Canvas camera={{ fov: 45 }}>
                <color attach="background" args={["#D2B48C"]} />

                <Stage environment={null} intensity={0.5}>
                  <Model modelRef={modelRef} />
                </Stage>
              </Canvas>
            </div>

            {/* 🆕 محتوى جديد */}
            <div
              ref={contentRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0
              h-full aspect-square flex flex-col items-center justify-center rounded-full overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold mb-2">New Content</h2>
                <p className="text-sm">
                  هنا تحط تفاصيل المنتج أو صور أو أي UI تاني
                </p>
              </div>
            </div>

            {/* 🔥 DRAG SLIDER */}
            <div
              ref={sliderRef}
              className="absolute -bottom-5 w-[70%] max-w-[400px] h-[40px] flex items-center justify-center"
            >
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

          <ul
            ref={rightListRef}
            className="flex flex-col gap-2 h-full justify-evenly"
          >
            {rightListItems.map((item, i) => (
              <li
                key={item.id}
                style={{ opacity: 0, transform: "translateY(40px)" }}
                className={`flex items-center gap-3 relative
                ${i === 0 ? "-translate-x-16 rtl:translate-x-16" : i === 1 ? "-translate-x-2 rtl:translate-x-2" : i === 3 ? "-translate-x-2 rtl:translate-x-2" : i === 4 ? "-translate-x-16 rtl:translate-x-16" : ""}`}
              >
                <span className="w-12 h-0.5 bg-black absolute top-1/2 translate-y-1/2 inset-e-[100%]" />

                <div className="w-10 h-10 overflow-hidden">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold">{item.title}</h3>
                  <p className="text-xs">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
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
