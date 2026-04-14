import { ExternalLink, Github, Plane } from "lucide-react";

export type ProjectTicket = {
  id: number;
  name: string;
  period: string;
  summary: string;
  tech: string[];
  /** 보딩 패스 스텁용: 태그 전체 개수가 아니라 강조하는 주요 스택 수(+ 그 외 포함) */
  mainStackCount: number;
  githubUrl?: string;
  demoUrl?: string;
  logoText?: string; // emoji or short text
  logoImageUrl?: string;
  /** 데모 팝업 프레젠테이션(웹/앱) */
  demoPresentation?: "default" | "phone";
  /** 프레임 크기는 동일, 내부 로고만 확대(에셋 여백 많을 때) */
  logoPresentation?: "default" | "large";
  /** SERIAL에만 사용, 없으면 `pjt-번호-년도`까지만 */
  teamName?: string;
  comingSoon?: boolean;
};

type Props = {
  project: ProjectTicket;
  onOpenDemo: () => void;
  onOpenGithub: () => void;
};

/** 보딩 패스 스텁 YEAR 칸용: 기간 문자열에서 연도만 추출 (한 해이면 `2024`, 두 해 걸치면 `2024–2025`) */
function stubYearLabel(period: string): string {
  const years = period.match(/\d{4}/g);
  if (!years?.length) return period;
  const uniq = [...new Set(years)];
  if (uniq.length === 1) return uniq[0];
  return `${uniq[0]}–${uniq.at(-1)!}`;
}

/** SERIAL: `pjt-프로젝트번호-년도[-팀]` (팀 없으면 생략) */
function formatSerial(project: ProjectTicket): string {
  const num = String(project.id).padStart(3, "0");
  const year = stubYearLabel(project.period).replace(/–/g, "-");
  const base = `pjt-${num}-${year}`;
  const team = project.teamName?.trim();
  return team ? `${base}-${team}` : base;
}

export default function ProjectTicketCard({ project, onOpenDemo, onOpenGithub }: Props) {
  const demoDisabled = project.comingSoon || !project.demoUrl;
  const githubDisabled = project.comingSoon || !project.githubUrl;
  const logoLarge = project.logoPresentation === "large";
  const serial = formatSerial(project);

  return (
    <div className="project-ticket relative overflow-hidden">
      {/* diagonal stripe band (top + bottom) */}
      <div className="project-ticket__stripe" aria-hidden />
      <div className="project-ticket__stripe project-ticket__stripe--bottom" aria-hidden />

      <div className="project-ticket__inner grid gap-0 lg:grid-cols-[1fr_6fr_3fr]">
        {/* Column 1: barcode */}
        <div className="project-ticket__barcode-col relative hidden lg:block">
          <div className="project-ticket__barcode-vert" aria-hidden />
        </div>

        {/* Column 2: project content */}
        <div className="project-ticket__main relative min-w-0 p-6 lg:p-8">
          <div className="flex items-center justify-between gap-6 lg:gap-8">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#B8654B]">TRAVEL EVENT</div>
                <div className="project-ticket__meta font-mono-custom text-[11px] tracking-[0.22em] text-[#1A3A52]/70">
                  FLIGHT: PRJ-{String(project.id).padStart(3, "0")} · GATE: A
                </div>
              </div>
              <div className="font-display text-3xl lg:text-4xl text-[#1A3A52] truncate">{project.name}</div>
              <div className="mt-2 font-mono-custom text-xs leading-relaxed text-[#999]">{project.period}</div>
            </div>

            <div className="shrink-0">
              {project.logoImageUrl ? (
                <div className="flex h-[5.25rem] w-[5.25rem] sm:h-24 sm:w-24 items-center justify-center overflow-hidden border border-[#1A3A52]/25 bg-white p-3 shadow-sm">
                  <img
                    src={project.logoImageUrl}
                    alt={`${project.name} logo`}
                    className={
                      logoLarge
                        ? "max-h-full max-w-full object-contain scale-[1.2] origin-center"
                        : "max-h-full max-w-full object-contain"
                    }
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="grid h-[5.25rem] w-[5.25rem] place-items-center border border-[#1A3A52]/25 bg-white text-5xl shadow-sm sm:h-24 sm:w-24">
                  {project.logoText ?? "✈️"}
                </div>
              )}
            </div>
          </div>

          <div className="mt-7">
            <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">ABOUT</div>
            <p className="mt-2 font-body text-[15px] leading-6 text-[#5A5A5A]">{project.summary}</p>
          </div>

          <div className="mt-7">
            <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">STACK</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono-custom text-[11px] px-3 py-1 border border-[#D4AF37] text-[#1A3A52] bg-[#F5F5DC]/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">SERIAL</div>
              <div
                className="mt-1 font-mono-custom text-xs tracking-wide text-[#1A3A52] break-all"
                title={serial}
              >
                {serial}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: stub (actions) — perforation is absolute; center the card in the column */}
        <div className="project-ticket__stub min-w-0 p-6 lg:p-8 flex flex-col justify-center">
          <span className="project-ticket__perforation" aria-hidden />
          <div className="border border-[#1A3A52]/15 bg-white/55 px-5 py-6 backdrop-blur-[2px] flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between">
              <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">BOARDING PASS</div>
              <Plane size={18} color="#1A3A52" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">YEAR</div>
                <div className="mt-1 font-mono-custom text-sm tracking-widest text-[#1A3A52]">
                  {stubYearLabel(project.period)}
                </div>
              </div>
              <div>
                <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">STACK</div>
                <div className="mt-1 font-mono-custom text-sm tracking-widest text-[#1A3A52]">
                  {project.mainStackCount}+ TECH
                </div>
              </div>
              <div>
                <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">STATUS</div>
                <div
                  className="mt-1 inline-flex font-mono-custom text-[11px] tracking-widest px-2 py-1 border"
                  style={{
                    borderColor: project.comingSoon ? "#B8654B" : "#1A3A52",
                    color: project.comingSoon ? "#B8654B" : "#1A3A52",
                  }}
                >
                  {project.comingSoon ? "SOON" : "READY"}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                type="button"
                onClick={onOpenDemo}
                disabled={demoDisabled}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border-2 transition-colors duration-200 font-mono-custom text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1A3A52] hover:text-[#F5F5DC]"
                style={{
                  borderColor: "#1A3A52",
                  backgroundColor: "transparent",
                  color: "#1A3A52",
                }}
              >
                <ExternalLink size={16} />
                VIEW DEMO
              </button>

              <button
                type="button"
                onClick={onOpenGithub}
                disabled={githubDisabled}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 border-2 transition-colors duration-200 font-mono-custom text-xs tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#D4AF37] hover:border-[#D4AF37]"
                style={{
                  borderColor: "#D4AF37",
                  backgroundColor: "#D4AF37",
                  color: "#1A3A52",
                }}
              >
                <Github size={16} />
                GITHUB
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">
                CHECK-IN <span className="ml-2 text-[#1A3A52] tracking-widest">{project.comingSoon ? "TBD" : "OPEN"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

