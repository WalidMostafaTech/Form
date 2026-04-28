import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─── */
const FLAVOR_NOTES = [
  "BERRIES",
  "STONE FRUIT",
  "EARL GREY",
  "HONEYSUCKLE",
  "ROUND",
];

const INFO_ITEMS = [
  {
    id: "extraction",
    label: "PREFERRED EXTRACTION",
    value: "Filter & Espresso",
    icon: "≡",
    side: "left",
    position: 0,
    detail: {
      title: "Filter & Espresso",
      subtitle: "EXTRACTION",
      description:
        "Geometry is optimized for both filter and espresso brewing. The blend is carefully balanced to express equally well across brewing methods, delivering consistent clarity and sweetness.",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    },
  },
  {
    id: "caffeine",
    label: "CAFFEINE",
    value: "215mg",
    icon: "⬡",
    side: "left",
    position: 1,
    detail: {
      title: "215mg",
      subtitle: "CAFFEINE",
      description:
        "A measured caffeine level that energizes without overwhelming. Geometry is crafted to provide sustained energy that complements the nuanced flavors in each cup.",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    },
  },
  {
    id: "roast",
    label: "ROAST LEVEL",
    value: "Expressive Light\nAgtron #135",
    icon: "⋯",
    side: "left",
    position: 2,
    detail: {
      title: "Expressive Light",
      subtitle: "ROAST LEVEL · Agtron #135",
      description:
        "Roasted to bring out the full spectrum of origin character. An expressive light roast that preserves the delicate fruit notes and floral aromatics unique to each microlot.",
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
    },
  },
  {
    id: "roaster",
    label: "PRODUCTION ROASTER",
    value: "Loring S70 Peregrine",
    icon: "☾",
    side: "left",
    position: 3,
    detail: {
      title: "Loring S70 Peregrine",
      subtitle: "PRODUCTION ROASTER",
      description:
        "Our Loring S70 Peregrine roaster is a state-of-the-art machine that roasts with precision and consistency, producing clean, vibrant coffees with extraordinary clarity.",
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop",
    },
  },
  {
    id: "drying",
    label: "DRYING METHOD",
    value: "Raised-Bed Dried",
    icon: "✦",
    side: "left",
    position: 4,
    detail: {
      title: "Raised-Bed Dried",
      subtitle: "DRYING METHOD",
      description:
        "Raised-bed drying allows air to circulate freely around the coffee, resulting in more even drying and a cleaner, brighter cup with pronounced acidity and clarity.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    },
  },
  {
    id: "summary",
    label: "ABSTRACT",
    value: "Coffee Summary",
    icon: "○",
    side: "right",
    position: 0,
    detail: {
      title: "Coffee Summary",
      subtitle: "ABSTRACT",
      description:
        "Geometry defies the normal tags of the human experience. It will also be defined as that coffee from Onyx that you are in love with and that completely redefined your relationship with coffee.",
      image:
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop",
    },
  },
  {
    id: "origin",
    label: "ORIGIN",
    value: "Colombia, Ethiopia",
    icon: "⊕",
    side: "right",
    position: 1,
    detail: {
      title: "Colombia, Ethiopia",
      subtitle: "ORIGIN",
      description:
        "Two of the most celebrated coffee-growing regions in the world. Colombian washed coffees bring structure and sweetness, while Ethiopian naturals bring florals and fruit complexity.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    },
  },
  {
    id: "variety",
    label: "VARIETY",
    value: "Mixed",
    icon: "⠿",
    side: "right",
    position: 2,
    detail: {
      title: "Mixed",
      subtitle: "VARIETY",
      description:
        "Oftentimes there are plots on small-holder farms where the coffee planted is interspersed with several varieties that go largely undocumented. These mixed variety coffees bring unique complexity.",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
    },
  },
  {
    id: "harvest",
    label: "HARVEST SEASON",
    value: "Rotating Microlots",
    icon: "❋",
    side: "right",
    position: 3,
    detail: {
      title: "Rotating Microlots",
      subtitle: "HARVEST SEASON",
      description:
        "We rotate microlots throughout the year to keep Geometry tasting at its peak. As harvests come in from Colombia and Ethiopia, we select the best lots that fit our flavor target.",
      image:
        "https://images.unsplash.com/photo-1485808191679-5f86510bd652?w=400&h=400&fit=crop",
    },
  },
  {
    id: "process",
    label: "PROCESS METHOD",
    value: "Washed",
    icon: "⌓",
    side: "right",
    position: 4,
    detail: {
      title: "Washed",
      subtitle: "PROCESS METHOD",
      description:
        "Both coffees are washed processed, which results in a clean, transparent cup that highlights the terroir of each origin. The washed process removes the fruit before drying, lending brightness and clarity.",
      image:
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=400&fit=crop",
    },
  },
];

/* ─── 3D Model (fallback box if no GLB) ─── */
function CoffeeBox({ rotationRef }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && rotationRef.current !== undefined) {
      meshRef.current.rotation.y = rotationRef.current;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main box body */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 1.9, 0.35]} />
        <meshStandardMaterial
          color="#d4b896"
          roughness={0.3}
          metalness={0.05}
        />
      </mesh>
      {/* Front face with label */}
      <mesh position={[0, 0, 0.176]}>
        <planeGeometry args={[1.38, 1.88]} />
        <meshStandardMaterial color="#c9a97a" roughness={0.4} />
      </mesh>
      {/* Top subtle edge */}
      <mesh position={[0, 0.96, 0]}>
        <boxGeometry args={[1.4, 0.02, 0.35]} />
        <meshStandardMaterial color="#b89060" />
      </mesh>
    </group>
  );
}

/* ─── Elliptical track ─── */
function EllipseTrack({ progress, expanded }) {
  const trackRef = useRef();
  const dotRef = useRef();

  useEffect(() => {
    const rx = 200;
    const ry = expanded ? 200 : 55;
    const angle = progress * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * rx;
    const y = Math.sin(angle) * ry;
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [progress, expanded]);

  const rx = 200;
  const ry = expanded ? 200 : 55;

  return (
    <div
      ref={trackRef}
      style={{
        position: "absolute",
        left: "50%",
        top: expanded ? "50%" : "calc(50% + 155px)",
        transform: "translate(-50%, -50%)",
        width: rx * 2,
        height: ry * 2,
        transition:
          "top 0.8s cubic-bezier(0.4,0,0.2,1), height 0.8s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg
        width={rx * 2}
        height={ry * 2}
        viewBox={`0 0 ${rx * 2} ${ry * 2}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <ellipse
          cx={rx}
          cy={ry}
          rx={rx - 2}
          ry={ry - 2}
          fill="none"
          stroke="rgba(40,25,10,0.5)"
          strokeWidth="1.5"
        />
      </svg>
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#1a0f05",
          color: "#d4b896",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontFamily: "monospace",
          cursor: "pointer",
          pointerEvents: "auto",
          transform: `translate(${-rx}px, ${-ry}px)`,
          transition: "transform 0s",
          userSelect: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          zIndex: 20,
        }}
      >
        ‹ ›
      </div>
    </div>
  );
}

/* ─── Circular Detail Popup ─── */
function DetailCircle({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30,
        pointerEvents: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 380,
          height: 380,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        }}
      >
        <img
          src={item.detail.image}
          alt={item.detail.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 60%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "40px 30px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 6,
              fontFamily: "'Courier New', monospace",
            }}
          >
            {item.detail.subtitle}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#fff",
              marginBottom: 12,
              fontFamily: "Georgia, serif",
            }}
          >
            {item.detail.title}
          </div>
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 280,
              fontFamily: "Georgia, serif",
            }}
          >
            {item.detail.description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Info Panel Items ─── */
function InfoItem({ item, onHover, onLeave, isActive }) {
  return (
    <div
      onMouseEnter={() => onHover(item)}
      onMouseLeave={onLeave}
      style={{
        display: "flex",
        flexDirection: item.side === "left" ? "row-reverse" : "row",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        padding: "6px 0",
        opacity: isActive ? 1 : 0.75,
        transition: "opacity 0.3s",
      }}
    >
      <div style={{ textAlign: item.side === "left" ? "right" : "left" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: isActive ? "#1a0f05" : "#3a2a1a",
            fontFamily: "Georgia, serif",
            lineHeight: 1.2,
            whiteSpace: "pre-line",
          }}
        >
          {item.value}
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.18em",
            color: "#8a6a4a",
            fontFamily: "'Courier New', monospace",
            marginTop: 2,
          }}
        >
          {item.label}
        </div>
      </div>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid ${isActive ? "#1a0f05" : "rgba(40,25,10,0.35)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          color: isActive ? "#1a0f05" : "#6a4a2a",
          flexShrink: 0,
          transition: "all 0.3s",
          background: isActive ? "rgba(40,25,10,0.08)" : "transparent",
        }}
      >
        {item.icon}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
const Product = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 = hero, 1 = info
  const [trackProgress, setTrackProgress] = useState(0); // 0–1 around ellipse
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const rotationRef = useRef(0);
  const targetRotation = useRef(0);
  const containerRef = useRef();
  const sectionRef = useRef();
  const animFrameRef = useRef();

  const expanded = scrollProgress > 0.3;

  // Smooth rotation
  useEffect(() => {
    const animate = () => {
      rotationRef.current +=
        (targetRotation.current - rotationRef.current) * 0.08;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / (total * 0.6)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Drag on track dot
  const handleDotMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, progress: trackProgress });
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      const dx = e.clientX - dragStart.x;
      const delta = dx / 400;
      const newProgress = (((dragStart.progress + delta) % 1) + 1) % 1;
      setTrackProgress(newProgress);
      targetRotation.current = newProgress * Math.PI * 2;
    };
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, dragStart]);

  const leftItems = INFO_ITEMS.filter((i) => i.side === "left").sort(
    (a, b) => a.position - b.position,
  );
  const rightItems = INFO_ITEMS.filter((i) => i.side === "right").sort(
    (a, b) => a.position - b.position,
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Cinzel:wght@400;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #c9a97a; }

        @keyframes popIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .flavor-nav { display: flex; gap: 0; align-items: center; }
        .flavor-nav span { 
          font-size: 11px; letter-spacing: 0.18em; font-family: 'Cinzel', serif;
          color: #1a0f05; cursor: pointer; padding: 4px 8px;
          transition: opacity 0.2s;
        }
        .flavor-nav span:hover { opacity: 0.6; }
        .flavor-sep { color: rgba(40,25,10,0.4); font-size: 10px; margin: 0 2px; }

        .info-enter { animation: fadeUp 0.5s ease forwards; }

        .bottom-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #c9a97a;
          border-top: 1px solid rgba(40,25,10,0.12);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          z-index: 100;
        }
        .btn-black {
          background: #1a0f05;
          color: #d4b896;
          border: none;
          padding: 14px 24px;
          font-family: 'Cinzel', serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          cursor: pointer;
          border-radius: 4px;
          white-space: nowrap;
        }
        .select-styled {
          border: 1.5px solid rgba(40,25,10,0.3);
          background: transparent;
          color: #1a0f05;
          padding: 12px 36px 12px 16px;
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          border-radius: 4px;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%231a0f05'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          min-width: 130px;
        }
        .qty-ctrl {
          display: flex; align-items: center; gap: 0;
          border: 1.5px solid rgba(40,25,10,0.3);
          border-radius: 4px;
          overflow: hidden;
        }
        .qty-btn {
          width: 40px; height: 46px;
          border: none; background: transparent;
          color: #1a0f05; font-size: 18px;
          cursor: pointer; font-family: 'Cinzel', serif;
        }
        .qty-btn:hover { background: rgba(40,25,10,0.08); }
        .qty-num {
          width: 40px; text-align: center;
          font-family: 'Cinzel', serif; font-size: 14px;
          color: #1a0f05; border-left: 1.5px solid rgba(40,25,10,0.2);
          border-right: 1.5px solid rgba(40,25,10,0.2);
        }
        .ml-auto { margin-left: auto; }

        .trad-modern {
          display: flex; align-items: center; gap: 12px;
          font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: 0.15em; color: #3a2a1a;
        }
        .dots { display: flex; gap: 5px; align-items: center; }
        .dot { width: 7px; height: 7px; border-radius: 50%; background: #1a0f05; }
        .dot.empty { background: transparent; border: 1.5px solid rgba(40,25,10,0.4); }
      `}</style>

      {/* Sticky section that grows tall for scroll */}
      <div ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            background: "#c9a97a",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{ textAlign: "center", paddingTop: 40, paddingBottom: 20 }}
          >
            <div
              style={{
                fontFamily: "'UnifrakturMaguntia', cursive",
                fontSize: 64,
                color: "#1a0f05",
                lineHeight: 1,
                marginBottom: 20,
              }}
            >
              geometry
            </div>
            <div className="flavor-nav" style={{ justifyContent: "center" }}>
              {FLAVOR_NOTES.map((note, i) => (
                <span
                  key={note}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {i > 0 && <span className="flavor-sep">|</span>}
                  <span>{note}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Main content area */}
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Left info panel */}
            <div
              style={{
                position: "absolute",
                left: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                opacity: scrollProgress > 0.4 ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: scrollProgress > 0.4 ? "auto" : "none",
                width: 240,
              }}
            >
              {leftItems.map((item) => (
                <InfoItem
                  key={item.id}
                  item={item}
                  onHover={setActiveItem}
                  onLeave={() => setActiveItem(null)}
                  isActive={activeItem?.id === item.id}
                />
              ))}
            </div>

            {/* Right info panel */}
            <div
              style={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                opacity: scrollProgress > 0.4 ? 1 : 0,
                transition: "opacity 0.5s ease",
                pointerEvents: scrollProgress > 0.4 ? "auto" : "none",
                width: 240,
              }}
            >
              {rightItems.map((item) => (
                <InfoItem
                  key={item.id}
                  item={item}
                  onHover={setActiveItem}
                  onLeave={() => setActiveItem(null)}
                  isActive={activeItem?.id === item.id}
                />
              ))}
            </div>

            {/* 3D Canvas */}
            <div
              style={{
                position: "absolute",
                width: 300,
                height: 350,
                left: "50%",
                top: expanded ? "50%" : "40%",
                transform: "translate(-50%, -50%)",
                transition: "top 0.8s cubic-bezier(0.4,0,0.2,1)",
                zIndex: 5,
              }}
            >
              <Canvas
                shadows
                camera={{ position: [0, 0, 4], fov: 35 }}
                style={{ background: "transparent" }}
              >
                <ambientLight intensity={0.6} />
                <directionalLight
                  position={[3, 5, 3]}
                  intensity={1.2}
                  castShadow
                />
                <directionalLight position={[-2, 2, -2]} intensity={0.4} />
                <CoffeeBox rotationRef={rotationRef} />
              </Canvas>
            </div>

            {/* Ellipse track */}
            <div
              onMouseDown={handleDotMouseDown}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                position: "absolute",
                inset: 0,
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              <EllipseTrack progress={trackProgress} expanded={expanded} />
            </div>

            {/* Detail circle on hover */}
            {activeItem && expanded && (
              <DetailCircle
                item={activeItem}
                onClose={() => setActiveItem(null)}
              />
            )}

            {/* Traditional / Modern indicator */}
            <div
              style={{
                position: "absolute",
                bottom: 60,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: scrollProgress > 0.4 ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            >
              <div className="trad-modern">
                <span>TRADITIONAL</span>
                <div className="dots">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="dot" />
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="dot empty" />
                  ))}
                </div>
                <span>MODERN</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bottom-bar">
        <button className="btn-black">$21.38 · Subscribe</button>
        <select className="select-styled">
          <option>Weekly</option>
          <option>Bi-Weekly</option>
          <option>Monthly</option>
        </select>
        <select className="select-styled">
          <option>10oz</option>
          <option>5oz</option>
          <option>2lb</option>
        </select>
        <div
          className="ml-auto"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div className="qty-ctrl">
            <button className="qty-btn">−</button>
            <span className="qty-num">1</span>
            <button className="qty-btn">+</button>
          </div>
          <button className="btn-black" style={{ fontSize: 13 }}>
            $22.50 · Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
