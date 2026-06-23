import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useActiveSection } from "../../hooks/useActiveSection"
import { personalInfo } from "../../data/about"

/* ── Logo image — place your PNG at src/assets/ak-logo.png ──────
   The import.meta.glob pattern loads it if present; falls back to
   the inline SVG component if the file doesn't exist yet.          */
const logoModules = import.meta.glob("../../assets/ak-logo.*", { eager: true })
const logoKey     = Object.keys(logoModules)[0]
const akLogo      = logoKey ? logoModules[logoKey].default : null


const NAV_ITEMS = [
  { label: "About",          id: "about"          },
  { label: "Skills",         id: "skills"         },
  { label: "Projects",       id: "projects"       },
  { label: "Workflow",       id: "workflow"       },
  { label: "Experience",     id: "experience"     },
  { label: "Certifications", id: "certifications" },
  { label: "Contact",        id: "contact"        },
]

const SECTION_IDS = ["hero", ...NAV_ITEMS.map((n) => n.id)]

/* ─────────────────────────────────────────────────────────────────
   AK Neural-Brain Logo — SVG recreation of the attached image_1.png
   Geometric brain shape + circuit traces + teal/gold "AK" letters
   + subtle glow filter
───────────────────────────────────────────────────────────────── */
function AKLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AK Neural Brain Logo"
      role="img"
    >
      <defs>
        {/* Teal-to-gold gradient — matches the logo */}
        <linearGradient id="akGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#00D4AA" />
          <stop offset="45%"  stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#C8A84B" />
        </linearGradient>
        {/* Gold gradient for circuit traces */}
        <linearGradient id="goldGrad" x1="40" y1="40" x2="80" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E8C547" />
          <stop offset="100%" stopColor="#C8913A" />
        </linearGradient>
        {/* Deep blue background gradient */}
        <radialGradient id="bgGrad" cx="60" cy="55" r="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#0D2B3E" />
          <stop offset="70%"  stopColor="#081828" />
          <stop offset="100%" stopColor="#050E1A" />
        </radialGradient>
        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Strong centre glow */}
        <filter id="centreGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Outer geometric brain boundary ─────────────────────── */}
      {/* Background circle */}
      <circle cx="60" cy="60" r="56" fill="url(#bgGrad)" />

      {/* Outer octagon ring — brain silhouette */}
      <polygon
        points="60,6  95,20  112,52  108,88  82,110  38,110  12,88  8,52  25,20"
        fill="none"
        stroke="url(#akGrad)"
        strokeWidth="1.2"
        opacity="0.45"
      />

      {/* ── Geometric brain facet lines (left hemisphere) ──────── */}
      <g stroke="#1A4A6B" strokeWidth="0.8" opacity="0.7">
        {/* Left lobe triangulation */}
        <line x1="12" y1="52" x2="38" y2="35" />
        <line x1="12" y1="52" x2="25" y2="20" />
        <line x1="25" y1="20" x2="60" y2="6" />
        <line x1="38" y1="35" x2="25" y2="20" />
        <line x1="38" y1="35" x2="60" y2="28" />
        <line x1="12" y1="52" x2="22" y2="75" />
        <line x1="22" y1="75" x2="38" y2="35" />
        <line x1="22" y1="75" x2="12" y2="88" />
        <line x1="12" y1="88" x2="38" y2="110" />
        <line x1="38" y1="110" x2="22" y2="75" />
        <line x1="38" y1="110" x2="50" y2="90" />
        <line x1="22" y1="75" x2="50" y2="90" />
      </g>

      {/* ── Geometric brain facet lines (right hemisphere) ─────── */}
      <g stroke="#1A4A6B" strokeWidth="0.8" opacity="0.7">
        {/* Right lobe triangulation */}
        <line x1="108" y1="52" x2="82" y2="35" />
        <line x1="108" y1="52" x2="95" y2="20" />
        <line x1="95" y1="20" x2="60" y2="6" />
        <line x1="82" y1="35" x2="95" y2="20" />
        <line x1="82" y1="35" x2="60" y2="28" />
        <line x1="108" y1="52" x2="98" y2="75" />
        <line x1="98" y1="75" x2="82" y2="35" />
        <line x1="98" y1="75" x2="108" y2="88" />
        <line x1="108" y1="88" x2="82" y2="110" />
        <line x1="82" y1="110" x2="98" y2="75" />
        <line x1="82" y1="110" x2="70" y2="90" />
        <line x1="98" y1="75" x2="70" y2="90" />
      </g>

      {/* ── Bright centre dividing line (brain midline glow) ────── */}
      <line x1="60" y1="6" x2="60" y2="110"
        stroke="url(#akGrad)" strokeWidth="0.6" opacity="0.25" />

      {/* ── Top centre glow burst ────────────────────────────────── */}
      <circle cx="60" cy="18" r="3" fill="#E0F8F5" opacity="0.9" filter="url(#centreGlow)" />
      <circle cx="60" cy="18" r="1.5" fill="#FFFFFF" />

      {/* ── "A" letterform — left: triangular stroke ────────────── */}
      {/* The A is formed by two converging strokes meeting at apex ~(50,22) */}
      <g filter="url(#glow)">
        {/* Left leg of A */}
        <line x1="36" y1="88" x2="50" y2="22"
          stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        {/* Right leg of A */}
        <line x1="64" y1="22" x2="50" y2="22"
          stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="64" y1="22" x2="54" y2="65"
          stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        {/* Crossbar of A */}
        <line x1="40" y1="60" x2="56" y2="60"
          stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* ── "K" letterform — right side ─────────────────────────── */}
      <g filter="url(#glow)">
        {/* Vertical spine of K */}
        <line x1="65" y1="22" x2="65" y2="95"
          stroke="url(#akGrad)" strokeWidth="4.5" strokeLinecap="round" />
        {/* Upper diagonal of K (top arm — pointing to upper right) */}
        <line x1="65" y1="55" x2="92" y2="26"
          stroke="url(#akGrad)" strokeWidth="4" strokeLinecap="round" />
        {/* Lower diagonal of K (bottom arm — pointing to lower right) */}
        <line x1="65" y1="55" x2="94" y2="90"
          stroke="url(#akGrad)" strokeWidth="4" strokeLinecap="round" />
        {/* Small serif / foot accent on K */}
        <path d="M90,88 Q97,90 98,82" stroke="url(#goldGrad)" strokeWidth="2.5"
          strokeLinecap="round" fill="none" />
      </g>

      {/* ── Circuit traces — stems + nodes (the PCB pattern in logo) */}
      <g filter="url(#glow)" opacity="0.9">
        {/* Central vertical trace */}
        <line x1="50" y1="72" x2="50" y2="104"
          stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round" />
        {/* Node at bottom */}
        <circle cx="50" cy="104" r="3.5" fill="url(#goldGrad)" />
        {/* Upper node */}
        <circle cx="50" cy="72"  r="3"   fill="url(#goldGrad)" />
        {/* Branch left */}
        <line x1="44" y1="82" x2="50" y2="82"
          stroke="url(#goldGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="44" cy="82" r="2.2" fill="url(#goldGrad)" />
        {/* Branch right */}
        <line x1="56" y1="78" x2="50" y2="78"
          stroke="url(#goldGrad)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="56" cy="78" r="2.2" fill="url(#goldGrad)" />
        {/* Second vertical left trace */}
        <line x1="40" y1="68" x2="40" y2="95"
          stroke="url(#akGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        {/* Second vertical right trace */}
        <line x1="60" y1="68" x2="60" y2="95"
          stroke="url(#akGrad)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* ── Outer ring glow — full circle halo ──────────────────── */}
      <circle cx="60" cy="60" r="54" fill="none"
        stroke="url(#akGrad)" strokeWidth="1" opacity="0.35" />
      <circle cx="60" cy="60" r="56" fill="none"
        stroke="#00D4AA" strokeWidth="0.5" opacity="0.15"
        filter="url(#centreGlow)" />
    </svg>
  )
}

/* ── Desktop nav button with glassmorphism + gold-teal active ──── */
function NavButton({ label, id, isActive, onClick }) {
  return (
    <li style={{ listStyle: "none", position: "relative" }}>
      <button
        onClick={() => onClick(id)}
        aria-current={isActive ? "page" : undefined}
        style={{
          position: "relative",
          padding: "6px 14px",
          borderRadius: "7px",
          fontSize: "13px",
          fontWeight: isActive ? 600 : 400,
          cursor: "pointer",
          border: isActive
            ? "1px solid rgba(0,212,170,0.28)"
            : "1px solid transparent",
          background: isActive
            ? "rgba(0,212,170,0.10)"
            : "transparent",
          color: isActive
            ? "#7FFFD4"   /* aquamarine-teal active */
            : "#9BBFCC",  /* metallic blue-grey */
          transition: "all 0.22s ease",
          letterSpacing: "0.012em",
          backdropFilter: isActive ? "blur(4px)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.color = "#C8E8D4"
            e.currentTarget.style.background = "rgba(255,255,255,0.05)"
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.color = "#9BBFCC"
            e.currentTarget.style.background = "transparent"
            e.currentTarget.style.border = "1px solid transparent"
          }
        }}
      >
        {label}

        {/* Animated gold-teal underline on active */}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            style={{
              position: "absolute",
              bottom: "2px",
              left: "14px",
              right: "14px",
              height: "2px",
              borderRadius: "1px",
              background: "linear-gradient(to right, #00D4AA, #C8A84B)",
              boxShadow: "0 0 8px rgba(0,212,170,0.7)",
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </li>
  )
}

/* ─────────────────────────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 60)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener("resize", fn)
    return () => window.removeEventListener("resize", fn)
  }, [])

  const scrollTo = useCallback((id) => {
    setMenuOpen(false)
    // Small delay lets the mobile drawer close and layout settle
    // before we calculate the element's position
    setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: "smooth" })
    }, 80)
  }, [])

  return (
    <>
      <style>{`
        .nav-desktop-list { display: none !important; }
        .nav-hire-btn     { display: none !important; }
        .nav-hamburger    { display: flex !important; }
        @media (min-width: 1024px) {
          .nav-desktop-list { display: flex !important; }
          .nav-hire-btn     { display: flex !important; }
          .nav-hamburger    { display: none !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          /* ── Iridescent deep blue-green — distinct from page body #0A0F1E ── */
          background: isScrolled
            ? "rgba(4, 22, 32, 0.97)"    /* deep teal-navy at 97% */
            : "rgba(4, 20, 30, 0.78)",   /* same hue, more transparent */
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          borderBottom: "1px solid rgba(0,212,170,0.14)",
          /* Fine glowing bottom edge */
          boxShadow: isScrolled
            ? "0 1px 0 0 rgba(0,212,170,0.12), 0 4px 24px rgba(0,0,0,0.5)"
            : "0 1px 0 0 rgba(0,212,170,0.07)",
          transition: "background 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <nav
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 clamp(1.5rem, 5vw, 4rem)",
            height: "66px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
          aria-label="Main navigation"
        >
          {/* ── Logo — AK Neural Brain Icon ─────────────────────── */}
          <button
            onClick={() => scrollTo("hero")}
            aria-label="Back to top — AK Portfolio"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: "4px 6px",
              borderRadius: "8px",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(0,212,170,0.07)"
              e.currentTarget.style.filter = "drop-shadow(0 0 8px rgba(0,212,170,0.5))"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "none"
              e.currentTarget.style.filter = "none"
            }}
          >
            {akLogo ? (
              <img
                src={akLogo}
                alt="AK Neural Brain Logo"
                style={{ width: 42, height: 42, objectFit: "contain" }}
              />
            ) : (
              <AKLogo size={42} />
            )}
          </button>

          {/* ── Desktop nav links in glass pill tray ─────────────── */}
          <ul
            className="nav-desktop-list"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2px",
              listStyle: "none",
              /* Glass tray — iridescent teal tint */
              background: "rgba(0, 60, 70, 0.35)",
              border: "1px solid rgba(0,212,170,0.12)",
              borderRadius: "12px",
              padding: "4px 6px",
              backdropFilter: "blur(12px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {NAV_ITEMS.map(({ label, id }) => (
              <NavButton
                key={id}
                label={label}
                id={id}
                isActive={activeSection === id}
                onClick={scrollTo}
              />
            ))}
          </ul>

          {/* ── Hire Me CTA ───────────────────────────────────────── */}
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-hire-btn"
            style={{
              alignItems: "center",
              gap: "6px",
              /* Gold-teal gradient matching logo */
              background: "linear-gradient(135deg, #00D4AA 0%, #4ECDC4 40%, #C8A84B 100%)",
              color: "#040E18",
              fontWeight: 700,
              fontSize: "13px",
              padding: "8px 20px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(0,212,170,0.32), inset 0 1px 0 rgba(255,255,255,0.25)",
              transition: "box-shadow 0.2s, transform 0.15s",
              whiteSpace: "nowrap",
              flexShrink: 0,
              letterSpacing: "0.01em",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,170,0.55), inset 0 1px 0 rgba(255,255,255,0.25)"
              e.currentTarget.style.transform = "translateY(-1px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 0 18px rgba(0,212,170,0.32), inset 0 1px 0 rgba(255,255,255,0.25)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            Hire Me ✨
          </a>

          {/* ── Hamburger ─────────────────────────────────────────── */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              padding: "8px", borderRadius: "10px", cursor: "pointer",
              color: "#7FFFD4",
              background: menuOpen ? "rgba(0,212,170,0.1)" : "transparent",
              border: `1px solid ${menuOpen ? "rgba(0,212,170,0.28)" : "rgba(0,212,170,0.12)"}`,
              transition: "all 0.2s", flexShrink: 0,
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}>
                    <X size={20} aria-hidden="true" />
                  </motion.div>
                : <motion.div key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}>
                    <Menu size={20} aria-hidden="true" />
                  </motion.div>
              }
            </AnimatePresence>
          </button>
        </nav>

        {/* ── Mobile drawer ─────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{
                background: "rgba(4, 18, 28, 0.98)",
                backdropFilter: "blur(28px)",
                borderBottom: "1px solid rgba(0,212,170,0.12)",
                overflow: "hidden",
              }}
            >
              <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px clamp(1.5rem,5vw,4rem)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
                  {NAV_ITEMS.map(({ label, id }) => {
                    const isActive = activeSection === id
                    return (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        aria-current={isActive ? "page" : undefined}
                        style={{
                          display: "flex", alignItems: "center",
                          padding: "11px 16px", borderRadius: "10px",
                          fontSize: "14px", fontWeight: isActive ? 600 : 400,
                          cursor: "pointer", textAlign: "left",
                          color: isActive ? "#7FFFD4" : "#9BBFCC",
                          background: isActive ? "rgba(0,212,170,0.1)" : "rgba(0,40,50,0.4)",
                          border: `1px solid ${isActive ? "rgba(0,212,170,0.25)" : "rgba(0,212,170,0.08)"}`,
                          transition: "all 0.2s",
                        }}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginTop: "10px", padding: "12px", borderRadius: "10px",
                    background: "linear-gradient(135deg, #00D4AA, #4ECDC4, #C8A84B)",
                    color: "#040E18", fontWeight: 700, fontSize: "14px",
                  }}
                >
                  Hire Me ✨
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
