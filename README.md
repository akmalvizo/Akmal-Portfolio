# Muhammad Akmal — ML Engineer Portfolio

> A production-ready, dark-themed portfolio website built for a Junior Machine Learning Engineer.  
> Live at: **[your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)**

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Icons | Lucide React + React Icons |
| Type animation | react-type-animation |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── assets/          ← Images (photo, logo)
├── components/
│   ├── common/      ← Button, Badge, SectionHeading
│   ├── layout/      ← Navbar, Footer, Section
│   └── sections/    ← Hero, About, Skills, Projects,
│                       MLWorkflow, Experience, Certifications, Contact
├── data/            ← All content lives here (edit these files)
│   ├── about.js     ← Name, tagline, bio, stats
│   ├── projects.js  ← Project cards
│   ├── skills.js    ← Skill categories
│   ├── experience.js
│   ├── certifications.js
│   └── workflow.js  ← ML pipeline steps
├── hooks/           ← useActiveSection, useScrollAnimation
└── index.css        ← Global styles + design tokens
public/
├── resume/
│   └── resume.pdf   ← Your resume (linked from Download button)
└── images/          ← Project screenshots
```

---

## ⚡ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/akmalvizo/ml-portfolio.git
cd ml-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build
```

---

## ✏️ How to Update Content

All personal content is in `src/data/` — **no component code needs to change**.

| File | What to edit |
|---|---|
| `src/data/about.js` | Name, tagline, bio, stats, education |
| `src/data/projects.js` | Add / update projects |
| `src/data/skills.js` | Add / update skills |
| `src/data/experience.js` | Work & education timeline |
| `src/data/certifications.js` | Certificates |
| `src/data/workflow.js` | ML pipeline steps |

---

## 🖼️ Replacing Assets

| Asset | Path |
|---|---|
| Profile photo | `src/assets/akmal.jpg` |
| AK logo | `src/assets/ak-logo.png` |
| Resume PDF | `public/resume/resume.pdf` |
| Favicon | `public/favicon.svg` |

---

## 🌐 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 📄 License

MIT — free to use and customise.
