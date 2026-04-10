import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { useRef, useState } from "react";

const BOARDING_PASS_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/boarding-pass-template-dgKs64XcmT67wv6Ay2VSMc.webp";

type Project = {
  id: number;
  name: string;
  from: string;
  to: string;
  flightNo: string;
  date: string;
  description: string;
  tech: string[];
  github?: string;
  demoUrl?: string;
  icon: string;
};

const projects: Project[] = [
  {
    id: 1,
    name: "요리의 정원",
    from: "Vision",
    to: "Recipe",
    flightNo: "PRJ-001",
    date: "2024",
    description:
      "재료 사진 인식 레시피 추천 웹 서비스. YOLOv11로 재료를 인식하고 Gemini API로 레시피를 추천합니다.",
    tech: ["Flask", "Python", "YOLOv11", "Gemini API"],
    github: "https://github.com/ggabaegii/RecipeRecommendation",
    demoUrl: "/projects/project1/index.html",
    icon: "🥗",
  },
  {
    id: 2,
    name: "한페이지",
    from: "Backend",
    to: "Frontend",
    flightNo: "PRJ-002",
    date: "2024",
    description:
      "Django + Vue로 만든 도서 추천 웹 서비스. 맞춤 추천, 커뮤니티, AI 기능(gTTS/이미지 생성)을 제공합니다.",
    tech: ["Django", "Vue.js", "DRF", "AI"],
    demoUrl: "/projects/project2/front/dist/index.html",
    icon: "📚",
  },
  {
    id: 3,
    name: "FocusMate",
    from: "Match",
    to: "Study Room",
    flightNo: "PRJ-003",
    date: "2024",
    description:
      "온라인 스터디 메이트 매칭 + 실시간 화상회의 플랫폼. WebRTC(OpenVidu) 기반 통화/화면공유/화이트보드/뽀모도로 제공.",
    tech: ["Vue 3", "TypeScript", "OpenVidu", "WebRTC"],
    demoUrl: "/projects/project3/dist/index.html",
    icon: "🎥",
  },
];

function DemoModal({ project, onClose }: { project: Project; onClose: () => void }) {
  if (!project.demoUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-4 border-b" style={{ borderColor: "#EEE" }}>
            <div
              className="font-display text-lg"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}
            >
              {project.name} · Demo
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded transition-colors" aria-label="Close">
              <X size={20} color="#1A3A52" />
            </button>
          </div>
          <iframe title={`${project.name} demo`} src={project.demoUrl} className="w-full h-[75vh]" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function BoardingPassCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextProject = () => setCurrentIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const currentProject = projects[currentIndex];

  return (
    <section id="journey" className="py-24 lg:py-40" style={{ backgroundColor: "#F5F5DC" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span
            className="font-mono-custom text-sm tracking-widest"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#B8654B" }}
          >
            MAIN JOURNEY
          </span>
          <h2 className="font-display text-5xl lg:text-6xl mt-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
            Featured Projects
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="boarding-pass p-8 lg:p-12"
              style={{
                backgroundImage: `url(${BOARDING_PASS_BG})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span
                        className="font-mono-custom text-xs tracking-widest block mb-2"
                        style={{ fontFamily: "'Courier Prime', monospace", color: "#B8654B" }}
                      >
                        FLIGHT NO.
                      </span>
                      <span
                        className="font-mono-custom text-lg font-bold"
                        style={{ fontFamily: "'Courier Prime', monospace", color: "#1A3A52" }}
                      >
                        {currentProject.flightNo}
                      </span>
                    </div>
                    <div className="text-5xl">{currentProject.icon}</div>
                  </div>

                  <div className="mb-8 pb-8 border-b-2" style={{ borderColor: "#D4AF37" }}>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <span
                          className="font-mono-custom text-xs tracking-widest block mb-2"
                          style={{ fontFamily: "'Courier Prime', monospace", color: "#999" }}
                        >
                          FROM
                        </span>
                        <span className="font-display text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                          {currentProject.from}
                        </span>
                      </div>
                      <div>
                        <span
                          className="font-mono-custom text-xs tracking-widest block mb-2"
                          style={{ fontFamily: "'Courier Prime', monospace", color: "#999" }}
                        >
                          TO
                        </span>
                        <span className="font-display text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                          {currentProject.to}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <span
                      className="font-mono-custom text-xs tracking-widest block mb-2"
                      style={{ fontFamily: "'Courier Prime', monospace", color: "#999" }}
                    >
                      DATE
                    </span>
                    <span className="font-display text-xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                      {currentProject.date}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-3xl lg:text-4xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                      {currentProject.name}
                    </h3>
                    <p className="font-body text-base mb-6" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                      {currentProject.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {currentProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-custom text-xs px-3 py-1 border"
                          style={{
                            fontFamily: "'Courier Prime', monospace",
                            borderColor: "#D4AF37",
                            color: "#1A3A52",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    {currentProject.github && (
                      <button
                        onClick={() => window.open(currentProject.github, "_blank", "noopener,noreferrer")}
                        className="flex items-center gap-2 px-6 py-3 border-2 transition-all duration-200"
                        style={{
                          borderColor: "#1A3A52",
                          color: "#1A3A52",
                          fontFamily: "'Courier Prime', monospace",
                          fontSize: "12px",
                          letterSpacing: "1px",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.backgroundColor = "#1A3A52";
                          el.style.color = "#F5F5DC";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.backgroundColor = "transparent";
                          el.style.color = "#1A3A52";
                        }}
                      >
                        <Github size={16} />
                        GITHUB
                      </button>
                    )}
                    {currentProject.demoUrl && (
                      <button
                        onClick={() => setSelectedProject(currentProject)}
                        className="flex items-center gap-2 px-6 py-3 border-2 transition-all duration-200"
                        style={{
                          borderColor: "#D4AF37",
                          backgroundColor: "#D4AF37",
                          color: "#1A3A52",
                          fontFamily: "'Courier Prime', monospace",
                          fontSize: "12px",
                          letterSpacing: "1px",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget;
                          el.style.backgroundColor = "#1A3A52";
                          el.style.color = "#F5F5DC";
                          el.style.borderColor = "#1A3A52";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget;
                          el.style.backgroundColor = "#D4AF37";
                          el.style.color = "#1A3A52";
                          el.style.borderColor = "#D4AF37";
                        }}
                      >
                        <ExternalLink size={16} />
                        VIEW DEMO
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevProject}
              className="p-3 border-2 transition-all duration-200"
              style={{ borderColor: "#1A3A52", color: "#1A3A52" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "#1A3A52";
                el.style.color = "#F5F5DC";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "transparent";
                el.style.color = "#1A3A52";
              }}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="w-2 h-2 rounded-full transition-all duration-200"
                  style={{ backgroundColor: i === currentIndex ? "#D4AF37" : "#CCC" }}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="p-3 border-2 transition-all duration-200"
              style={{ borderColor: "#1A3A52", color: "#1A3A52" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "#1A3A52";
                el.style.color = "#F5F5DC";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "transparent";
                el.style.color = "#1A3A52";
              }}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="text-center mt-6">
            <span className="font-mono-custom text-sm" style={{ fontFamily: "'Courier Prime', monospace", color: "#999" }}>
              {currentIndex + 1} / {projects.length}
            </span>
          </div>
        </div>
      </div>

      {selectedProject && <DemoModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}

