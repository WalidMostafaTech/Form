import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";
import ProductControls from "./ProductControls";
import { Suspense } from "react";
import HeadSection from "./HeadSection";

const Model = ({ modelRef, file }) => {
  const { scene } = useGLTF(file);
  return <primitive object={scene} ref={modelRef} scale={1} />;
};

const Modal3D = ({
  product,
  mainColor,
  modelRef,
  knobX,
  setKnobX,
  lang,
  sale_type,
}) => {
  return (
    <section className="h-[calc(100vh-30px)] pt-26 pb-6 flex flex-col items-center justify-between">
      {/* 🔥 TITLE */}
      <HeadSection product={product} mainColor={mainColor} />

      {/* 🔥 3D SECTION */}
      <div className="w-full flex items-center justify-center gap-20 h-[50%] lg:h-[75%] max-h-[600px] max-w-5xl">
        <div className="relative h-full aspect-square flex items-center justify-center">
          {/* 🔵 الدائرة */}
          <div
            className="absolute w-full h-[100px] border-2 rounded-[50%] bottom-0"
            style={{ borderColor: mainColor }}
          ></div>

          {/* 🎨 Canvas */}
          <div className="h-[80%] aspect-square flex items-center justify-center">
            {product?.file_3d && (
              <Canvas camera={{ fov: 45 }} className="aspect-square!">
                <color attach="background" args={[product?.page_color]} />

                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 2]} intensity={1.5} />

                <Suspense fallback={null}>
                  <Stage environment={null} intensity={1}>
                    <Model modelRef={modelRef} file={product.file_3d} />
                  </Stage>
                </Suspense>
              </Canvas>
            )}
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
                  const direction = lang === "ar" ? -1 : 1; // ✅
                  modelRef.current.rotation.y += delta * 0.01 * direction;
                }
              }}
              className="custom-range w-[200px]"
            />
          </div>
        </div>
      </div>

      {/* 🔥 bottom controls */}
      <ProductControls
        product={product}
        mainColor={mainColor}
        sale_type={sale_type}
      />
    </section>
  );
};

export default Modal3D;
