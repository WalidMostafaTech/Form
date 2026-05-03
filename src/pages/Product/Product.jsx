import React, { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/api/productsServices";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import LoadingPage from "@/components/Loading/LoadingPage";
import SeoManager from "@/utils/SeoManager";
import { clearProductColor, setProductColor } from "@/store/headerSlice";
import ProductControls from "./sections/ProductControls";
import DetailsSection from "./sections/DetailsSection";
import Modal3D from "./sections/Modal3D";
import HeadSection from "./sections/HeadSection";

gsap.registerPlugin(ScrollTrigger);

const Model = ({ modelRef, file }) => {
  const { scene } = useGLTF(file);
  return <primitive object={scene} ref={modelRef} scale={1} />;
};

const Product = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { user, loading } = useSelector((state) => state.user);
  const { lang } = useSelector((state) => state.language);

  const [searchParams] = useSearchParams();
  const sale_type = searchParams.get("sale_type") || "retail";

  useEffect(() => {
    if (
      !loading &&
      sale_type === "wholesale" &&
      (!user || user?.type === "user")
    ) {
      navigate("?sale_type=retail", { replace: true });
    }
  }, [user, sale_type, loading, navigate]);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug, sale_type],
    queryFn: () => getProduct({ slug, sale_type }),
    enabled: !!slug,
  });

  useEffect(() => {
    if (product?.font_color) {
      dispatch(setProductColor(product.font_color));
    }

    return () => {
      dispatch(clearProductColor());
    };
  }, [product?.font_color]);

  // Refs
  const modelRef = useRef();
  const circleRef = useRef();
  const canvasRef = useRef();
  const contentRef = useRef();
  const sliderRef = useRef();
  const leftListRef = useRef();
  const rightListRef = useRef();
  const swiperContainerRef = useRef();

  const [knobX, setKnobX] = useState(0);

  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const items = useMemo(() => {
    return product?.product_points || [];
  }, [product?.product_points]);

  const leftListItems = items?.filter((_, i) => i % 2 === 0) || [];

  const rightListItems = items?.filter((_, i) => i % 2 === 1) || [];

  useEffect(() => {
    if (!items.length) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(circleRef.current, {
      height: "100%",
      duration: 0.5,
      ease: "power2.out",
    });

    tl.to(
      canvasRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "<",
    );

    tl.to(
      sliderRef.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
      },
      "<",
    );

    tl.to(
      contentRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "<",
    );

    tl.to(
      leftListRef.current?.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        pointerEvents: "auto",
      },
      "-=0.3",
    );

    tl.to(
      rightListRef.current?.children,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        pointerEvents: "auto",
      },
      "<",
    );

    tl.to(
      swiperContainerRef.current,
      {
        opacity: 1,
        pointerEvents: "auto",
        display: "block",
        duration: 0.6,
        ease: "power2.out",
      },
      "<",
    );

    ScrollTrigger.create({
      trigger: ".product-section",
      start: "top top",
      // start: "top 30px",
      end: "+=800",
      pin: true,
      anticipatePin: 1,

      onEnter: () => {
        gsap.delayedCall(0.3, () => {
          tl.play();
        });
      },

      onUpdate: (self) => {
        if (self.direction === -1 && self.progress < 0.9) {
          tl.reverse();
        }
      },

      onEnterBack: () => tl.play(),

      onLeaveBack: () => {
        tl.reverse();
        setActiveItem(null); // ✅
        setHoveredItem(null); // ✅
      },
    });

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [items]);

  // دالة بتحسب الـ offset ديناميكياً
  const getOffset = (index, total) => {
    const mid = (total - 1) / 2;
    const distanceFromCenter = Math.abs(index - mid);
    // كل ما اقتربت من المنتصف، كل ما قل الـ offset
    return Math.round(distanceFromCenter) * 44; // 14px لكل درجة بعد عن المنتصف
  };

  const mainColor = product?.font_color || "#eee";

  const is3DFile = (file) => {
    if (!file) return false;

    const extension = file.split(".").pop()?.toLowerCase();

    return ["glb", "gltf", "fbx", "obj"].includes(extension);
  };

  const has3DModel = is3DFile(product?.file_3d);
  const hasItems = items.length > 0;

  const viewType = useMemo(() => {
    if (has3DModel && hasItems) return "FULL";
    if (has3DModel) return "MODEL_ONLY";
    if (hasItems) return "DETAILS_ONLY";
    return "EMPTY";
  }, [has3DModel, hasItems]);

  return (
    <>
      <SeoManager
        title={product?.seo?.meta_title}
        description={product?.seo?.meta_description}
        keywords={product?.seo?.keywords}
        canonical={product?.seo?.canonical_url}
        ogImage={product?.seo?.og_image}
      />

      {isLoading ? (
        <LoadingPage />
      ) : (
        <main
          className="overflow-x-hidden"
          style={{ background: product?.page_color || "var(--secondary)" }}
        >
          {viewType === "FULL" && (
            <section className="product-section h-[calc(100vh-30px)] pt-26 pb-6 flex flex-col items-center justify-between">
              {/* 🔥 TITLE */}
              <HeadSection product={product} mainColor={mainColor} />

              {/* 🔥 3D SECTION */}
              <div className="w-full flex items-center justify-center gap-20 h-[50%] lg:h-[75%] max-h-[600px] max-w-5xl">
                <ul
                  ref={leftListRef}
                  className="hidden lg:flex flex-col gap-2 h-full justify-evenly flex-1"
                >
                  {leftListItems.map((item, i) => {
                    const offset = getOffset(i, leftListItems.length);
                    return (
                      <li
                        key={item.id}
                        onMouseEnter={() => {
                          setActiveItem(item);
                          setHoveredItem(item.id);
                        }}
                        onMouseLeave={() => {
                          // setActiveItem(null);
                          // setHoveredItem(null);
                        }}
                        style={{
                          opacity: 0,
                          transform: "translateY(-40px)",
                          // الـ offset بيكون أكبر في الأطراف وأصغر في المنتصف
                          marginInlineEnd: `-${offset}px`,
                          color: mainColor,
                        }}
                        className={`
                      ${hoveredItem && hoveredItem !== item.id ? "opacity-45!" : ""} 
                      pointer-events-none flex flex-row-reverse text-end items-center gap-3 relative pe-2
                      transition-[margin] duration-300
                      `}
                      >
                        <span
                          style={{ background: mainColor }}
                          className="w-10 h-0.5 absolute top-1/2 translate-y-1/2 inset-s-[100%]"
                        />
                        <div className="w-8 h-8 overflow-hidden">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold">{item.title}</h3>
                          <p className="text-xs">{item.description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="relative h-full aspect-square flex items-center justify-center">
                  {/* 🔵 الدائرة */}
                  <div
                    ref={circleRef}
                    className="absolute w-full h-[100px] border-2 rounded-[50%] bottom-0"
                    style={{ borderColor: mainColor }}
                  ></div>

                  {/* 🎨 Canvas */}
                  <div
                    ref={canvasRef}
                    className="h-[80%] aspect-square flex items-center justify-center"
                  >
                    {product?.file_3d && (
                      <Canvas camera={{ fov: 45 }} className="aspect-square!">
                        <color
                          attach="background"
                          args={[product?.page_color]}
                        />

                        <ambientLight intensity={1} />
                        <directionalLight
                          position={[2, 2, 2]}
                          intensity={1.5}
                        />

                        <Suspense fallback={null}>
                          <Stage environment={null} intensity={1}>
                            <Model modelRef={modelRef} file={product.file_3d} />
                          </Stage>
                        </Suspense>
                      </Canvas>
                    )}
                  </div>

                  {/* 🆕 محتوى جديد */}
                  <div
                    ref={contentRef}
                    // style={{ background: "black" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0
                    h-full aspect-square flex flex-col items-center justify-center rounded-full overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {activeItem ? (
                        <motion.div
                          key={activeItem.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="absolute inset-0"
                        >
                          <img
                            src={activeItem.image}
                            alt={activeItem.main_title}
                            className="w-full h-full object-cover"
                          />

                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
                            <h2 className="text-2xl mb-2">
                              {activeItem.main_title}
                            </h2>

                            <div
                              className="text-sm rich_content line-clamp-5"
                              dangerouslySetInnerHTML={{
                                __html: activeItem.main_description,
                              }}
                            />

                            <Sheet>
                              <SheetTrigger className="cursor-pointer hover:underline mt-4">
                                {t("productDetails.more")}
                              </SheetTrigger>
                              <SheetContent
                                side={lang === "ar" ? "right" : "left"}
                                className="border-0 py-10 gap-0 w-[90%]! max-w-[600px]! pe-20 md:pe-40 rounded-e-[50%]"
                                showCloseButton={false}
                                style={{
                                  background:
                                    product?.page_color || "var(--secondary)",
                                }}
                              >
                                <SheetHeader>
                                  <SheetTitle
                                    className="text-2xl"
                                    style={{ color: mainColor }}
                                  >
                                    {activeItem.main_title}
                                  </SheetTitle>

                                  <SheetClose
                                    className="absolute top-4 inset-s-4 cursor-pointer"
                                    style={{ color: mainColor }}
                                  >
                                    <IoClose size={22} />
                                  </SheetClose>

                                  <SheetDescription />
                                </SheetHeader>

                                <div
                                  className="px-4 text-sm rich_content h-full overflow-y-auto no-scrollbar"
                                  style={{ color: mainColor }}
                                  dangerouslySetInnerHTML={{
                                    __html: activeItem.main_description,
                                  }}
                                />
                              </SheetContent>
                            </Sheet>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
                          style={{
                            background:
                              product?.page_color || "var(--secondary)",
                            color: mainColor,
                            borderColor: mainColor,
                          }}
                        >
                          <h2 className="text-3xl mb-2">
                            {t("productDetails.abstract")}
                          </h2>

                          <p className="text-sm">
                            {t("productDetails.hoverHint")}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                          const direction = lang === "ar" ? -1 : 1; // ✅
                          modelRef.current.rotation.y +=
                            delta * 0.01 * direction;
                        }
                      }}
                      className="custom-range w-[200px]"
                    />
                  </div>
                </div>

                <ul
                  ref={rightListRef}
                  className="hidden lg:flex flex-col gap-2 h-full justify-evenly flex-1"
                >
                  {rightListItems.map((item, i) => {
                    const offset = getOffset(i, rightListItems.length);
                    return (
                      <li
                        key={item.id}
                        onMouseEnter={() => {
                          setActiveItem(item);
                          setHoveredItem(item.id);
                        }}
                        onMouseLeave={() => {
                          // setActiveItem(null);
                          // setHoveredItem(null);
                        }}
                        style={{
                          opacity: 0,
                          transform: "translateY(40px)",
                          marginInlineStart: `-${offset}px`,
                          color: mainColor,
                        }}
                        className={`
                      ${hoveredItem && hoveredItem !== item.id ? "opacity-45!" : ""} 
                      pointer-events-none flex items-center gap-3 relative ps-2
                      transition-[margin] duration-300
                      `}
                      >
                        <span
                          style={{ background: mainColor }}
                          className="w-10 h-0.5 absolute top-1/2 translate-y-1/2 inset-e-[100%]"
                        />
                        <div className="w-8 h-8 overflow-hidden">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-bold">{item.title}</h3>
                          <p className="text-xs">{item.description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 🎨 Swiper */}
              <div
                ref={swiperContainerRef}
                className="hidden lg:hidden! w-screen overflow-x-hidden opacity-0 pointer-events-none"
              >
                <Swiper
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  slidesPerView={5}
                  centeredSlides={true}
                  spaceBetween={25}
                  grabCursor={true}
                  onSlideChange={(swiper) => {
                    const index = swiper.realIndex;
                    setActiveIndex(index);
                    setActiveItem(items[index]);
                  }}
                  className="product-details-swiper"
                >
                  {items.map((item, i) => (
                    <SwiperSlide
                      key={item.id}
                      className="flex justify-center"
                      onClick={() => {
                        setActiveIndex(i);
                        setActiveItem(items[i]);
                        swiperRef.current?.slideToLoop(i); // 🔥 ده المهم
                      }}
                    >
                      <div
                        style={{ color: mainColor }}
                        className={`flex flex-col items-center gap-2 transition-all duration-300 
                        ${activeIndex === i ? "scale-100 opacity-100" : "opacity-40 scale-80"}`}
                      >
                        <div className="w-6 h-6 overflow-hidden">
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <h3 className="text-xs font-bold text-center">
                          {item.title}
                        </h3>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* 🔥 bottom controls */}
              <ProductControls
                product={product}
                mainColor={mainColor}
                sale_type={sale_type}
              />
            </section>
          )}

          {viewType === "MODEL_ONLY" && (
            <Modal3D
              product={product}
              mainColor={mainColor}
              modelRef={modelRef}
              knobX={knobX}
              setKnobX={setKnobX}
              lang={lang}
              sale_type={sale_type}
            />
          )}

          {viewType === "DETAILS_ONLY" && (
            <DetailsSection
              product={product}
              mainColor={mainColor}
              lang={lang}
              sale_type={sale_type}
              items={items}
              leftListItems={leftListItems}
              rightListItems={rightListItems}
              getOffset={getOffset}
              setActiveItem={setActiveItem}
              setHoveredItem={setHoveredItem}
              hoveredItem={hoveredItem}
              activeItem={activeItem}
              swiperRef={swiperRef}
              setActiveIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          )}

          {viewType === "EMPTY" && (
            <section className="h-[calc(100vh-30px)] pt-26 pb-6 flex flex-col items-center justify-center">
              {/* 🔥 TITLE */}
              <HeadSection product={product} mainColor={mainColor} />

              {/* 🔥 bottom controls */}
              <ProductControls
                product={product}
                mainColor={mainColor}
                sale_type={sale_type}
              />
            </section>
          )}
        </main>
      )}
    </>
  );
};

export default Product;
