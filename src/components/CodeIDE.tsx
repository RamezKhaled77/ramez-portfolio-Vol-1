import { useState, useEffect, useRef } from "react";
import { Code2, Terminal, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

type TabType = "react" | "html" | "css" | "javascript";

const CodeIDE = () => {
  const [activeTab, setActiveTab] = useState<TabType>("react");
  const [displayedCode, setDisplayedCode] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const codeExamples = {
    react: [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "",
      "const Portfolio = () => {",
      "  const skills = ['React', 'TypeScript', 'Tailwind'];",
      "",
      "  return (",
      "    <motion.div className='p-8'>",
      "      <h1>Building Experiences</h1>",
      "      <p>With React, TypeScript, and Tailwind CSS</p>",
      "      {skills.map(skill => (",
      "        <span key={skill.id} skill={skill}>{skill}</span>",
      "      ))}",
      "    </motion.div>",
      "  );",
      "};",
      "",
      "export default Portfolio;",
    ],
    html: [
      "<!DOCTYPE html>",
      "<html lang='en'>",
      "<head>",
      "  <title>Modern Design</title>",
      "  <link rel='stylesheet' href='styles.css'>",
      "</head>",
      "<body>",
      "  <header id='hero'>",
      "    <nav id='navbar'>",
      "      <div id='logo'>Portfolio</div>",
      "    </nav>",
      "    <div id='hero-content'>",
      "      <h1>Creative Developer</h1>",
      "      <p>Transforming Ideas into Digital Experiences</p>",
      "    </div>",
      "  </header>",
      "</body>",
      "</html>",
    ],
    css: [
      ":root {",
      "  --primary: #6366f1;",
      "  --bg: #ffffff;",
      "}",
      "",
      "body {",
      "  background: var(--bg);",
      "}",
      "",
      ".hero {",
      "  min-height: 100vh;",
      "  background: linear-gradient(135deg, var(--primary), #8b5cf6);",
      "}",
      "",
      ".navbar {",
      "  padding: 2rem 4rem;",
      "  justify-content: space-between;",
      "}",
    ],
    javascript: [
      "const runTask = async (...tasks) => {",
      "  const results = await Promise.all(tasks);",
      "  return results.filter(Boolean);",
      "};",
      "",
      "function* sequenceGenerator(items) {",
      "  for (const item of items) {",
      "    yield { ...item, timestamp: Date.now() };",
      "  }",
      "}",
      "",
      "const processor = async ({ id, delta }) => {",
      "  const { data } = await fetch(`/api/${id}`);",
      "  return data?.map(x => x * delta);",
      "};",
      "",
      "const [res] = await runTask(processor(10, 0.5));",
      "console.log(sequenceGenerator(res).next());",
    ],
  };

  const tabs = [
    {
      id: "react" as TabType,
      label: "Portfolio.tsx",
      icon: Code2,
      color: "#61dafb",
    },
    {
      id: "html" as TabType,
      label: "index.html",
      icon: Code2,
      color: "#e34c26",
    },
    {
      id: "css" as TabType,
      label: "styles.css",
      icon: Code2,
      color: "#264de4",
    },
    {
      id: "javascript" as TabType,
      label: "script.js",
      icon: Code2,
      color: "#f0db4f",
    },
  ];

  const fullCode = codeExamples[activeTab].join("\n");

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    if (charIndex >= fullCode.length) {
      setIsTyping(false);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedCode(fullCode.slice(0, charIndex + 1));
      setCharIndex((prev) => prev + 1);
    }, 15);

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, fullCode]);

  const handleTabChange = (tabId: TabType) => {
    if (tabId === activeTab) return;
    setIsTyping(false);
    setActiveTab(tabId);
    setDisplayedCode("");
    setCharIndex(0);
    // Delay typing start slightly for better feel
    setTimeout(() => setIsTyping(true), 100);
  };

  const highlightCode = (code: string) => {
    const lines = code.split("\n");

    // Keep angle brackets so they display as <> in the code preview.
    // React will safely escape strings rendered as children, so we only
    // need to escape ampersands to avoid accidental entity issues.
    const escapeHtml = (s: string) => s.replace(/&/g, "&amp;");

    // Use a RegExp constructed from a string to avoid TSX parsing issues
    // (JSX can interpret `</` inside a regex literal as the start of a
    // closing tag). The pattern and flags are the same as before.
    const tokenRegex = new RegExp(
      "(//.*$)|(['\"`][\\s\\S]*?['\"`])|(</?)(\\w+)([^>]*?)(\\/?>)|\\b(const|let|var|export|import|from|default|if|else|key|className|root|body|fetch|Promise|now|next)\\b|\\b(function|async|await|return|log|for|of)\\b|\\b(href|rel|map|id|hero|navbar|primary|bg|filter|yield|delta)\\b|\\b(background|min-height|padding|justify-content|console|Date)\\b",
      "gi",
    );

    return lines.map((line, idx) => {
      const indentMatch = line.match(/^(\s*)/);
      const indentContent = indentMatch ? indentMatch[0] : "";
      const remainingLine = line.substring(indentContent.length);

      const tokens: React.ReactNode[] = [];
      let lastIndex = 0;
      let m: RegExpExecArray | null;
      tokenRegex.lastIndex = 0;

      while ((m = tokenRegex.exec(remainingLine))) {
        if (m.index > lastIndex) {
          tokens.push(escapeHtml(remainingLine.slice(lastIndex, m.index)));
        }

        if (m[1]) {
          // comment
          tokens.push(
            <span key={`c-${idx}-${m.index}`} className="text-[#236dce]">
              {escapeHtml(m[1])}
            </span>,
          );
        } else if (m[2]) {
          // string
          tokens.push(
            <span key={`s-${idx}-${m.index}`} className="text-[#65e07a]">
              {escapeHtml(m[2])}
            </span>,
          );
        } else if (m[3] && m[4]) {
          // full tag: opening/closing bracket, tag name, attributes, and closing
          // m[3] = '<' or '</'
          // m[4] = tag name
          // m[5] = attributes (may be empty)
          // m[6] = closing part including '/>' or '>' (may include '/' before >)
          tokens.push(
            <span key={`t1-${idx}-${m.index}`} className="text-[#f58325]">
              {escapeHtml(m[3])}
            </span>,
          );
          tokens.push(
            <span
              key={`t2-${idx}-${m.index}`}
              className="text-[#f58325] font-semibold"
            >
              {escapeHtml(m[4])}
            </span>,
          );
          if (m[5]) {
            tokens.push(
              <span key={`t5-${idx}-${m.index}`} className="text-[#9cdcfe]">
                {escapeHtml(m[5])}
              </span>,
            );
          }
          if (m[6]) {
            tokens.push(
              <span key={`t6-${idx}-${m.index}`} className="text-[#f58325]">
                {escapeHtml(m[6])}
              </span>,
            );
          }
        } else if (m[7]) {
          tokens.push(
            <span key={`k1-${idx}-${m.index}`} className="text-[#f734a6]">
              {escapeHtml(m[7])}
            </span>,
          );
        } else if (m[8]) {
          tokens.push(
            <span key={`k2-${idx}-${m.index}`} className="text-[#6f72f7]">
              {escapeHtml(m[8])}
            </span>,
          );
        } else if (m[9]) {
          tokens.push(
            <span key={`k3-${idx}-${m.index}`} className="text-[#65c6ec]">
              {escapeHtml(m[9])}
            </span>,
          );
        } else if (m[10]) {
          tokens.push(
            <span key={`k4-${idx}-${m.index}`} className="text-[#14e7a1]">
              {escapeHtml(m[10])}
            </span>,
          );
        } else {
          tokens.push(escapeHtml(m[0]));
        }

        lastIndex = tokenRegex.lastIndex;
      }

      if (lastIndex < remainingLine.length) {
        tokens.push(escapeHtml(remainingLine.slice(lastIndex)));
      }

      return (
        <div
          key={`${activeTab}-${idx}`}
          className="flex font-mono text-sm leading-6 min-h-[1.5rem]"
        >
          <span className="w-12 shrink-0 text-right pr-4 text-white/20 select-none">
            {idx + 1}
          </span>
          <span className="whitespace-pre">
            <span>{indentContent.replace(/ /g, "\u00A0")}</span>
            {tokens.map((t, i) => (
              <span key={`tok-${idx}-${i}`}>{t}</span>
            ))}

            {isTyping && idx === lines.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-primary ml-0.5 align-middle"
              />
            )}
          </span>
        </div>
      );
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                Live Coding
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-heading mb-4">
                Watch Code <span className="text-gradient">Come to Life</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how I craft beautiful, functional components in real-time
              </p>
            </div>

            {/* IDE Container with visual frame for light/dark transition */}
            <div className="relative group">
              {/* Code Preview Label */}
              <div className="flex items-center justify-center mb-4">
                <div className="px-4 py-1.5 bg-foreground/5 border border-card-border rounded-full">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Code Preview
                  </span>
                </div>
              </div>

              {/* IDE Window */}
              <div className="bg-[#1e1e1e] rounded-xl shadow-2xl shadow-primary/25 border border-white/10 overflow-hidden dark:border-primary/20 flex flex-col h-[595px] md:h-[585px]">
                {/* Toolbar */}
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-xs text-white/40 font-mono select-none">
                    {activeTab.toUpperCase()} — Editor
                  </div>
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors group/btn">
                      <Play
                        size={14}
                        className="text-primary group-hover/btn:scale-110 transition-transform"
                      />
                    </button>
                    <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors group/btn">
                      <Terminal
                        size={14}
                        className="text-muted-foreground group-hover/btn:text-primary transition-colors"
                      />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div
                  id="tabs"
                  className="flex bg-[#252526] overflow-x-auto no-scrollbar "
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono transition-colors border-r border-[#1e1e1e] shrink-0 ${
                        activeTab === tab.id
                          ? "bg-[#1e1e1e] text-white border-t-2 border-t-primary"
                          : "text-white/40 hover:bg-[#2d2d2d]"
                      }`}
                    >
                      <tab.icon size={14} style={{ color: tab.color }} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Editor Area */}
                <div
                  id="editor"
                  className="flex-1 overflow-y-hidden overflow-x-auto py-4 custom-scrollbar text-white"
                >
                  {highlightCode(displayedCode)}
                </div>

                {/* Status Bar */}
                <div className="bg-primary px-4 py-1 flex justify-between items-center text-[10px] text-white font-mono uppercase tracking-widest">
                  <div className="flex gap-4">
                    <span>
                      Ln {displayedCode.split("\n").length}, Col{" "}
                      {displayedCode.split("\n").pop()?.length || 0}
                    </span>
                    <span className="hidden sm:inline">UTF-8</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={isTyping ? "animate-pulse" : ""}>
                      {isTyping ? "Typing..." : "Ready"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CodeIDE;
