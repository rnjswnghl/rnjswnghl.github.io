import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

const PASSPORT_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/passport-page-FVDrJSCdXt6FT97Pfj2RaX.webp";

type TechStamp = { name: string; emoji: string; color: string };

const techStamps: TechStamp[] = [
  { name: "React", emoji: "⚛️", color: "#61DAFB" },
  { name: "Vue", emoji: "🟩", color: "#42B883" },
  { name: "Node.js", emoji: "🟢", color: "#68A063" },
  { name: "Python", emoji: "🐍", color: "#3776AB" },
  { name: "TypeScript", emoji: "📘", color: "#3178C6" },
  { name: "Django", emoji: "🛠️", color: "#0C4B33" },
  { name: "Docker", emoji: "🐳", color: "#2496ED" },
  { name: "Git", emoji: "🔀", color: "#F05032" },
];

export default function PassportSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stampRotations = useMemo(
    () => techStamps.map(() => `${Math.random() * 6 - 3}deg`),
    []
  );

  return (
    <section id="passport" ref={ref} className="py-24 lg:py-40" style={{ backgroundColor: "#F5F5DC" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono-custom text-sm tracking-widest" style={{ fontFamily: "'Courier Prime', monospace", color: "#B8654B" }}>
            PASSPORT & STAMPS
          </span>
          <h2 className="font-display text-5xl lg:text-6xl mt-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
            My Developer Profile
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div
              className="w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border-4"
              style={{
                backgroundImage: `url(${PASSPORT_BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderColor: "#1A3A52",
              }}
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                    DEVELOPER
                  </h3>
                  <p className="font-mono-custom text-sm mt-2" style={{ fontFamily: "'Courier Prime', monospace", color: "#5A5A5A" }}>
                    Full Stack Engineer
                  </p>
                </div>

                <div>
                  <p className="font-body text-sm leading-relaxed mb-6" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                    사용자 경험을 최우선으로 두고, 유지보수성과 확장성을 갖춘 웹 서비스를 만드는 걸 좋아합니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-12">
              <h3 className="font-display text-3xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                About This Journey
              </h3>
              <p className="font-body text-base leading-relaxed mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                여러 기술 스택과 도메인을 넘나들며 프로젝트를 만들었습니다. 각 프로젝트는 목적지이고, 각 기술은 새로운 스탬프입니다.
              </p>
              <p className="font-body text-base leading-relaxed" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                나의 철학:{" "}
                <span style={{ color: "#D4AF37", fontWeight: 700 }}>
                  여행하듯 오래 쓰이는 코드
                </span>
                — 유지보수 가능하고, 확장 가능하며, 환경 변화에 유연한 코드.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xl mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                Visited Technologies
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {techStamps.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.08 + 0.3 }}
                    className="vintage-stamp p-4 text-center"
                    style={{
                      borderColor: tech.color,
                      backgroundColor: "rgba(245,245,220,0.5)",
                      transform: `rotate(${stampRotations[i]})`,
                    }}
                  >
                    <div className="text-3xl mb-2">{tech.emoji}</div>
                    <span className="font-mono-custom text-xs tracking-widest block" style={{ fontFamily: "'Courier Prime', monospace", color: tech.color }}>
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

