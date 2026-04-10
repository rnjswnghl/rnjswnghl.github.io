import { MapPin, Plane } from "lucide-react";

export default function TravelFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t-4" style={{ backgroundColor: "#F5F5DC", borderColor: "#1A3A52" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane size={24} color="#B8654B" />
              <span className="font-display text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
                TRAVELER
              </span>
            </div>
            <p className="font-body text-sm" style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}>
              A developer's journey through code and creativity.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
              DESTINATIONS
            </h4>
            <div className="space-y-2">
              {["Journey", "Passport", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block font-body text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5A5A5A";
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1A3A52" }}>
              FOLLOW
            </h4>
            <div className="flex gap-4">
              {[
                { label: "GitHub", href: "https://github.com/rnjswnghl" },
                { label: "LinkedIn", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="font-body text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Poppins', sans-serif", color: "#5A5A5A" }}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5A5A5A";
                  }}
                  onClick={(e) => {
                    if (social.href === "#") e.preventDefault();
                  }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px mb-8" style={{ backgroundColor: "#DDD" }} />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="font-mono-custom text-xs tracking-widest" style={{ fontFamily: "'Courier Prime', monospace", color: "#999" }}>
            © {currentYear} DEVELOPER TRAVELER. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 font-mono-custom text-xs tracking-widest transition-colors duration-200"
            style={{ fontFamily: "'Courier Prime', monospace", color: "#1A3A52" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1A3A52";
            }}
          >
            BACK TO TOP
            <MapPin size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

