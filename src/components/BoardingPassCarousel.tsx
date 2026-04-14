import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProjectTicketCard, { type ProjectTicket } from "@/components/ProjectTicketCard";

const projects: ProjectTicket[] = [
  {
    id: 1,
    name: "요리의 정원",
    period: "2024.10.07 ~ 2024.12.24",
    summary:
      "재료 사진 인식 레시피 추천 웹 서비스. YOLOv11로 재료를 인식하고 Gemini API로 레시피를 추천합니다.",
    tech: ["Flask", "Python", "YOLOv11", "Gemini API"],
    mainStackCount: 3,
    githubUrl: "https://github.com/ggabaegii/RecipeRecommendation",
    demoUrl: "/projects/project1/index.html",
    logoImageUrl: "/projects/project1/static/images/mascot.jpg",
    teamName: "ojo",
  },
  {
    id: 2,
    name: "한페이지",
    period: "2025.05.22 ~ 2025.05.28",
    summary:
      "Django + Vue로 만든 도서 추천 웹 서비스. 맞춤 추천, 커뮤니티, AI 기능(gTTS/이미지 생성)을 제공합니다.",
    tech: ["Django", "Vue.js", "DRF", "AI"],
    mainStackCount: 3,
    demoUrl: "/projects/project2/front/dist/index.html",
    logoImageUrl: "/projects/project2/front/src/assets/lib.jpg",
  },
  {
    id: 3,
    name: "FocusMate",
    period: "2025.07.07 ~ 2025.08.22",
    summary:
      "온라인 스터디 메이트 매칭 + 실시간 화상회의 플랫폼. WebRTC(OpenVidu) 기반 통화/화면공유/화이트보드/뽀모도로 제공.",
    tech: ["Vue 3", "TypeScript", "OpenVidu", "WebRTC"],
    mainStackCount: 3,
    demoUrl: "/projects/project3/dist/index.html",
    logoImageUrl: "/projects/project3/src/assets/images/FMlogo.png",
    logoPresentation: "large",
    teamName: "ChillySource",
  },
  {
    id: 4,
    name: "On-Wear",
    period: "2025.08.25 ~ 2025.09.29",
    summary:
      "가상 피팅·이미지 검색·맞춤 추천·인기 아이템을 한 화면에서 제공하는 패션 큐레이션 서비스.",
    tech: ["React", "TypeScript", "Vite", "Zustand", "Emotion", "GSAP"],
    mainStackCount: 4,
    githubUrl: "https://github.com/On-Wear-SSAFY-13",
    // React SPA는 /index.html 경로로 들어가면 라우터가 매칭 실패할 수 있어 base 루트로 연결
    demoUrl: "/projects/project4/dist/",
    logoImageUrl: "/projects/project4/public/img/logo.png",
    logoPresentation: "large",
    teamName: "BusanTong",
  },
  {
    id: 5,
    name: "Daltoori",
    period: "2025.10.10 ~ 2025.11.20",
    summary:
      "AI·알고리즘 기반 음성 분석으로 발음/억양 교정을 돕는 모바일 앱. 표준 발음 측정, 피치 시각화, AI 피드백, 참조 음성(TTS) 생성, 학습 이력 관리를 제공합니다.",
    tech: ["React Native", "Expo Router", "TypeScript", "FastAPI", "Spring Boot", "MySQL"],
    mainStackCount: 4,
    githubUrl: "https://github.com/DALTOORI-SSAFY-13/e101",
    // Expo Web export 결과를 정적 데모로 연결
    demoUrl: "/projects/project5/dist-web/",
    demoPresentation: "phone",
    logoImageUrl: "/projects/project5/assets/images/Daltoori%20logo.png",
    teamName: "DORAEMONG",
  },
];

function DemoModal({ project, onClose }: { project: ProjectTicket; onClose: () => void }) {
  if (!project.demoUrl) return null;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // 모달이 열려있는 동안 배경(페이지) 스크롤 잠금
  useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

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
          className={
            project.demoPresentation === "phone"
              ? "bg-white rounded-[28px] w-[392px] max-w-[92vw] h-[780px] max-h-[92vh] overflow-hidden shadow-2xl overscroll-contain border border-black/10"
              : "bg-white rounded-lg w-[94vw] h-[92vh] max-w-[1400px] max-h-[92vh] overflow-hidden shadow-2xl overscroll-contain"
          }
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
          <iframe
            title={`${project.name} demo`}
            src={project.demoUrl}
            className="w-full"
            style={{
              height:
                project.demoPresentation === "phone"
                  ? "calc(min(92vh, 780px) - 64px)"
                  : "calc(92vh - 64px)",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function BoardingPassCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectTicket | null>(null);
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
              className="relative"
            >
              <ProjectTicketCard
                project={currentProject}
                onOpenDemo={() => setSelectedProject(currentProject)}
                onOpenGithub={() => {
                  if (!currentProject.githubUrl) return;
                  window.open(currentProject.githubUrl, "_blank", "noopener,noreferrer");
                }}
              />

              <div className="absolute left-1/2 -translate-x-1/2 -bottom-7 flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="h-2.5 rounded-full transition-all duration-200"
                    style={{
                      width: i === currentIndex ? "18px" : "10px",
                      backgroundColor: i === currentIndex ? "#D4AF37" : "rgba(26,58,82,0.25)",
                    }}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Outside controls (never overlap the ticket) */}
          <div className="pointer-events-none absolute inset-y-0 -left-14 -right-14 hidden lg:block group">
            <div className="relative h-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto group/left">
                <button
                  type="button"
                  onClick={prevProject}
                  className="px-1 py-2 text-[#1A3A52] opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={36} strokeWidth={1.6} />
                </button>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto group/right">
                <button
                  type="button"
                  onClick={nextProject}
                  className="px-1 py-2 text-[#1A3A52] opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:opacity-100 focus-visible:opacity-100"
                  aria-label="Next project"
                >
                  <ChevronRight size={36} strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProject && <DemoModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}

