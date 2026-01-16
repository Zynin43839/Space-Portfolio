# 🚀🚀 Spacefolio (Vite + React) 🚀🚀

A space-themed developer portfolio with an interactive Terminal page. Built with Vite + React, Tailwind CSS, Framer Motion, React Router, and lucide-react. Skills badges use icons via SVG.

# ✨ Features

- Cosmic UI — multi-layer starfield, nebula glow, shooting stars.
- Hero with portrait — responsive layout + soft glow ring.
- Skills with icons — badges rendered with SVG, auto-mapping labels → icons.
- Projects — modern cards (hover/tap motion), tech chips, links to Demo/Repo.
- Experience / Education / Certification — tidy, readable sections.
- Interactive Terminal (/terminal)
- Space background + glassy window, traffic-light title bar, Home button.
- Larger monospace text, consistent line spacing, auto-scroll.
- Commands with table output for projects and project <id|slug>.
- Smooth navigation — React Router + in-page anchors.
- Easy data edits — all content comes from data.js.

# 🧰 Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router
- Icons: lucide-react
- Language/Tooling: JavaScript (ESNext)

# 📁 Project Structure

    ⊢ src/
        ⊢ App.jsx
        ⊢ main.jsx
        ⊢ index.css
        ⊢ data.js # <- Edit your profile, skills, projects, etc.
        ⊢ components/
            ⊢ Header.jsx
            ⊢ Section.jsx
            ⊢ Starfield.jsx
            ⊢ FancyLink.jsx
        ⊢ pages/
            ⊢ Home.jsx
            ⊢ Terminal.jsx
        ⊢ public/
            ⊢ image.jpg # <- Your portrait (configure as profile.photo)
            ⊢ favicon-32x32.png

# 🚀 Getting Started

    1. Prerequisites Node.js ≥ 18
    2. Install & Run
        npm i
        npm run dev

    3. build & preview
        npm run build
        npm run preview

# ⚙️ Configuration & Customization

    1. Content (src/data.js)
        - Update your info once and the site updates everywhere:

    2. Portrait
        - Put your image at public/image.jpg (or change profile.photo).

    3. Favicon & Manifest
        - In public/ provide favicon.svg (or PNG sizes), optional site.webmanifest.
        - Add credits in the footer if required by the icon license (see Credits).

    4. Skills icons
        - We map labels → icons automatically. If you prefer local files, drop SVGs into public/icons/ and update the map.

# ⌨️ Terminal Commands

    Command Description
    help Show help
    clear Clear the screen
    pwd Print working directory
    ls [projects] List items (or project list)
    whoami Show user
    date Current date/time
    echo <text> Print text
    projects Table of projects (ID, Name, Period, Demo, Repo)
    project <id|slug> Table details for a single project
    tech Unique tech across projects
    open <demo|repo> <id> Show link (Demo/Repo) for a project

The Terminal UI includes a Home button on the title bar to return to /.

# 🛠️ Tailwind Setup (quick check)

- Your index.css includes Tailwind directives and custom cosmic styles (stars, nebula, shooting stars, terminal styles). Make sure Tailwind is scanning your files:

        tailwind.config.js

- export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
  };

# 🌍 Deploy

- Vercel / Netlify: Import repo → Build command npm run build → Output dist/.

- GitHub Pages:

- If deploying to <user>.github.io/<repo>, set Vite base to /<repo>/ in vite.config.js.

- Build, then publish the dist/ folder (or set up GH Actions).

# 🙏 Credits

- UI icons: lucide-react

- Portfolio icon attribution:
  <a href="https://www.flaticon.com/free-icons/portfolio" title="portfolio icons">Portfolio icons created by Freepik - Flaticon</a>

# 📜 License

- MIT — customize and reuse.

# 💡 Notes

- Want history navigation in Terminal (↑/↓), tab-autocomplete, or clipboard copy? It’s easy to extend—open an issue or implement in pages/Terminal.jsx.

- Replace # in Demo/Repo links inside data.js with your actual URLs.

--------------------------------------Enjoy the ride. 🌌🚀-----------------------------------
