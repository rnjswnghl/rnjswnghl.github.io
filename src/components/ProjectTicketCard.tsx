import { ExternalLink, Github, Plane } from "lucide-react";

export type ProjectTicket = {
  id: number;
  name: string;
  period: string;
  summary: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  logoText?: string; // emoji or short text
  logoImageUrl?: string;
  comingSoon?: boolean;
};

type Props = {
  project: ProjectTicket;
  onOpenDemo: () => void;
  onOpenGithub: () => void;
};

export default function ProjectTicketCard({ project, onOpenDemo, onOpenGithub }: Props) {
  const demoDisabled = project.comingSoon || !project.demoUrl;
  const githubDisabled = project.comingSoon || !project.githubUrl;

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
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#B8654B]">TRAVEL EVENT</div>
                <div className="project-ticket__meta font-mono-custom text-[11px] tracking-[0.22em] text-[#1A3A52]/70">
                  FLIGHT: PRJ-{String(project.id).padStart(3, "0")} · GATE: A
                </div>
              </div>
              <div className="font-display text-3xl lg:text-4xl text-[#1A3A52] truncate">{project.name}</div>
              <div className="mt-2 font-mono-custom text-xs tracking-widest text-[#999]">{project.period}</div>
            </div>

            <div className="shrink-0">
              {project.logoImageUrl ? (
                <img
                  src={project.logoImageUrl}
                  alt={`${project.name} logo`}
                  className="h-14 w-14 border border-[#1A3A52]/30 bg-[#F5F5DC] object-contain p-2"
                  loading="lazy"
                />
              ) : (
                <div className="h-14 w-14 grid place-items-center border border-[#1A3A52]/30 bg-[#F5F5DC] text-3xl">
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
              <div className="mt-1 font-mono-custom text-xs tracking-widest text-[#1A3A52] truncate">
                {`PRJ-${String(project.id).padStart(3, "0")}-${project.period.replace(/\s+/g, "")}`}
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
                <div className="mt-1 font-mono-custom text-sm tracking-widest text-[#1A3A52]">{project.period}</div>
              </div>
              <div>
                <div className="font-mono-custom text-[11px] tracking-[0.28em] text-[#999]">STACK</div>
                <div className="mt-1 font-mono-custom text-sm tracking-widest text-[#1A3A52]">
                  {project.tech.length} TECH
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

