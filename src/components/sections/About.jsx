import { motion } from "framer-motion"
import { GraduationCap, Target, Lightbulb } from "lucide-react"
import Section from "../layout/Section"
import SectionHeading from "../common/SectionHeading"
import { about } from "../../data/about"

const PILLARS = [
  {
    icon: GraduationCap,
    title: "Education",
    color: "#00E5CC",
    text: "BS Computer Science (2022–2026), University of Education Lahore. Focused on AI, ML, algorithms, and software engineering.",
  },
  {
    icon: Lightbulb,
    title: "Projects",
    color: "#7C6FEA",
    text: "Built Emotion-Aware Voice Processing, a Movie Recommendation System, Vizo AI Chatbot, Iris Flower Classification (KNN), and a Tech Stack Recommender — end-to-end AI and Machine Learning applications.",
  },
  {
    icon: Target,
    title: "Goals",
    color: "#10B981",
    text: "Seeking an ML internship or junior role to contribute to real AI products alongside experienced engineers.",
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

export default function About() {
  return (
    <Section id="about" style={{ background: "#0A0F1E" }}>
      <SectionHeading label="Who I Am" title="About Me" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem" }}
        className="about-grid">
        <style>{`@media(min-width:1024px){ .about-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>

        {/* ── Left — bio + education ─────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {about.bio.map((para, i) => (
            <motion.p
              key={i}
              {...fadeUp(i * 0.08)}
              style={{ color: "#A8B2C8", fontSize: "0.95rem", lineHeight: 1.75 }}
            >
              {para}
            </motion.p>
          ))}

          {/* Education card */}
          <motion.div
            {...fadeUp(0.28)}
            style={{
              marginTop: "0.5rem", padding: "1.25rem 1.5rem",
              borderRadius: "16px", display: "flex", alignItems: "flex-start", gap: "1rem",
              background: "rgba(0,229,255,0.05)",
              border: "1px solid rgba(0,229,255,0.18)",
            }}
          >
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(0,229,255,0.1)", flexShrink: 0 }}>
              <GraduationCap size={20} style={{ color: "#00E5CC" }} aria-hidden="true" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#EEF0F8" }}>
                {about.education[0].degree}
              </p>
              <p style={{ fontSize: "0.82rem", color: "#A8B2C8", marginTop: "3px" }}>
                {about.education[0].institution} &middot; {about.education[0].period}
              </p>
              <p style={{ fontSize: "0.78rem", color: "#5A6680", marginTop: "5px" }}>
                {about.education[0].focus}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Right — pillar cards + stats ──────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Pillar cards */}
          {PILLARS.map(({ icon: Icon, title, color, text }, i) => (
            <motion.div
              key={title}
              {...fadeUp(i * 0.09)}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              style={{
                padding: "1.25rem 1.5rem", borderRadius: "16px",
                display: "flex", alignItems: "flex-start", gap: "1rem",
                background: "#111827", border: "1px solid rgba(255,255,255,0.08)",
                transition: "border-color 0.25s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${color}35`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div style={{ padding: "0.45rem", borderRadius: "9px", background: `${color}12`, flexShrink: 0 }}>
                <Icon size={18} style={{ color }} aria-hidden="true" />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "#EEF0F8", marginBottom: "4px" }}>{title}</p>
                <p style={{ fontSize: "0.82rem", color: "#A8B2C8", lineHeight: 1.6 }}>{text}</p>
              </div>
            </motion.div>
          ))}

          {/* Stats grid */}
          <motion.div
            {...fadeUp(0.32)}
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem", marginTop: "0.5rem" }}
          >
            {about.stats.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  padding: "1.1rem", borderRadius: "14px", textAlign: "center",
                  background: "#111827", border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p style={{
                  fontSize: "1.6rem", fontWeight: 900,
                  background: "linear-gradient(135deg, #00E5CC, #7C6FEA)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  /* force value to show — gradient text needs content */
                  minHeight: "2rem", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {value}
                </p>
                <p style={{ fontSize: "0.7rem", color: "#5A6680", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
