import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  profile,
  skills,
  projects,
  experience,
  education,
  certification,
} from "../data.js";

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

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const truncate = (str = "", w = 40) =>
  str.length > w ? str.slice(0, w - 1) + "…" : str;

// รองรับ "quoted strings"
function tokenize(line) {
  const tokens = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (!inQuotes && /\s/.test(ch)) {
      if (cur) tokens.push(cur), (cur = "");
    } else {
      cur += ch;
    }
  }
  if (cur) tokens.push(cur);
  return tokens;
}

/** ตาราง compact สำหรับรายชื่อโปรเจกต์ (ให้พอดีกับเทอร์มินัล) */
function renderTable(headers, rows) {
  // [ID, Name, Period, Demo, Repo] — caps แบบกระชับ
  const caps = [3, 28, 14, 20, 20]; // รวม ~85 คอลัมน์ (ก่อนช่องว่าง/เส้นแบ่ง)
  const widths = headers.map((h, i) =>
    Math.min(
      Math.max(h.length, ...rows.map((r) => String(r[i] ?? "").length)),
      caps[i] ?? 24
    )
  );

  const sep = "+" + widths.map((w) => "-".repeat(w + 2)).join("+") + "+";
  const fmtRow = (cols) =>
    "| " +
    cols
      .map((c, i) => String(c ?? ""))
      .map((txt, i) => truncate(txt, widths[i]).padEnd(widths[i], " "))
      .join(" | ") +
    " |";

  const lines = [sep, fmtRow(headers), sep];
  rows.forEach((r) => lines.push(fmtRow(r)));
  lines.push(sep);
  return lines.join("\n");
}

/** ตารางรายละเอียดโปรเจกต์ (compact) */
function projectTable(p, idx) {
  const safe = (v) => (v == null ? "—" : String(v));
  const demo = p?.links?.demo && p.links.demo !== "#" ? p.links.demo : "—";
  const repo = p?.links?.repo && p.links.repo !== "#" ? p.links.repo : "—";

  const headers = ["Field", "Value"];
  const rows = [
    ["ID", `#${idx + 1}`],
    ["Name", safe(p?.name)],
    ["Period", safe(p?.period)],
    ["Status", safe(p?.status)],
    ["Tech", Array.isArray(p?.tech) ? p.tech.join(", ") : safe(p?.tech)],
    ["Desc", safe(p?.description)],
    [
      "Highlights",
      Array.isArray(p?.highlights)
        ? p.highlights.join("; ")
        : safe(p?.highlights),
    ],
    ["Demo", demo],
    ["Repo", repo],
  ];

  const capKey = 10; // ความกว้างคอลัมน์ Field
  const capVal = 68; // ความกว้างคอลัมน์ Value
  const widthKey = Math.min(
    Math.max(headers[0].length, ...rows.map((r) => r[0].length)),
    capKey
  );
  const widthVal = Math.min(
    Math.max(headers[1].length, ...rows.map((r) => String(r[1]).length)),
    capVal
  );

  const sep =
    "+" + "-".repeat(widthKey + 2) + "+" + "-".repeat(widthVal + 2) + "+";
  const fmt = (a, b) =>
    `| ${truncate(a, widthKey).padEnd(widthKey, " ")} | ${truncate(
      String(b),
      widthVal
    ).padEnd(widthVal, " ")} |`;

  const out = [
    sep,
    fmt(headers[0], headers[1]),
    sep,
    ...rows.map(([a, b]) => fmt(a, b)),
    sep,
  ];
  return out.join("\n");
}

/* ===== Help (ตัดคำสั่งตามที่ขอ) ===== */
const helpRows = [
  ["help [cmd]", "Show help (or detailed help for a command)"],
  ["clear / cls", "Clear the screen (Ctrl+L also works)"],
  ["pwd", "Print working directory"],
  ["cd <path>", "Change directory (simulated)"],
  ["ls [projects|skills|files]", "List directory or portfolio sections"],
  ["date", "Show current date/time"],
  ["echo <text>", 'Print text (supports "quoted strings")'],
  ["projects", "List project IDs and names"],
  ["project <id|slug>", "Show project details (as table)"],
  ["open <demo|repo> <id>", "Show link for a project"],
  ["skills", "Show grouped skills"],
  ["history", "Show recent commands (use ↑ / ↓ to navigate)"],
];

const commandDocs = {
  help: {
    usage: "help [command]",
    desc: "Show general help or detailed docs for a specific command.",
    examples: ["help", "help project", "help open"],
  },
  clear: {
    usage: "clear",
    desc: "Clear terminal output.",
    examples: ["clear"],
  },
  cls: { usage: "cls", desc: "Alias of clear.", examples: ["cls"] },
  pwd: { usage: "pwd", desc: "Print working directory.", examples: ["pwd"] },
  cd: {
    usage: "cd <path>",
    desc: "Change directory (simulated).",
    examples: ["cd /home/dao", "cd .."],
  },
  ls: {
    usage: "ls [projects|skills|files]",
    desc: "List items in current directory or portfolio sections.",
    examples: ["ls", "ls projects", "ls files"],
  },
  date: { usage: "date", desc: "Show current date/time.", examples: ["date"] },
  echo: {
    usage: "echo <text>",
    desc: 'Print text to output. Supports "quoted strings".',
    examples: ["echo Hello", 'echo "Hello World"'],
  },
  projects: {
    usage: "projects",
    desc: "List all projects with IDs and quick links (demo/repo).",
    examples: ["projects"],
  },
  project: {
    usage: "project <id|slug>",
    desc: "Show project details in table format by ID (1-based) or slug.",
    examples: ["project 1", "project treats-and-whiskers-web-prototype"],
  },
  open: {
    usage: "open <demo|repo> <id>",
    desc: "Print demo or repo link by project ID.",
    examples: ["open demo 2", "open repo 1"],
  },
  skills: {
    usage: "skills",
    desc: "Show grouped skills.",
    examples: ["skills"],
  },
  history: {
    usage: "history",
    desc: "Show command history.",
    examples: ["history"],
  },
};

/* ===== Fake FS (ให้สอดคล้องกับคำสั่งที่เหลือ) ===== */
const FS = {
  "/": ["home", "projects", "files"],
  "/home": ["dao"],
  "/home/dao": [], // ไม่มีไฟล์ให้ cat แล้ว
  "/projects": projects.map((_, i) => `#${i + 1}`),
  "/files": ["resume.pdf (not real)", "readme.md (not real)"],
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    [
      "Welcome to Dao's Terminal.",
      "Type 'help' to get started. Tip: use ↑ / ↓ to navigate command history.",
    ].join("\n")
  );
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [cwd, setCwd] = useState("/home/dao");
  const outRef = useRef(null);

  useEffect(() => {
    if (outRef.current) {
      outRef.current.scrollTop = outRef.current.scrollHeight;
    }
  }, [output]);

  const prefix = () => `$ ${promptLabel} `;
  const prompt = () => `${cwd}$`;

  const listDir = (path) => {
    const p = path || cwd;
    const items = FS[p];
    if (!items) return `ls: cannot access '${p}': No such file or directory`;
    return items.join("  ");
  };

  const resolvePath = (path) => {
    if (!path) return cwd;
    if (path.startsWith("/")) return path;
    if (path === "~") return "/home/dao";
    const parts = (cwd + "/" + path).split("/").filter(Boolean);
    const stack = [];
    for (const part of parts) {
      if (part === ".") continue;
      if (part === "..") stack.pop();
      else stack.push(part);
    }
    return "/" + stack.join("/");
  };

  const handleKeyDown = (e) => {
    // Ctrl+L to clear
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setOutput("");
      return;
    }

    // history nav
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length === 0) return;
      let nextIdx = histIdx;
      if (e.key === "ArrowUp") {
        nextIdx =
          histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      } else {
        if (histIdx === -1) return;
        nextIdx = histIdx + 1;
        if (nextIdx >= history.length) {
          setHistIdx(-1);
          setInput("");
          return;
        }
      }
      setHistIdx(nextIdx);
      setInput(history[nextIdx] || "");
      return;
    }

    // execute
    if (e.key !== "Enter") return;
    const raw = input;
    const line = raw.trim();
    const tokens = tokenize(line);
    const cmd = (tokens[0] || "").toLowerCase();
    const args = tokens.slice(1);

    let newOutput = output + `\n${prefix()}${prompt()} ${raw}\n`;

    // store history
    if (raw) {
      setHistory((prev) => {
        const next = [...prev];
        if (next[next.length - 1] !== raw) next.push(raw);
        if (next.length > 100) next.shift();
        return next;
      });
    }
    setHistIdx(-1);

    if (!cmd) {
      setOutput(newOutput);
      setInput("");
      return;
    }

    const printHelpList = () => {
      const widest = Math.max(...helpRows.map(([c]) => c.length));
      const rows = helpRows
        .map(([c, d]) => `  ${c.padEnd(widest)}  ${d}`)
        .join("\n");
      return (
        "Available commands:\n" +
        rows +
        "\nTip: type 'help <command>' for details."
      );
    };

    switch (cmd) {
      case "help": {
        if (args[0]) {
          const q = args[0].toLowerCase();
          const doc = commandDocs[q];
          if (!doc) {
            newOutput += `No detailed help for '${args[0]}'. Type 'help' to see all commands.`;
            break;
          }
          newOutput += [
            `Available commands (detailed):`,
            `  ${q}`,
            `  - Usage: ${doc.usage}`,
            `  - Description: ${doc.desc}`,
            `  - Examples:`,
            ...doc.examples.map((ex) => `      ${ex}`),
          ].join("\n");
        } else {
          newOutput += printHelpList();
        }
        break;
      }

      case "clear":
      case "cls": {
        setOutput("");
        setInput("");
        return;
      }

      case "pwd": {
        newOutput += cwd;
        break;
      }

      case "cd": {
        if (!args[0]) {
          setCwd("/home/dao");
          break;
        }
        const target = resolvePath(args[0]);
        if (!FS[target]) {
          newOutput += `cd: no such file or directory: ${args[0]}`;
          break;
        }
        setCwd(target);
        break;
      }

      case "ls": {
        const scope = args[0]?.toLowerCase();
        if (!scope) {
          newOutput += listDir();
          break;
        }
        if (["projects", "skills", "files"].includes(scope)) {
          if (scope === "projects") {
            newOutput += projects
              .map((p, i) => `[${i + 1}] ${p.name}`)
              .join("\n");
          } else if (scope === "skills") {
            newOutput += skills.map((g) => `- ${g.group}`).join("\n");
          } else if (scope === "files") {
            newOutput += listDir("/files");
          }
        } else {
          newOutput += listDir(resolvePath(scope));
        }
        break;
      }

      case "date": {
        newOutput += new Date().toString();
        break;
      }

      case "echo": {
        newOutput += args.length ? args.join(" ") : "";
        break;
      }

      case "projects": {
        const headers = ["ID", "Name", "Period", "Demo", "Repo"];
        const rows = projects.map((p, i) => [
          i + 1,
          p.name,
          p.period || "—",
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
          if (idx === -1) {
            // relaxed slug
            const soft = key.replace(/[^a-z]+/g, "");
            idx = projects.findIndex(
              (p) => slugify(p.name).replace(/[^a-z]+/g, "") === soft
            );
          }
        }
        newOutput +=
          idx === -1
            ? `Project not found: ${args[0]}`
            : projectTable(projects[idx], idx);
        break;
      }

      case "open": {
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

      case "skills": {
        // แสดงเป็นกลุ่มแบบกระชับ จาก data.js
        newOutput += skills
          .map(
            (g) =>
              `- ${g.group}: ${
                Array.isArray(g.items) ? g.items.join(", ") : ""
              }`
          )
          .join("\n");
        break;
      }

      case "history": {
        if (history.length === 0) {
          newOutput += "No history yet.";
          break;
        }
        const lines = [...history]
          .slice(-20)
          .map((h, i, a) => `${a.length - (a.length - i) + 1}. ${h}`);
        newOutput += lines.join("\n");
        break;
      }

      default: {
        newOutput += `command not found: ${cmd}\nType 'help' for available commands.`;
      }
    }

    setOutput(newOutput);
    setInput("");
  };

  const renderOutput = (text) => {
    const pfx = `$ ${promptLabel} ${cwd}$ `;
    return text.split("\n").map((line, i) => {
      if (line.startsWith(pfx)) {
        const cmd = line.slice(pfx.length);
        return (
          <div key={i} className="terminal-line">
            <span className="text-green-400">$</span>{" "}
            <span className="text-blue-300">{promptLabel}</span>{" "}
            <span className="text-white">{`${cwd}$`}</span>{" "}
            <span className="text-white">{cmd}</span>
          </div>
        );
      }
      if (
        line.startsWith("Available commands:") ||
        line.startsWith("Available commands (detailed):")
      ) {
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
              placeholder="Type a command (try: help, projects, open)"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
