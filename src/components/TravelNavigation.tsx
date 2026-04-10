import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plane, X } from "lucide-react";

const navItems = [
  { label: "JOURNEY", href: "#journey" },
  { label: "PASSPORT", href: "#passport" },
  { label: "CONTACT", href: "#contact" },
];

export default function TravelNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "#1A3A52" : "transparent",
          borderBottom: scrolled ? "2px solid #D4AF37" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 transition-all duration-200"
          >
            <Plane size={24} color={scrolled ? "#D4AF37" : "#B8654B"} />
            <span
              className="font-display text-xl tracking-wider"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: scrolled ? "#F5F5DC" : "#1A3A52",
              }}
            >
              TRAVELER
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="font-mono-custom text-xs tracking-widest transition-all duration-200"
                style={{
                  fontFamily: "'Courier Prime', monospace",
                  color: scrolled ? "#F5F5DC" : "#1A3A52",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? "#F5F5DC" : "#1A3A52";
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={24} color={scrolled ? "#F5F5DC" : "#1A3A52"} />
            ) : (
              <Menu size={24} color={scrolled ? "#F5F5DC" : "#1A3A52"} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{ backgroundColor: "#1A3A52", borderBottom: "2px solid #D4AF37" }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-6 py-4 font-display text-lg tracking-wider border-b transition-colors duration-200"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#F5F5DC",
                  borderColor: "rgba(212,175,55,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#F5F5DC";
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

