import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Star } from "lucide-react";
import Header from "../components/Header";
import Section from "../components/Section";
import Starfield from "../components/Starfield";
import { FancyLink } from "../components/FancyLink";

import {
  profile,
  skills,
  projects,
  experience,
  education,
  certification,
} from "../data";

const Hero = () => (
  <header id="top" className="relative overflow-hidden">
    <Starfield />
    <div className="bg-space-gradient">
      <div className="container-narrow py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 md:grid-cols-[1.25fr_0.75fr] items-center"
        >
          {/* Left: text */}
          <div className="grid gap-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
              <Star size={14} className="opacity-60" /> Junior Full-Stack
              Developer
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Oranut Suphatamat (Dao)
            </h1>
            <p className="max-w-2xl text-white/80">{profile.summaryEn}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <FancyLink
                className="btn-outline"
                href={`mailto:${profile.contacts.email}`}
              >
                <Mail size={16} /> Email
              </FancyLink>
              <FancyLink
                className="btn-outline"
                href={profile.contacts.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub
              </FancyLink>
              <FancyLink
                className="btn-outline"
                href={profile.contacts.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> LinkedIn
              </FancyLink>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <MapPin size={16} /> {profile.location}
            </div>
          </div>

          {/* Right: portrait */}
          <motion.div
            className="relative mx-auto w-40 h-40 md:w-64 md:h-64"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* glow behind */}
            <div
              aria-hidden
              className="absolute -inset-4 rounded-full blur-2xl opacity-60"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 20%, rgba(124,77,255,.45), transparent 60%), radial-gradient(70% 70% at 80% 30%, rgba(0,229,255,.25), transparent 60%)",
              }}
            />
            {/* image */}
            <img
              src={profile.photo || "/dao.jpg"}
              alt="Oranut “Dao” Suphatamat"
              className="relative z-[1] w-full h-full object-cover rounded-full border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,.45)]"
              loading="eager"
            />
            {/* subtle ring */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/15 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </header>
);

const About = () => (
  <Section id="about" title="About">
    <div className="card">
      <p className="text-white/85">{profile.summaryTh}</p>
    </div>
  </Section>
);

const iconMap = {
  javascript: `javascript.svg`,
  nodejs: `nodejs.svg`,
  express: `express.svg`,
  react: `react.svg`,
  vite: `vite.svg`,
  tailwindcss: `tailwind-css.svg`,

  mongodb: `mongodb.svg`,
  postgresql: `postgresql.svg`,
  sql: `postgresql.svg`,

  html: `html.svg`,
  css: `css.svg`,

  git: `git.svg`,
  github: `github.svg`,
  postman: `postman.svg`,
  figma: `figma.svg`,
  canva: `canva.svg`,

  swagger: `swagger.svg`,
};

// ===== helper: normalize & resolve multiple icons =====
const normalize = (label) =>
  label.toLowerCase().replace(/[()]/g, "").replace(/\s+/g, " ").trim();

function resolveIcons(label) {
  const l = normalize(label);

  if (l.includes("html") && l.includes("css"))
    return [iconMap.html, iconMap.css];
  if (l.includes("mongodb/mongoose")) return [iconMap.mongodb];
  if (l.includes("rest api")) return [iconMap.swagger];

  // แยกด้วย / , & , , (comma)
  const tokens = l
    .split(/[\/,&]/)
    .map((t) => t.trim())
    .filter(Boolean);

  const picks = [];
  for (const t of tokens.length ? tokens : [l]) {
    if (iconMap[t]) picks.push(iconMap[t]);
  }
  // ฟอลแบ็ก: ลองลบช่องว่างทั้งหมด
  if (!picks.length && iconMap[l.replace(/\s+/g, "")]) {
    picks.push(iconMap[l.replace(/\s+/g, "")]);
  }
  return picks;
}

// ===== small badge component =====
function TechBadge({ label }) {
  const icons = resolveIcons(label);
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-sm">
      {icons.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          title={label}
          loading="lazy"
          draggable="false"
          className="w-5 h-5 object-contain"
        />
      ))}
      {label}
    </span>
  );
}

// ====== drop-in replacement ======
const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid md:grid-cols-2 gap-4">
      {skills.map((s, i) => (
        <div key={i} className="card">
          <h3 className="font-semibold mb-2">{s.group}</h3>
          <div className="flex flex-wrap gap-2">
            {s.items.map((it, j) => (
              <TechBadge key={j} label={it} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const Projects = () => (
  <Section id="projects" title="Projects">
    <div className="grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <motion.article
          key={i}
          className="card"
          whileHover={{
            y: -6,
            scale: 1.01,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,.08), 0 0 42px rgba(124,77,255,.35)",
          }}
          whileTap={{ scale: 0.995 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="text-lg md:text-xl font-semibold">{p.name}</h3>
            <span className="text-xs text-white/60">{p.period}</span>
          </div>
          <p className="text-white/80">{p.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tech.map((t, k) => (
              <span
                key={k}
                className="px-2 py-1 rounded-md bg-white/10 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
          <ul className="list-disc list-inside mt-3 text-white/85 space-y-1">
            {p.highlights.map((h, k) => (
              <li key={k}>{h}</li>
            ))}
          </ul>
          <div className="mt-4 flex gap-3">
            <FancyLink
              className="btn"
              href={p.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Demo
            </FancyLink>
            <FancyLink
              className="btn-outline"
              href={p.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </FancyLink>
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);

const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="grid gap-4">
      {experience.map((e, i) => (
        <div key={i} className="card">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              {e.role} • <span className="opacity-80">{e.org}</span>
            </h3>
            <span className="text-xs text-white/60">{e.period}</span>
          </div>
          <ul className="list-disc list-inside mt-2 space-y-1 text-white/85">
            {e.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

const Education = () => (
  <Section id="education" title="Education">
    {education.map((ed, i) => (
      <div key={i} className="card">
        <h3 className="font-semibold">{ed.degree}</h3>
        <div className="text-white/80">{ed.school}</div>
        <ul className="list-disc list-inside mt-2 text-white/85">
          {ed.extras?.map((x, j) => (
            <li key={j}>{x}</li>
          ))}
        </ul>
      </div>
    ))}
  </Section>
);

const Certification = () => (
  <Section id="certification" title="Certification">
    {certification.map((cer, i) => (
      <div key={i} className="card">
        <h3 className="font-semibold">{cer.degree}</h3>
        <div className="text-white/80">{cer.school}</div>
        {cer.extras?.length ? (
          <ul className="list-disc list-inside mt-2 text-white/85">
            {cer.extras.map((x, j) => (
              <li key={j}>{x}</li>
            ))}
          </ul>
        ) : null}
      </div>
    ))}
  </Section>
);

const Contact = () => (
  <Section id="contact" title="Contact">
    <div className="card">
      <p className="text-white/80 mb-4">
        Please contact me via email or LinkedIn for any inquiries,
        collaborations, or opportunities. I look forward to connecting with you!
      </p>
      <div className="flex flex-wrap gap-3">
        <FancyLink className="btn" href={`mailto:${profile.contacts.email}`}>
          <Mail size={16} /> {profile.contacts.email}
        </FancyLink>
        <FancyLink
          className="btn-outline"
          href={profile.contacts.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} /> GitHub
        </FancyLink>
        <FancyLink
          className="btn-outline"
          href={profile.contacts.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={16} /> LinkedIn
        </FancyLink>
      </div>
    </div>
  </Section>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen relative z-10">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certification />
      <Contact />
      <footer className="container-narrow py-10 text-sm text-white/60">
        © {new Date().getFullYear()} Oranut Suphatamat • Built with Vite + React
        + Tailwind
      </footer>
    </div>
  );
}
