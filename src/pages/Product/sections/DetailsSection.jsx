import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductControls from "./ProductControls";
import { IoClose } from "react-icons/io5";
import HeadSection from "./HeadSection";

const DetailsSection = ({
  product,
  mainColor,
  lang,
  sale_type,
  items,
  leftListItems,
  rightListItems,
  getOffset,
  setActiveItem,
  setHoveredItem,
  hoveredItem,
  activeItem,
  swiperRef,
  setActiveIndex,
  activeIndex,
}) => {
  const { t } = useTranslation();

  return (
    <section className="h-[calc(100vh-30px)] pt-26 pb-6 flex flex-col items-center justify-between">
      {/* 🔥 TITLE */}
      <HeadSection product={product} mainColor={mainColor} />

      {/* 🔥 3D SECTION */}
      <div className="w-full flex items-center justify-center gap-20 h-[50%] lg:h-[75%] max-h-[600px] max-w-5xl">
        <ul className="hidden md:flex flex-col gap-2 h-full justify-evenly flex-1">
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
                  marginInlineEnd: `-${offset}px`,
                  color: mainColor,
                }}
                className={`
                          ${hoveredItem && hoveredItem !== item.id ? "opacity-45!" : ""} 
                          flex flex-row-reverse text-end items-center gap-3 relative pe-2
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
            className="absolute w-full h-full border-2 rounded-[50%] bottom-0"
            style={{ borderColor: mainColor }}
          ></div>

          {/* 🆕 محتوى جديد */}
          <div
            // style={{ background: "black" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
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
                    <h2 className="text-2xl mb-2">{activeItem.main_title}</h2>

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
                          background: product?.page_color || "var(--secondary)",
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
                    background: product?.page_color || "var(--secondary)",
                    color: mainColor,
                    borderColor: mainColor,
                  }}
                >
                  <h2 className="text-3xl mb-2">
                    {t("productDetails.abstract")}
                  </h2>

                  <p className="text-sm">{t("productDetails.hoverHint")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <ul className="hidden md:flex flex-col gap-2 h-full justify-evenly flex-1">
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
                  marginInlineStart: `-${offset}px`,
                  color: mainColor,
                }}
                className={`
                          ${hoveredItem && hoveredItem !== item.id ? "opacity-45!" : ""} 
                          flex items-center gap-3 relative ps-2
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
      <div className="md:hidden w-screen overflow-x-hidden">
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

                <h3 className="text-xs font-bold text-center">{item.title}</h3>
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
  );
};

export default DetailsSection;
