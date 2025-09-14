export const profile = {
  name: "Oranut Suphatamat",
  nickname: "Dao",
  title: "Junior Full-Stack/Backend Developer",
  location: "Bangkok, Thailand",
  photo: "dao.png",
  greetingContainer:
    "Hi, I’m Dao a Junior Software Developer with a unique journey transitioning from biotechnology to tech. I’m passionate about building reliable web application and recently graduated from the Generation Thailand Junior Software Developer program. With a mix of research-driven problem solving and project coordination experience, I love collaborating in fast-moving teams and making complex technical trade-offs clear for everyone.",
  about:
    "I work mainly with Node.js/Express, REST APIs, MongoDB/SQL, React, and Git, always focusing on writing clean and maintainable code. Some of my key projects include HugPaw, an e-commerce platform where I designed the users data schema and implemented navigation, login, and register features, and a A real-time board-game web app using Socket.io with stable data flows. So far, I’ve completed Phase 1: implementing component logic and stateful interactions. Currently, I’m working on the first game logic feature: a non-repeating deck shuffle with deck-empty notification (in progress). Right now, I’m up skilling in Golang, Next.js/NestJS, and AWS to strengthen my ability to deliver production-grade systems. My future goal is to grow into a Backend/Full-Stack Developer role where I can contribute to scalable products while continuously learning and exploring new technologies.",
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
      "An online storefront for customizable pet collars, feeders, and water dispensers with a polished, responsive UI and core admin tooling.",
    tech: [
      "React",
      "Node.js/Express",
      "MongoDB",
      "Tailwind",
      "Github",
      "ShardCn",
    ],
    highlights: [
      "Session-secure auth (login/logout) using JWT with HTTP-only cookies; credentials hashed via bcrypt",
      "Route guarding with auth middleware spanning userPage, and cart",
      "Role-based permissions (admin vs. user) with consistent API error handling throughout",
    ],
    links: {
      demo: "https://hug-paw-ecommerce.vercel.app/",
      repo: "https://github.com/Izenberk/HugPaw-Ecommerce-Frontend",
    },
  },
  // {
  //   name: "RAG-Diary — Personal Diary App",
  //   period: "Aug 2025",
  //   description:
  //     "A privacy-first journaling app for structured entries and fast search, presented in a clean, distraction-free interface.",
  //   tech: ["React", "Node.js/Express", "MongoDB", "Tailwind", "ShardCn"],
  //   highlights: [
  //     "JWT login/logout with HTTP-only cookies and bcrypt-hashed passwords",
  //     "Account-scoped, role-aware authorization with protected routes",
  //     "Diary CRUD: tagging, pinning, and quick keyword search",
  //     "Responsive UI tuned for both mobile and desktop",
  //   ],
  //   links: {
  //     demo: "ragdiary-9l5k6z95g-jsds-projects-f62cc082.vercel.app",
  //     repo: "https://github.com/jsd-genkx/react-ai-notes-app-Front-end-Zynin43839",
  //   },
  // },

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
      "Supported communication between team and project stakeholders.",
    ],
  },
  {
    role: "Research Assistant & Writer (Fastwork)",
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
    degree: "Master of Science (M.Sc.) in Biotechnology",
    school: "Khon Kaen University, Thailand",
    extras: [
      "GPA: 3.30",
      "Graduated: July 2022",
      "Faculty: Biotechnology",
      "Thesis: Biochemical Methane Potential of Sugarcane Leaves and the Specific Methanogenic Activity of Unacclimatized and Acclimatized Anaerobic Mixed Cultures in Cow Dung and Rumen Fluid ",
    ],
  },
  {
    degree: "Bachelor of Science (B.Sc.) in Biotechnology",
    school: "Khon Kaen University, Thailand",
    extras: [
      "GPA: 3.25",
      "Graduated: June 2020",
      "Faculty: Biotechnology",
      "Project: Compared of ELISA technique and selective medium technique for detecting bacterial fruit bloth caused by Acidovorax citrulli. ",
    ],
  },
];

export const certification = [
  {
    degree: "Junior Software Developer Bootcamp",
    school: "Generation Thailand",
    extras: [
      "Completed: Sep 2025",
      "Focus: Full-stack web development with Node.js, React, and MongoDB",
      "Practical experience: Agile teamwork, building APIs, version control (Git/GitHub)",
    ],
  },
  {
    degree: "MongoDB – From Relational Model (SQL) to Document Model",
    school: "MongoDB University",
    extras: [
      "Completed: 2025",
      "Focus: Transitioning from relational schemas to MongoDB’s flexible schema design",
      "Hands-on: Data modeling, and query optimization",
    ],
  },
  {
    degree: "TOEIC (Listening & Reading)",
    school: "ETS",
    extras: ["Score: 570 / 990", "Assessed: Intermediate English proficiency"],
  },
];
