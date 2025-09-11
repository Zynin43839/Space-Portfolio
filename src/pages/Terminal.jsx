import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ===== Starfield: reuse same layers as Home ===== */
function Starfield() {
  const shooters = Array.from({ length: 7 }).map((_, i) => {
    const delay = (Math.random() * 8).toFixed(2) + "s";
    const dur = (2.8 + Math.random() * 2).toFixed(2) + "s";
    const top = (Math.random() * 40 - 10).toFixed(0) + "vh";
    const left = (Math.random() * 30 - 10).toFixed(0) + "vw";
    return (
      <span
        key={i}
        className="shooting-star"
        style={{ "--delay": delay, "--dur": dur, top, left }}
      />
    );
  });
  return (
    <>
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />
      <div className="stars4" />
      {shooters}
    </>
  );
}

const promptLabel = "Oranut_s Portfolio";

/* ===== Data ===== */
const projects = [
  {
    name: "HugPaw — Pet Supply E-commerce (Group project in Generations Bootcamp)",
    period: "Aug 2025",
    description:
      "E-commerce platform for customizable pet accessories (collars, feeders, and water dispensers) with a clean, responsive UI and basic admin capabilities.",
    tech: ["React", "Node.js/Express", "MongoDB", "Tailwind", "Github"],
    highlights: [
      "JWT-based authentication (login/logout) with HTTP-only cookies and bcrypt password hashing",
      "Protected routes and centralized auth middleware across account, cart, and checkout flows",
      "Basic authorization guards (admin vs. user) with consistent error handling",
    ],
    links: { demo: "#", repo: "#" },
  },
  {
    name: "RAG-Diary — Personal Diary App",
    period: "Aug 2025",
    description:
      "A secure personal diary for structured, searchable journaling with a fast, distraction-free UI.",
    tech: ["React", "Node.js/Express", "MongoDB", "Tailwind"],
    highlights: [
      "JWT-based authentication (login/logout) using HTTP-only cookies and bcrypt password hashing",
      "Protected routes and role-aware authorization for account-specific data",
      "Diary entries CRUD with tags, pinning, and keyword search",
      "Responsive layout optimized for mobile and desktop",
    ],
    links: { demo: "#", repo: "#" },
  },
  {
    name: "Treats & Whiskers (Low–Mid Weight Board Game)",
    period: "Aug 2025 (In development — Phase 1)",
    description:
      "A cat-themed, low-to-mid weight strategy board game. The web prototype is currently focused on Phase 1: building interactive, stateful components.",
    tech: ["React", "Vite", "Tailwind"],
    highlights: [
      "Phase 1 Implement component logic and stateful interactions: non-repeating deck shuffle and deck-empty notification (in progress)",
      "Phase 2 Compose components and run the end-to-end game flow (planned)",
      "Phase 3 Optimize UX, UI, and overall web performance (planned)",
    ],
    links: { demo: "#", repo: "#" },
  },
];

/* ===== Helpers: table & formatting ===== */
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const truncate = (str = "", w = 40) =>
  str.length > w ? str.slice(0, w - 1) + "…" : str;

function renderTable(headers, rows) {
  // calc widths
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => String(r[i] ?? "").length))
  );
  // cap some columns a bit for readability
  // [ID, Name, Period, Demo, Repo]
  if (headers.length === 5) {
    widths[0] = Math.min(widths[0], 3); // ID
    widths[1] = Math.min(widths[1], 44); // Name
    widths[2] = Math.min(widths[2], 22); // Period
    widths[3] = Math.min(widths[3], 28); // Demo
    widths[4] = Math.min(widths[4], 28); // Repo
  }

  const sep = "+" + widths.map((w) => "-".repeat(w + 2)).join("+") + "+";

  const fmtRow = (cols) =>
    "| " +
    cols
      .map((c, i) => {
        const txt = truncate(String(c ?? ""), widths[i]);
        return txt.padEnd(widths[i], " ");
      })
      .join(" | ") +
    " |";

  const lines = [sep, fmtRow(headers), sep];
  rows.forEach((r) => lines.push(fmtRow(r)));
  lines.push(sep);
  return lines.join("\n");
}

function projectTable(p, idx) {
  const headers = ["Field", "Value"];
  const rows = [
    ["ID", `#${idx + 1}`],
    ["Name", p.name],
    ["Period", p.period],
    ["Tech", p.tech.join(", ")],
    ["Description", p.description],
    ["Highlights", p.highlights.join("; ")],
    ["Demo", p.links?.demo || "—"],
    ["Repo", p.links?.repo || "—"],
  ];
  // compute widths with a softer cap
  const widths = [
    Math.max(headers[0].length, ...rows.map((r) => r[0].length)),
    Math.max(headers[1].length, ...rows.map((r) => r[1].length)),
  ];
  widths[0] = Math.min(widths[0], 12);
  widths[1] = Math.min(widths[1], 90);

  const sep =
    "+" + "-".repeat(widths[0] + 2) + "+" + "-".repeat(widths[1] + 2) + "+";

  const fmt = (a, b) =>
    `| ${a.padEnd(widths[0], " ")} | ${truncate(b, widths[1]).padEnd(
      widths[1],
      " "
    )} |`;

  const out = [
    sep,
    fmt(headers[0], headers[1]),
    sep,
    ...rows.map(([a, b]) => fmt(a, b)),
    sep,
  ];
  return out.join("\n");
}

/* ===== Pretty color render ===== */
const helpRows = [
  ["help", "Show this help"],
  ["clear", "Clear the screen"],
  ["pwd", "Print working directory"],
  ["ls [projects]", "List items (or projects)"],
  ["whoami", "Show user"],
  ["date", "Show current date/time"],
  ["echo <text>", "Print text"],
  ["projects", "List project IDs and names"],
  ["project <id|slug>", "Show project details (as table)"],
  ["tech", "Show unique tech across projects"],
  ["open <demo|repo> <id>", "Show link for a project"],
];

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    ["Welcome to Dao's Terminal.", "Type 'help' to get started."].join("\n")
  );
  const outRef = useRef(null);

  useEffect(() => {
    if (outRef.current) {
      outRef.current.scrollTop = outRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const raw = input;
    const line = raw.trim();
    const tokens = line.split(/\s+/);
    const cmd = (tokens[0] || "").toLowerCase();
    const args = tokens.slice(1);

    const prefix = `$ ${promptLabel} `;
    let newOutput = output + `\n${prefix}${raw}\n`;

    if (!cmd) {
      setOutput(newOutput);
      setInput("");
      return;
    }

    switch (cmd) {
      case "help": {
        const widest = Math.max(...helpRows.map(([c]) => c.length));
        const rows = helpRows
          .map(([c, d]) => `  ${c.padEnd(widest)}  ${d}`)
          .join("\n");
        newOutput += "Available commands:\n" + rows;
        break;
      }
      case "clear":
        setOutput("");
        setInput("");
        return;
      case "pwd":
        newOutput += "/home/dao";
        break;
      case "ls":
        newOutput +=
          args[0] && args[0].toLowerCase() === "projects"
            ? projects.map((p, i) => `[${i + 1}] ${p.name}`).join("\n")
            : "projects  about.txt  contact.txt";
        break;
      case "whoami":
        newOutput += "Oranut (Dao)";
        break;
      case "date":
        newOutput += new Date().toString();
        break;
      case "echo":
        newOutput += args.length ? args.join(" ") : "";
        break;
      case "projects": {
        const headers = ["ID", "Name", "Period", "Demo", "Repo"];
        const rows = projects.map((p, i) => [
          i + 1,
          p.name,
          p.period,
          p.links?.demo && p.links.demo !== "#" ? p.links.demo : "—",
          p.links?.repo && p.links.repo !== "#" ? p.links.repo : "—",
        ]);
        newOutput += renderTable(headers, rows);
        break;
      }
      case "project": {
        if (!args[0]) {
          newOutput += "Usage: project <id|slug>";
          break;
        }
        const key = args[0].toLowerCase();
        let idx = -1;
        if (/^\d+$/.test(key)) {
          const n = parseInt(key, 10) - 1;
          if (projects[n]) idx = n;
        } else {
          idx = projects.findIndex((p) => slugify(p.name) === key);
        }
        newOutput +=
          idx === -1
            ? `Project not found: ${args[0]}`
            : projectTable(projects[idx], idx);
        break;
      }
      case "tech": {
        const set = new Set(projects.flatMap((p) => p.tech));
        newOutput += Array.from(set).join(", ");
        break;
      }
      case "open": {
        // open <demo|repo> <id>
        const kind = (args[0] || "").toLowerCase();
        const idArg = args[1];
        if (!["demo", "repo"].includes(kind) || !idArg) {
          newOutput += "Usage: open <demo|repo> <id>";
          break;
        }
        const n = parseInt(idArg, 10) - 1;
        if (!projects[n]) {
          newOutput += `Project not found: ${idArg}`;
          break;
        }
        const url = projects[n].links?.[kind] || "—";
        newOutput += `${kind.toUpperCase()} -> ${url}`;
        break;
      }
      default:
        newOutput += `command not found: ${cmd}\nType 'help' for available commands.`;
    }

    setOutput(newOutput);
    setInput("");
  };

  const renderOutput = (text) => {
    const prefix = `$ ${promptLabel} `;
    return text.split("\n").map((line, i) => {
      if (line.startsWith(prefix)) {
        const cmd = line.slice(prefix.length);
        return (
          <div key={i} className="terminal-line">
            <span className="text-green-400">$</span>{" "}
            <span className="text-blue-300">{promptLabel}</span>{" "}
            <span className="text-white">{cmd}</span>
          </div>
        );
      }
      if (line.startsWith("Available commands:")) {
        return (
          <div
            key={i}
            className="terminal-line text-amber-300 font-semibold mt-2"
          >
            {line}
          </div>
        );
      }
      if (line.startsWith("Usage:")) {
        return (
          <div key={i} className="terminal-line text-rose-300 font-semibold">
            {line}
          </div>
        );
      }
      return (
        <div key={i} className="terminal-line">
          {line || "\u00A0"}
        </div>
      );
    });
  };

  return (
    <div className="terminal-page min-h-screen relative">
      <Starfield />
      <div className="bg-space-gradient absolute inset-0 opacity-90" />
      <div className="container-narrow relative z-10 py-10">
        <div className="terminal-window border border-white/15 rounded-xl overflow-hidden backdrop-blur">
          {/* Title bar */}
          <div className="terminal-bar flex items-center justify-between h-11 px-3 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-2">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="text-[11px] md:text-xs text-white/70 tracking-wider">
              DAO • PORTFOLIO TERMINAL
            </div>
            <Link
              to="/"
              className="inline-flex items-center px-3 py-1 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 text-white/90 text-xs transition-colors"
            >
              Home
            </Link>
          </div>

          {/* Output */}
          <div
            ref={outRef}
            className="terminal-output h-[520px] overflow-auto p-4"
          >
            {renderOutput(output)}
          </div>

          {/* Input */}
          <div className="terminal-input-row flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-black/40">
            <span className="text-green-400">$</span>
            <span className="text-blue-300">{promptLabel}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 terminal-input"
              placeholder="Type a command (try: help)"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
