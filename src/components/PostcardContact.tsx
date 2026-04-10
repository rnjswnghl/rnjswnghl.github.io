import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const POSTCARD_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663534339967/jqQgNSLLGrDbhXNXikzF9b/postcard-bg-bxQeJ3Wd69ByxTmx6biS5C.webp";

export default function PostcardContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("메시지 전송 완료! 곧 답장드릴게요.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-40" style={{ backgroundColor: "#F5F5DC" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-mono-custom text-sm tracking-widest" style={{ fontFamily: "'Courier Prime', monospace", color: "#B8654B" }}>
            SEND A POSTCARD
          </span>
          <h2 className="font-display text-5xl lg:text-6xl mt-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
            Let's Connect
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-0 border-4 shadow-2xl overflow-hidden"
          style={{ borderColor: "#1A3A52" }}
        >
          <div
            className="h-96 lg:h-auto"
            style={{
              backgroundImage: `url(${POSTCARD_BG})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="p-8 lg:p-12 flex flex-col justify-between" style={{ backgroundColor: "#F5F5DC" }}>
            <div className="mb-8 pb-8 border-b-2" style={{ borderColor: "#D4AF37" }}>
              <p className="font-body text-sm mb-4" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                디지털 여행지에서 인사드려요. 새로운 프로젝트, 협업, 채용 제안 모두 환영합니다.
              </p>
              <div className="space-y-2">
                <div className="h-px" style={{ backgroundColor: "#DDD" }} />
                <div className="h-px" style={{ backgroundColor: "#DDD" }} />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-display text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                Quick Links
              </h3>
              <div className="space-y-3">
                <a href="mailto:your.email@example.com" className="flex items-center gap-3 transition-all duration-200 group">
                  <Mail size={20} color="#B8654B" />
                  <span className="font-body text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                    your.email@example.com
                  </span>
                </a>
                <a
                  href="https://github.com/rnjswnghl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-all duration-200 group"
                >
                  <Github size={20} color="#B8654B" />
                  <span className="font-body text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                    github.com/rnjswnghl
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 transition-all duration-200 group"
                  aria-disabled="true"
                  onClick={(e) => e.preventDefault()}
                >
                  <Linkedin size={20} color="#B8654B" />
                  <span className="font-body text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
                    linkedin.com/in/yourname
                  </span>
                </a>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="font-mono-custom text-xs tracking-widest mb-2" style={{ fontFamily: "'Courier Prime', monospace", color: "#999" }}>
                  STATUS
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 border-2" style={{ borderColor: "#D4AF37" }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                  <span className="font-mono-custom text-xs" style={{ fontFamily: "'Courier Prime', monospace", color: "#1A3A52" }}>
                    AVAILABLE
                  </span>
                </div>
              </div>

              <div className="w-20 h-20 border-2 flex items-center justify-center" style={{ borderColor: "#B8654B", transform: "rotate(-15deg)" }}>
                <span className="font-mono-custom text-xs text-center tracking-widest" style={{ fontFamily: "'Courier Prime', monospace", color: "#B8654B" }}>
                  POSTAGE
                  <br />
                  PAID
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="bg-white p-8 border-2" style={{ borderColor: "#1A3A52" }}>
            <h3 className="font-display text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 font-body outline-none transition-all duration-200"
                style={{ fontFamily: "'Poppins', sans-serif", borderColor: "#DDD", color: "#1A3A52" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#D4AF37";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#DDD";
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 font-body outline-none transition-all duration-200"
                style={{ fontFamily: "'Poppins', sans-serif", borderColor: "#DDD", color: "#1A3A52" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#D4AF37";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#DDD";
                }}
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 border-2 font-body outline-none transition-all duration-200 resize-none"
                style={{ fontFamily: "'Poppins', sans-serif", borderColor: "#DDD", color: "#1A3A52" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#D4AF37";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#DDD";
                }}
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 font-mono-custom tracking-widest transition-all duration-200 border-2"
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  backgroundColor: "#D4AF37",
                  color: "#1A3A52",
                  borderColor: "#D4AF37",
                  fontSize: "12px",
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
                <Send size={16} />
                SEND MESSAGE
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

