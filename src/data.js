export const profile = {
  name: "Oranut Suphatamat",
  nickname: "Dao",
  title: "Junior Full-Stack Developer",
  location: "Bangkok, Thailand",
  photo: "dao.png",
  summaryTh:
    "Technically, I work with Node.js/Express, REST APIs, MongoDB/SQL, React, and Git with a focus on clean, maintainable code. Relevant projects include HugPaw (e-commerce), where I designed the data schema and implemented the navigation bar and login page, including a register page with design API of front-end and back-end, as well as a real-time board-game web app using Socket.io with stable data flows. I am currently up skilling in Golang, Next.js/NestJS and AWS to support production-grade systems more effectively.",
  summaryEn:
    "Hi, I’m interested in a Backend/Full-Stack Developer role, transitioning from biotechnology to software development, and recently completed the Generation Thailand Junior Software Developer program. I bring research-driven systems thinking and coordination experience, helping me collaborate across functions and communicate technical trade-offs clearly in fast-moving teams.",
  contacts: {
    email: "Oranut_s@kkumail.com",
    github: "https://github.com/Zynin43839",
    linkedin: "https://www.linkedin.com/in/oranut-suphantamat-02225635b/",
  },
};

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "SQL (ฺBasic)", "HTML & CSS"],
  },
  {
    group: "Frameworks & Runtime",
    items: ["Node.js", "React", "Express", "Vite", "Tailwind CSS"],
  },
  { group: "Databases", items: ["MongoDB (Mongoose)", "PostgreSQL (basic)"] },
  { group: "Tools", items: ["Git & GitHub", "Postman", "Figma"] },
  {
    group: "Concepts",
    items: [
      "REST API Design",
      "Authentication (JWT & Cookies)",
      "CRUD Operations",
      "Validation & Error Handling",
    ],
  },
];

export const projects = [
  {
    name: "HugPaw — Pet Supply E-commerce (Group project in Generations Bootcamp)",
    period: "Aug 2025",
    description:
      "An online storefront for customizable pet gear—collars, feeders, and water dispensers—with a polished, responsive UI and core admin tooling.",
    tech: ["React", "Node.js/Express", "MongoDB", "Tailwind", "Github"],
    highlights: [
      "Session-secure auth (login/logout) using JWT with HTTP-only cookies; credentials hashed via bcrypt",
      "Route guarding with shared auth middleware spanning account, cart, and checkout pipelines",
      "Role-based permissions (admin vs. user) with consistent API error handling throughout",
    ],
    links: {
      demo: "https://hug-paw-ecommerce.vercel.app/",
      repo: "https://github.com/Izenberk/HugPaw-Ecommerce-Frontend",
    },
  },
  {
    name: "RAG-Diary — Personal Diary App",
    period: "Aug 2025",
    description:
      "A privacy-first journaling app for structured entries and fast search, presented in a clean, distraction-free interface.",
    tech: ["React", "Node.js/Express", "MongoDB", "Tailwind"],
    highlights: [
      "JWT login/logout with HTTP-only cookies and bcrypt-hashed passwords",
      "Account-scoped, role-aware authorization with protected routes",
      "Diary CRUD: tagging, pinning, and quick keyword search",
      "Responsive UI tuned for both mobile and desktop",
    ],
    links: {
      demo: "ragdiary-9l5k6z95g-jsds-projects-f62cc082.vercel.app",
      repo: "https://github.com/jsd-genkx/react-ai-notes-app-Front-end-Zynin43839",
    },
  },

  {
    name: "Treats & Whiskers — Low–Mid Weight Board Game inspired by Park (Board Game)",
    period: "Aug 2025 (In development — Phase 1)",
    description:
      "A cat-themed, low-to-mid weight strategy board game. The web prototype is currently focused on Phase 1: building interactive, stateful components.",
    tech: ["React", "Vite", "Tailwind"],
    highlights: [
      "Phase 1 Implement component logic and stateful interactions: non-repeating deck shuffle and deck-empty notification (in progress)",
      "Phase 2 Compose components and run the end-to-end game flow (planned)",
      "Phase 3 Optimize UX, UI, and overall web performance (planned)",
    ],
    links: {
      demo: "https://treatsandwhisker.vercel.app/",
      repo: "https://github.com/Zynin43839/treats.and.whisker",
    },
  },
];

export const experience = [
  {
    role: "Project Coordinator (Freelance)",
    org: "Bangkok",
    period: "Jun 2024 – Apr 2025",
    bullets: [
      "Coordinated cross-functional teams to prepare learning and technical documents.",
      "Designed and reviewed training worksheets and internal reports.",
      "Maintained version control and documentation workflows.",
      "Supported communication between educators and project stakeholders.",
    ],
  },
  {
    role: "Research Assistant & Writer (Freelance)",
    org: "Remote",
    period: "Jun 2023 – Jun 2025",
    bullets: [
      "Conducted research and drafted academic articles in science and social fields.",
      "Edited and formatted documents for publication and academic use.",
    ],
  },
];

export const education = [
  {
    degree: "Master of Science in Biotechnology (GPA 3.30)",
    school: "Khon Kaen University, Thailand",
    extras: ["Graduated: July 2022"],
  },
  {
    degree: "Bachelor of Science in Biotechnology (GPA 3.25)",
    school: "Khon Kaen University, Thailand",
    extras: ["Graduated: June 2020"],
  },
];

export const certification = [
  {
    degree: "Junior Software Developer Boostcamp",
    school: "Generation Thailand",
    extras: [
      "Completed: 2025",
      "Focus: Web development, APIs, version control, teamwork",
    ],
  },
  {
    degree: "MongoDB – From Relational Model (SQL) to MongoDB's Document Model",
    school: "Certification",
    extras: [],
  },
];
