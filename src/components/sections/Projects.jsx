import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { projects } from "../../data/projects"
import { personalInfo } from "../../data/about"
import AccordionSection from "../common/AccordionSection"

/* ── Stagger variants ────────────────────────────────────────── */
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
}
const cardV = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25,0.46,0.45,0.94] } },
}

/* ── Tech chip ───────────────────────────────────────────────── */
function Chip({ label, accent, hovered }) {
  return (
    <span style={{
      padding: "3px 11px", borderRadius: "999px",
      fontSize: "11px", fontWeight: 500, whiteSpace: "nowrap",
      background: hovered ? `${accent}18` : `${accent}0C`,
      border: `1px solid ${hovered ? accent+"40" : accent+"25"}`,
      color: hovered ? accent : `${accent}BB`,
      transition: "all 0.25s ease",
    }}>
      {label}
    </span>
  )
}

/* ── P1: Audio waveform + emotion nodes ─────────────────────── */
function WaveformVisual({ hovered, reduced }) {
  const bars = [4,7,12,9,14,8,11,6,13,10,7,15,9,12,6,10,8,13,7,11]
  return (
    <div style={{ width:"100%", height:"100%", position:"relative",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background:"linear-gradient(135deg,rgba(0,229,204,0.06),rgba(2,132,199,0.08))",
                  overflow:"hidden" }}>
      <div style={{ position:"absolute", width:120, height:120, borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(0,229,204,0.18),transparent 70%)",
                    top:"10%", left:"20%", filter:"blur(18px)" }} aria-hidden="true"/>
      <div style={{ display:"flex", alignItems:"center", gap:3, zIndex:1 }}>
        {bars.map((h,i) => (
          <motion.div key={i}
            style={{ width:4, borderRadius:2,
                     background:`rgba(0,229,204,${0.3+i%3*0.2})`,
                     boxShadow: hovered ? "0 0 6px rgba(0,229,204,0.6)" : "none" }}
            animate={!reduced ? { height:[h*3, h*3*1.6, h*3] } : { height: h*3 }}
            transition={{ duration:0.9+i*0.04, repeat:Infinity, ease:"easeInOut", delay: i*0.06 }}
          />
        ))}
      </div>
      {["😊","😢","😠","😐"].map((e,i) => (
        <motion.span key={e}
          style={{ position:"absolute", fontSize:16, userSelect:"none",
                   top: `${18+i*18}%`, right:`${8+i%2*8}%`,
                   opacity: hovered ? 0.85 : 0.35 }}
          animate={!reduced ? { y:[0,-4,0] } : {}}
          transition={{ duration:2+i*0.4, repeat:Infinity, ease:"easeInOut", delay:i*0.3 }}
        >{e}</motion.span>
      ))}
      <span style={{ position:"absolute", bottom:10, left:12,
                     fontSize:10, fontWeight:700, letterSpacing:"0.1em",
                     textTransform:"uppercase", color:"rgba(0,229,204,0.6)" }}>
        MFCC · Real-Time
      </span>
    </div>
  )
}

/* ── P2: Floating movie cards + connection graph ─────────────── */
function RecommendationVisual({ hovered, reduced }) {
  const cards = [
    {t:"Action",x:"12%",y:"15%",r:-8},
    {t:"Sci-Fi", x:"58%",y:"10%",r:6},
    {t:"Drama",  x:"5%", y:"55%",r:4},
    {t:"Comedy", x:"62%",y:"55%",r:-5},
  ]
  return (
    <div style={{ width:"100%",height:"100%",position:"relative",
                  background:"linear-gradient(135deg,rgba(167,139,250,0.06),rgba(124,58,237,0.08))",
                  overflow:"hidden" }}>
      <div style={{ position:"absolute", width:110, height:110, borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(167,139,250,0.18),transparent 70%)",
                    top:"50%",left:"50%", transform:"translate(-50%,-50%)", filter:"blur(16px)" }} aria-hidden="true"/>
      <div style={{ position:"absolute", top:"50%", left:"50%",
                    transform:"translate(-50%,-50%)", width:40, height:40,
                    borderRadius:"50%", zIndex:2,
                    background:"linear-gradient(135deg,rgba(167,139,250,0.3),rgba(124,58,237,0.2))",
                    border:"1.5px solid rgba(167,139,250,0.5)",
                    boxShadow: hovered ? "0 0 20px rgba(167,139,250,0.5)":"0 0 10px rgba(167,139,250,0.2)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:16, transition:"box-shadow 0.3s" }}>
        🎬
      </div>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:1 }}
        aria-hidden="true">
        {cards.map((c,i) => (
          <line key={i} x1="50%" y1="50%" x2={c.x} y2={c.y}
            stroke={`rgba(167,139,250,${hovered?0.35:0.15})`}
            strokeWidth="1.5" strokeDasharray="4 3" />
        ))}
      </svg>
      {cards.map((c,i)=>(
        <motion.div key={c.t}
          style={{ position:"absolute", left:c.x, top:c.y,
                   transform:`rotate(${c.r}deg)`,
                   padding:"4px 10px", borderRadius:6,
                   background:"rgba(167,139,250,0.12)",
                   border:"1px solid rgba(167,139,250,0.3)",
                   fontSize:11, fontWeight:600, color:"#A78BFA", zIndex:3 }}
          animate={!reduced ? { y:[0,-5,0] } : {}}
          transition={{ duration:2.2+i*0.3, repeat:Infinity, ease:"easeInOut", delay:i*0.2 }}
        >{c.t}</motion.div>
      ))}
      <span style={{ position:"absolute",bottom:10,left:12,
                     fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                     textTransform:"uppercase",color:"rgba(167,139,250,0.6)" }}>
        CF + CBF · Hybrid
      </span>
    </div>
  )
}

/* ── P3: Chat bubble interface ───────────────────────────────── */
function ChatVisual({ hovered, reduced }) {
  const msgs = [
    { text:"Hello! How can I help?", bot:true  },
    { text:"Tell me about ML.",       bot:false },
    { text:"ML learns from data...",  bot:true  },
    { text:"That's amazing! 🚀",      bot:false },
  ]
  return (
    <div style={{ width:"100%",height:"100%",position:"relative",
                  background:"linear-gradient(135deg,rgba(56,189,248,0.06),rgba(59,130,246,0.08))",
                  overflow:"hidden", padding:"14px 16px",
                  display:"flex", flexDirection:"column", gap:7, justifyContent:"center" }}>
      <div style={{ position:"absolute",width:100,height:100,borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(56,189,248,0.15),transparent 70%)",
                    bottom:"-10%",right:"-5%",filter:"blur(14px)" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:10,right:14,
                    width:28,height:28,borderRadius:"50%",
                    background:"linear-gradient(135deg,#38BDF8,#3B82F6)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:14, boxShadow: hovered?"0 0 12px rgba(56,189,248,0.5)":"none",
                    transition:"box-shadow 0.3s" }}>🤖</div>
      {msgs.map((m,i)=>(
        <motion.div key={i}
          initial={reduced ? {} : { opacity:0, x: m.bot?-12:12 }}
          whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }}
          transition={{ delay:0.1+i*0.12, duration:0.4 }}
          style={{
            alignSelf: m.bot?"flex-start":"flex-end",
            maxWidth:"78%", padding:"6px 11px", borderRadius: m.bot?"4px 12px 12px 12px":"12px 4px 12px 12px",
            background: m.bot ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.07)",
            border: `1px solid ${m.bot?"rgba(56,189,248,0.28)":"rgba(255,255,255,0.1)"}`,
            fontSize:11, color: m.bot?"#38BDF8":"#CBD5E0", fontWeight:500, lineHeight:1.4,
          }}>
          {m.text}
        </motion.div>
      ))}
      <span style={{ position:"absolute",bottom:10,left:12,
                     fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                     textTransform:"uppercase",color:"rgba(56,189,248,0.6)" }}>
        Rule-Based · Context-Aware
      </span>
    </div>
  )
}

/* ── P4: Tech node graph ─────────────────────────────────────── */
function TechGraphVisual({ hovered, reduced }) {
  const nodes = [
    { label:"React",  x:"15%", y:"20%", c:"#61DAFB" },
    { label:"Python", x:"65%", y:"15%", c:"#FFD43B" },
    { label:"FastAPI",x:"75%", y:"60%", c:"#34D399" },
    { label:"TF",     x:"10%", y:"65%", c:"#FF6F00" },
    { label:"SQL",    x:"45%", y:"72%", c:"#38BDF8" },
  ]
  return (
    <div style={{ width:"100%",height:"100%",position:"relative",
                  background:"linear-gradient(135deg,rgba(52,211,153,0.06),rgba(5,150,105,0.08))",
                  overflow:"hidden" }}>
      <div style={{ position:"absolute",width:90,height:90,borderRadius:"50%",
                    background:"radial-gradient(circle,rgba(52,211,153,0.18),transparent 70%)",
                    top:"30%",left:"35%",filter:"blur(14px)" }} aria-hidden="true"/>
      <div style={{ position:"absolute",top:"50%",left:"50%",
                    transform:"translate(-50%,-50%)",
                    width:44,height:44,borderRadius:"50%",zIndex:2,
                    background:"linear-gradient(135deg,rgba(52,211,153,0.25),rgba(5,150,105,0.15))",
                    border:"1.5px solid rgba(52,211,153,0.5)",
                    boxShadow: hovered?"0 0 20px rgba(52,211,153,0.45)":"0 0 8px rgba(52,211,153,0.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:18, transition:"box-shadow 0.3s" }}>⚙️</div>
      <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1 }}
        aria-hidden="true">
        {nodes.map((n,i)=>(
          <line key={i} x1="50%" y1="50%" x2={n.x} y2={n.y}
            stroke={`rgba(52,211,153,${hovered?0.35:0.15})`}
            strokeWidth="1.2" strokeDasharray="3 3"/>
        ))}
      </svg>
      {nodes.map((n,i)=>(
        <motion.div key={n.label}
          style={{ position:"absolute",left:n.x,top:n.y,
                   transform:"translate(-50%,-50%)",
                   padding:"3px 9px",borderRadius:6,zIndex:3,
                   background:`${n.c}14`,
                   border:`1px solid ${n.c}35`,
                   fontSize:10,fontWeight:700,color:n.c }}
          animate={!reduced ? { scale:[1,1.08,1] } : {}}
          transition={{ duration:2.5+i*0.3,repeat:Infinity,ease:"easeInOut",delay:i*0.25 }}
        >{n.label}</motion.div>
      ))}
      <span style={{ position:"absolute",bottom:10,left:12,
                     fontSize:10,fontWeight:700,letterSpacing:"0.1em",
                     textTransform:"uppercase",color:"rgba(52,211,153,0.6)" }}>
        TF-IDF · Cosine Similarity
      </span>
    </div>
  )
}

const VISUALS = {
  1: WaveformVisual,
  2: RecommendationVisual,
  3: ChatVisual,
  4: TechGraphVisual,
}

/* ── Project Card ────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()
  const Visual  = VISUALS[project.id] || WaveformVisual
  const { accent } = project

  return (
    <motion.article
      variants={cardV}
      whileHover={reduced ? {} : { y: -6, transition: { duration: 0.2, ease:"easeOut" } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={()   => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(145deg,rgba(18,24,42,0.97),rgba(10,14,28,0.93))",
        backdropFilter: "blur(16px)",
        border: "1px solid",
        borderColor: hovered ? `${accent}50` : "rgba(255,255,255,0.07)",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${accent}25, 0 0 50px ${accent}15`
          : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{ height: "180px", flexShrink: 0, position: "relative" }}>
        <Visual hovered={hovered} reduced={!!reduced} />
        <div style={{ position:"absolute", top:12, left:14, zIndex:10 }}>
          <span style={{
            fontSize:"10px", fontWeight:800, letterSpacing:"0.1em",
            color: accent,
            background: "rgba(10,14,28,0.75)",
            border: `1px solid ${accent}30`,
            padding: "2px 9px", borderRadius:"999px",
            backdropFilter: "blur(6px)",
          }}>
            PROJECT {String(project.id).padStart(2,"0")}
          </span>
        </div>
        <div style={{
          position:"absolute", top:0, left:"10%", right:"10%",
          height:"2px", borderRadius:"0 0 2px 2px",
          background: `linear-gradient(to right, ${accent}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }} aria-hidden="true" />
      </div>

      <div style={{
        padding: "20px 22px 22px",
        display: "flex", flexDirection: "column", gap: "12px", flex: 1,
      }}>
        <p style={{
          fontSize:"10px", fontWeight:700, letterSpacing:"0.1em",
          textTransform:"uppercase", color: accent, opacity:0.85,
        }}>
          {project.category}
        </p>

        <h3 style={{
          fontSize:"15px", fontWeight:700, color:"#EEF0F8",
          lineHeight:1.25, letterSpacing:"-0.01em",
        }}>
          {project.title}
        </h3>

        <p style={{ fontSize:"13px", color:"#718096", lineHeight:1.65, flex:1 }}>
          {project.description}
        </p>

        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
          {project.tech.map(t => (
            <Chip key={t} label={t} accent={accent} hovered={hovered} />
          ))}
        </div>

        <div style={{
          height:"1px",
          background:`linear-gradient(to right,${accent}25,transparent)`,
        }} aria-hidden="true" />

        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            style={{
              display:"inline-flex", alignItems:"center", gap:"6px",
              padding:"7px 16px", borderRadius:"8px",
              fontSize:"12px", fontWeight:600,
              background: hovered ? `${accent}20` : `${accent}0E`,
              border:`1px solid ${accent}30`,
              color: accent, textDecoration:"none",
              transition:"all 0.22s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${accent}28`
              e.currentTarget.style.boxShadow  = `0 0 14px ${accent}30`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = hovered ? `${accent}20` : `${accent}0E`
              e.currentTarget.style.boxShadow  = "none"
            }}
          >
            <FaGithub size={13} aria-hidden="true" />
            GitHub
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              style={{
                display:"inline-flex", alignItems:"center", gap:"5px",
                padding:"7px 14px", borderRadius:"8px",
                fontSize:"12px", fontWeight:600,
                background:"transparent",
                border:"1px solid rgba(255,255,255,0.1)",
                color:"#A0AEC0", textDecoration:"none",
                transition:"all 0.22s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#FFFFFF"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#A0AEC0"
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"
              }}
            >
              <ExternalLink size={12} aria-hidden="true" />
              Live Demo
            </a>
          )}

          <motion.div
            style={{ marginLeft:"auto" }}
            animate={hovered && !reduced ? { x:[0,4,0] } : {}}
            transition={{ duration:0.6, repeat:Infinity }}
          >
            <ArrowUpRight size={16}
              style={{ color: hovered ? accent : "#4A5568", transition:"color 0.25s" }}
              aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Section header ─────────────────────────────────────────── */
function ProjectsHeader() {
  return (
    <div style={{ textAlign:"center", marginBottom: "32px" }}>
      <div style={{ display:"flex", justifyContent:"center", marginBottom:"20px" }}>
        <span style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          padding:"6px 18px", borderRadius:"999px",
          fontSize:"11px", fontWeight:700,
          letterSpacing:"0.14em", textTransform:"uppercase",
          background:"linear-gradient(135deg,rgba(0,229,204,0.12),rgba(167,139,250,0.12))",
          border:"1px solid rgba(0,229,204,0.22)", color:"#00E5CC",
        }}>
          <span style={{
            width:"6px", height:"6px", borderRadius:"50%",
            background:"linear-gradient(135deg,#00E5CC,#A78BFA)",
            display:"inline-block", boxShadow:"0 0 6px rgba(0,229,204,0.6)",
          }} aria-hidden="true" />
          Portfolio Highlights
        </span>
      </div>

      <h2 style={{
        fontSize:"clamp(2.2rem,5vw,3.2rem)", fontWeight:800,
        letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"18px",
        background:"linear-gradient(135deg,#FFFFFF 20%,#94A3B8 100%)",
        WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        backgroundClip:"text",
      }}>
        Featured Projects
      </h2>

      <p style={{
        fontSize:"15px", color:"#718096",
        maxWidth:"500px", margin:"0 auto", lineHeight:1.7,
      }}>
        A collection of AI and Machine Learning solutions built from research to deployment.
      </p>
    </div>
  )
}

/* ── Main section ────────────────────────────────────────────── */
export default function Projects() {
  const reduced = useReducedMotion()

  return (
    <AccordionSection
      id="projects"
      background="#0A0F1E"
      sectionHeader={<ProjectsHeader />}
      extraStyle={{ overflow: "hidden" }}
    >
      {/* Background decorations */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(rgba(0,229,204,0.028) 1px,transparent 1px)",
        backgroundSize:"40px 40px",
      }} aria-hidden="true" />
      <div style={{
        position:"absolute", top:"-8%", right:"8%",
        width:"38%", height:"44%", borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(ellipse,rgba(0,229,204,0.04) 0%,transparent 70%)",
      }} aria-hidden="true" />
      <div style={{
        position:"absolute", bottom:"-8%", left:"8%",
        width:"34%", height:"40%", borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(ellipse,rgba(167,139,250,0.04) 0%,transparent 70%)",
      }} aria-hidden="true" />

      {/* Cards grid */}
      <motion.div
        variants={reduced ? {} : containerV}
        initial="hidden"
        whileInView="show"
        viewport={{ once:true, amount:0.05 }}
        style={{ display:"grid", gridTemplateColumns:"repeat(1,1fr)", gap:"20px" }}
        className="projects-grid"
      >
        <style>{`
          @media(min-width:640px){
            .projects-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>

        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        initial={reduced ? {} : { opacity:0, y:24 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, amount:0.3 }}
        transition={{ duration:0.52, delay:0.2 }}
        style={{
          marginTop:"56px",
          padding:"44px 32px",
          borderRadius:"24px",
          textAlign:"center",
          background:"linear-gradient(145deg,rgba(18,24,42,0.96),rgba(10,14,28,0.92))",
          backdropFilter:"blur(16px)",
          border:"1px solid rgba(255,255,255,0.07)",
          boxShadow:"0 4px 32px rgba(0,0,0,0.3)",
          position:"relative",
          overflow:"hidden",
        }}
      >
        <div style={{
          position:"absolute", top:"-30%", right:"5%",
          width:"300px", height:"300px", borderRadius:"50%", pointerEvents:"none",
          background:"radial-gradient(circle,rgba(0,229,204,0.04) 0%,transparent 65%)",
        }} aria-hidden="true" />

        <div style={{
          width:"56px", height:"56px", borderRadius:"50%",
          background:"rgba(255,255,255,0.05)",
          border:"1px solid rgba(255,255,255,0.1)",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 20px",
        }}>
          <FaGithub size={26} style={{ color:"#A0AEC0" }} aria-hidden="true" />
        </div>

        <h3 style={{
          fontSize:"22px", fontWeight:800,
          letterSpacing:"-0.02em", marginBottom:"12px",
          background:"linear-gradient(135deg,#FFFFFF 30%,#94A3B8 100%)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          backgroundClip:"text",
        }}>
          Want to See More?
        </h3>

        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"13px 32px", borderRadius:"12px",
            background:"linear-gradient(135deg,#00E5CC 0%,#A78BFA 100%)",
            color:"#040E18", fontWeight:700, fontSize:"14px",
            textDecoration:"none", letterSpacing:"0.01em",
            boxShadow:"0 0 28px rgba(0,229,204,0.25)",
            transition:"all 0.22s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 0 44px rgba(0,229,204,0.45)"
            e.currentTarget.style.transform = "translateY(-2px)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 0 28px rgba(0,229,204,0.25)"
            e.currentTarget.style.transform = "translateY(0)"
          }}
        >
          <FaGithub size={16} aria-hidden="true" />
          Explore All Projects
        </a>
      </motion.div>
    </AccordionSection>
  )
}
