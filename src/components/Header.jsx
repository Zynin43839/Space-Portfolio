import { Rocket } from "lucide-react";
import { FancyRouterLink } from "./FancyLink";

export default function Header() {
  return (
    <nav className="sticky top-0 z-20 backdrop-blur bg-[rgba(7,11,26,0.65)] border-b border-white/10">
      <div className="container-narrow h-14 flex items-center justify-between">
        <a
          href="#top"
          className="font-semibold tracking-tight flex items-center gap-2"
        >
          <Rocket size={18} className="opacity-80" />
          Dao • Spacefolio
        </a>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#skills" className="hover:underline">
            Skills
          </a>
          <a href="#projects" className="hover:underline">
            Projects
          </a>
          <a href="#experience" className="hover:underline">
            Experience
          </a>
          <a href="#education" className="hover:underline">
            Education
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </div>
        <FancyRouterLink to="/terminal" className="btn hidden md:inline-flex">
          Warp into Terminal
        </FancyRouterLink>
      </div>
    </nav>
  );
}
