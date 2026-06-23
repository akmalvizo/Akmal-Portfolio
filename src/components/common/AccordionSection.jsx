/**
 * AccordionSection — wraps any section with a premium glassmorphism
 * "View Details / Hide Details" button.
 *
 * Props:
 *   id          — section id (used for the <section> element)
 *   heading     — section heading element (JSX)
 *   preview     — optional JSX shown before expand (badge + heading only)
 *   children    — full section content (hidden until expanded)
 *   background  — override section background color
 *   style       — extra inline styles for the outer <section>
 */

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react"

/* ── Premium glassmorphism toggle button ────────────────────── */
function ViewButton({ isOpen, onClick }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={reduced ? {} : { scale: 1.02, y: -2 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-expanded={isOpen}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "12px 28px",
        borderRadius: "14px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        overflow: "hidden",
        /* Glassmorphism */
        background: isOpen
          ? "linear-gradient(135deg,rgba(0,229,204,0.18),rgba(167,139,250,0.12))"
          : "linear-gradient(135deg,rgba(0,229,204,0.10),rgba(167,139,250,0.06))",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1.5px solid ${isOpen ? "rgba(0,229,204,0.45)" : "rgba(0,229,204,0.22)"}`,
        color: isOpen ? "#00E5CC" : "#A0AEC0",
        boxShadow: hovered || isOpen
          ? "0 8px 32px rgba(0,229,204,0.18), 0 0 0 1px rgba(0,229,204,0.12), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Shimmer sweep on hover */}
      {hovered && !reduced && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "200%", opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0, bottom: 0,
            width: "60%",
            background: "linear-gradient(90deg,transparent,rgba(0,229,204,0.25),transparent)",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      )}

      {/* Eye icon */}
      <motion.span
        animate={reduced ? {} : { rotate: isOpen ? 180 : 0, scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
      >
        {isOpen
          ? <EyeOff size={15} style={{ color: "#00E5CC" }} aria-hidden="true" />
          : <Eye    size={15} style={{ color: "#00E5CC" }} aria-hidden="true" />
        }
      </motion.span>

      {/* Label */}
      <span style={{ userSelect: "none" }}>
        {isOpen ? "Hide Details" : "View Details"}
      </span>

      {/* Animated chevron arrow */}
      <motion.span
        animate={reduced ? {} : { rotate: isOpen ? 180 : 0, x: hovered && !isOpen ? 3 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        aria-hidden="true"
      >
        <ChevronDown
          size={15}
          style={{
            color: isOpen ? "#00E5CC" : "#718096",
            transition: "color 0.25s",
          }}
        />
      </motion.span>

      {/* Active dot indicator */}
      {isOpen && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#00E5CC",
            boxShadow: "0 0 6px rgba(0,229,204,0.8)",
          }}
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}

/* ── Thin divider line ───────────────────────────────────────── */
function Divider() {
  return (
    <div style={{
      width: "120px",
      height: "3px",
      borderRadius: "2px",
      background: "linear-gradient(to right, #00E5CC, #A78BFA, transparent)",
      margin: "0 auto 0",
      boxShadow: "0 0 12px rgba(0,229,204,0.4)",
    }} aria-hidden="true" />
  )
}

/* ── Main AccordionSection wrapper ──────────────────────────── */
export default function AccordionSection({
  id,
  sectionHeader,   // JSX: the badge + h2 + subtitle block
  children,        // full content revealed on expand
  background = "#0A0F1E",
  innerBackground,
  paddingTop = "100px",
  paddingBottom = "80px",
  extraStyle = {},
}) {
  const [isOpen, setIsOpen] = useState(false)
  const reduced = useReducedMotion()
  const sectionRef = useRef(null)

  const toggle = useCallback(() => {
    setIsOpen(v => !v)
  }, [])

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-label={id}
      style={{
        background,
        paddingTop,
        paddingBottom: isOpen ? paddingBottom : "60px",
        position: "relative",
        overflow: "hidden",
        transition: "padding-bottom 0.4s ease",
        ...extraStyle,
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 1,
      }}>

        {/* ── Section header (always visible) ────────────────── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {sectionHeader}
        </motion.div>

        {/* ── Divider ─────────────────────────────────────────── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: "28px" }}
        >
          <Divider />
        </motion.div>

        {/* ── Toggle button ───────────────────────────────────── */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: isOpen ? "40px" : "0" }}
        >
          <ViewButton isOpen={isOpen} onClick={toggle} />
        </motion.div>

        {/* ── Expandable content ──────────────────────────────── */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="accordion-content"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{
                height:  { duration: 0.5,  ease: [0.25, 0.46, 0.45, 0.94] },
                opacity: { duration: 0.38, ease: "easeOut" },
                y:       { duration: 0.38, ease: "easeOut" },
              }}
              style={{ overflow: "hidden" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
