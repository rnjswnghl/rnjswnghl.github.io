import { motion } from "framer-motion";
import { Compass, MapPin, Plane } from "lucide-react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/travel-hero-bg-gDwFJ3Tv72YAWx6iA3Y8iE.webp";

export default function TravelHeroSection() {
  const scrollToJourney = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,245,220,0.95) 0%, rgba(245,245,220,0.85) 100%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <Plane size={20} color="#B8654B" />
          <span
            className="font-mono-custom text-sm tracking-widest"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#B8654B" }}
          >
            WELCOME ABOARD
          </span>
          <Compass size={20} color="#B8654B" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-6xl lg:text-8xl leading-tight mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#1A3A52",
            fontWeight: 700,
          }}
        >
          A DEVELOPER'S
          <br />
          <span style={{ color: "#D4AF37" }}>JOURNEY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-lg lg:text-xl max-w-2xl mx-auto mb-12"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}
        >
          프로젝트, 기술, 경험을 여행의 렌즈로 풀어낸 개발자 포트폴리오입니다. 코드라는 지도를 따라 새로운 목적지를
          탐험해보세요.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onClick={scrollToJourney}
          className="inline-flex items-center gap-3 px-8 py-4 border-2 transition-all duration-300 hover:shadow-lg"
          style={{
            borderColor: "#1A3A52",
            backgroundColor: "#1A3A52",
            color: "#F5F5DC",
            fontFamily: "'Courier Prime', monospace",
            fontSize: "14px",
            letterSpacing: "2px",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#F5F5DC";
            el.style.color = "#1A3A52";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.backgroundColor = "#1A3A52";
            el.style.color = "#F5F5DC";
          }}
        >
          START JOURNEY
          <Plane size={16} />
        </motion.button>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div
            className="text-sm tracking-widest"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#1A3A52" }}
          >
            ↓
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute top-20 right-20 opacity-10 hidden lg:block"
      >
        <Compass size={100} color="#1A3A52" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-20 left-20 opacity-10 hidden lg:block"
      >
        <MapPin size={80} color="#D4AF37" />
      </motion.div>
    </section>
  );
}

