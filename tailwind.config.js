
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "ui-sans-serif", "Arial"] },
      colors: {
        spacebg: "#070B1A",
        nebula: "#0B1028",
        star: "#8AB4F8",
        accent: "#7C4DFF",
        accent2: "#00E5FF",
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 77, 255, .25)",
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(1200px 600px at 10% -10%, rgba(124,77,255,.25), transparent), radial-gradient(1000px 500px at 110% 10%, rgba(0,229,255,.15), transparent)',
      }
    },
  },
  plugins: [],
}
