import { useState, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Brain,
  FileText,
  LayoutGrid,
  MessageSquare,
  Code2,
  GitBranch,
  Globe,
  Timer,
  BookOpen,
  Rocket,
  CheckCircle2,
  Circle,
  Activity,
  Columns,
  Database,
  Link2,
  ArrowRight,
} from "lucide-react";

interface StackPanel {
  id: string;
  title: string;
  category: string;
  tooltip: string;
  size: "small" | "medium" | "large" | "wide";
  content: React.ReactNode;
  glowColor: string;
}

const ProductivityStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null);

  // Smooth, section-scoped parallax without triggering React re-renders
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  // Skeleton UI Components with hover feedback
  const SkeletonLine = ({
    width = "100%",
    className = "",
    hoverable = false,
  }: {
    width?: string;
    className?: string;
    hoverable?: boolean;
  }) => (
    <div
      className={`h-2 rounded-full bg-muted/50 transition-all duration-300 ${hoverable ? "group-hover:bg-muted/70" : ""} ${className}`}
      style={{ width }}
    />
  );

  // Tool Icon Component with better hierarchy
  const ToolIcon = ({
    icon: Icon,
    label,
    color = "muted",
  }: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    color?: string;
  }) => {
    const colorClasses: Record<string, string> = {
      violet: "bg-violet-500/25 text-violet-300",
      blue: "bg-blue-500/25 text-blue-300",
      emerald: "bg-emerald-500/25 text-emerald-300",
      amber: "bg-amber-500/25 text-amber-300",
      cyan: "bg-cyan-500/25 text-cyan-300",
      rose: "bg-rose-500/25 text-rose-300",
      muted: "bg-muted/40 text-muted-foreground/70",
    };

    return (
      <div className="flex items-center gap-2.5">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center ${colorClasses[color]} transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-semibold text-foreground/90">
          {label}
        </span>
      </div>
    );
  };

  // Status Indicator with hover feedback
  const StatusIndicator = ({
    status,
    label,
  }: {
    status: "active" | "idle" | "running";
    label: string;
  }) => {
    const statusConfig = {
      active: {
        color: "bg-emerald-400",
        text: "text-emerald-300",
        pulse: true,
      },
      idle: { color: "bg-amber-400", text: "text-amber-300", pulse: false },
      running: { color: "bg-blue-400", text: "text-blue-300", pulse: true },
    };

    const config = statusConfig[status];

    return (
      <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-muted/20 transition-colors duration-200 hover:bg-muted/30">
        <div className="relative">
          <div className={`w-2 h-2 rounded-full ${config.color}`} />
          {config.pulse && (
            <div
              className={`absolute inset-0 w-2 h-2 rounded-full ${config.color} animate-ping opacity-60`}
            />
          )}
        </div>
        <span
          className={`text-[11px] font-semibold tracking-wide uppercase ${config.text}`}
        >
          {label}
        </span>
      </div>
    );
  };

  // Planning & Thinking Panel Content - Split into Obsidian & Notion
  const PlanningContent = () => (
    <div className="flex flex-col h-full">
      {/* Top Half: Obsidian */}
      <div className="flex-1 pb-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ToolIcon icon={Brain} label="Obsidian" color="violet" />
        </div>
        <p className="text-xs text-muted-foreground/70 mb-3 leading-relaxed">
          Linked thinking, knowledge graphs
        </p>

        {/* Knowledge Graph Skeleton */}
        <div className="relative h-16">
          <svg className="w-full h-full" viewBox="0 0 200 64">
            {/* Animated Nodes */}
            <motion.circle
              cx="35"
              cy="20"
              r="8"
              className="fill-violet-500/40 stroke-violet-400/60"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="100"
              cy="32"
              r="10"
              className="fill-violet-500/50 stroke-violet-400/70"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle
              cx="165"
              cy="18"
              r="6"
              className="fill-violet-500/35 stroke-violet-400/50"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="60"
              cy="50"
              r="7"
              className="fill-violet-500/45 stroke-violet-400/60"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            <motion.circle
              cx="140"
              cy="48"
              r="6"
              className="fill-violet-500/30 stroke-violet-400/45"
              strokeWidth="1.5"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />

            {/* Connections with pulse effect */}
            <motion.line
              x1="35"
              y1="20"
              x2="100"
              y2="32"
              className="stroke-violet-400/40"
              strokeWidth="1.5"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.line
              x1="100"
              y1="32"
              x2="165"
              y2="18"
              className="stroke-violet-400/35"
              strokeWidth="1.5"
              animate={{ opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.line
              x1="100"
              y1="32"
              x2="60"
              y2="50"
              className="stroke-violet-400/40"
              strokeWidth="1.5"
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            <motion.line
              x1="100"
              y1="32"
              x2="140"
              y2="48"
              className="stroke-violet-400/30"
              strokeWidth="1.5"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
            />
          </svg>
        </div>
      </div>

      {/* Subtle Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent my-3" />

      {/* Bottom Half: Notion */}
      <div className="flex-1 pt-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ToolIcon icon={FileText} label="Notion" color="muted" />
        </div>
        <p className="text-xs text-muted-foreground/70 mb-3 leading-relaxed">
          Docs, planning, structured systems
        </p>

        {/* Notion-style blocks skeleton */}
        <div className="space-y-1.5">
          {/* Database row */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/25 border border-border/40 transition-colors duration-200 hover:bg-muted/35">
            <Database className="w-3.5 h-3.5 text-muted-foreground/60" />
            <SkeletonLine width="70%" className="h-2" hoverable />
          </div>
          {/* Page blocks */}
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/15 transition-colors duration-200 hover:bg-muted/25">
            <FileText className="w-3.5 h-3.5 text-muted-foreground/50" />
            <SkeletonLine width="55%" className="h-2" hoverable />
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/15 transition-colors duration-200 hover:bg-muted/25">
            <Link2 className="w-3.5 h-3.5 text-muted-foreground/50" />
            <SkeletonLine width="45%" className="h-2" hoverable />
          </div>
        </div>
      </div>
    </div>
  );

  // Task Management Panel Content
  const TaskManagementContent = () => (
    <div className="space-y-3 h-full">
      <div className="flex items-center justify-between">
        <ToolIcon icon={LayoutGrid} label="Trello" color="blue" />
        <StatusIndicator status="running" label="Active" />
      </div>

      {/* Kanban columns skeleton */}
      <div className="flex gap-3 mt-4">
        {[
          { name: "Todo", count: 2, color: "muted" },
          { name: "Progress", count: 1, color: "blue" },
          { name: "Done", count: 3, color: "emerald" },
        ].map((col) => (
          <div key={col.name} className="flex-1 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-muted-foreground/70 uppercase tracking-wider font-medium">
                {col.name}
              </span>
              <span className="text-[10px] text-muted-foreground/50 font-mono">
                {col.count}
              </span>
            </div>
            {[...Array(col.count)].map((_, j) => (
              <motion.div
                key={j}
                className={`h-9 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                  col.color === "blue"
                    ? "bg-blue-500/20 border-blue-500/30"
                    : col.color === "emerald"
                      ? "bg-emerald-500/15 border-emerald-500/25"
                      : "bg-muted/30 border-border/40"
                }`}
                style={{ opacity: 1 - j * 0.12 }}
                animate={
                  col.color === "blue" ? { opacity: [0.85, 1, 0.85] } : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  // Focus Mode Panel Content
  const FocusModeContent = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-3">
      <div className="flex items-center gap-2 self-start">
        <ToolIcon icon={Timer} label="Pomodoro" color="emerald" />
      </div>

      <div className="relative mt-2">
        {/* Timer ring */}
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            className="fill-none stroke-muted/30"
            strokeWidth="6"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            className="fill-none stroke-emerald-400/70"
            strokeWidth="6"
            strokeDasharray={264}
            strokeDashoffset={264 * 0.25}
            strokeLinecap="round"
            animate={{ strokeDashoffset: [264 * 0.25, 264 * 0.2, 264 * 0.25] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-mono font-semibold text-foreground/90">
            45:00
          </span>
        </div>
      </div>

      <StatusIndicator status="active" label="Active" />

      <div className="flex gap-1.5 mt-1">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-7 h-2 rounded-full transition-colors duration-200 ${i < 3 ? "bg-emerald-400/60 hover:bg-emerald-400/80" : "bg-muted/40"}`}
            animate={i === 2 ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );

  // Learning Workflow Panel Content
  const LearningContent = ({ isHovered }: { isHovered: boolean }) => (
    <div className="space-y-3 h-full">
      <div className="flex items-center gap-3">
        <ToolIcon icon={BookOpen} label="Courses" color="amber" />
        <span className="text-muted-foreground/40">•</span>
        <ToolIcon icon={Rocket} label="Projects" color="muted" />
      </div>

      {/* Progress steps */}
      <div className="space-y-2.5 mt-4">
        {[
          { label: "Research", progress: 100, icon: CheckCircle2 },
          { label: "Build", progress: 75, icon: Activity },
          { label: "Iterate", progress: 40, icon: Circle },
          { label: "Ship", progress: 0, icon: Circle },
        ].map((step, i) => (
          <div key={step.label} className="space-y-1.5 group/step">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <step.icon
                  className={`w-3.5 h-3.5 transition-colors duration-200 ${step.progress === 100 ? "text-amber-400" : "text-muted-foreground/50 group-hover/step:text-muted-foreground/70"}`}
                />
                <span className="text-xs text-muted-foreground/80 font-medium">
                  {step.label}
                </span>
              </div>
              <span className="text-xs text-muted-foreground/60 font-mono">
                {step.progress}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/30 overflow-hidden transition-colors duration-200 group-hover/step:bg-muted/40">
              <motion.div
                className="h-full rounded-full bg-amber-400/70 transition-colors duration-200 group-hover/step:bg-amber-400/85"
                initial={{ width: 0 }}
                animate={{ width: isHovered ? `${step.progress}%` : "0%" }}
                transition={{ duration: 0.8, delay: isHovered ? i * 0.1 : 0 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Development Tools Panel Content
  const DevToolsContent = () => (
    <div className="space-y-3 h-full">
      <div className="flex items-center gap-3">
        <ToolIcon icon={Code2} label="Code" color="cyan" />
        <span className="text-muted-foreground/40">•</span>
        <ToolIcon icon={GitBranch} label="Git" color="muted" />
        <span className="text-muted-foreground/40">•</span>
        <ToolIcon icon={Globe} label="Dev" color="muted" />
      </div>

      {/* Code editor skeleton */}
      <div className="rounded-xl bg-muted/20 border border-border/40 p-3 space-y-2 mt-3">
        {/* Tab bar */}
        <div className="flex gap-1.5 mb-3">
          <div className="px-2.5 py-1 rounded-md bg-cyan-500/25 text-[10px] text-cyan-300 font-semibold">
            App.tsx
          </div>
          <div className="px-2.5 py-1 rounded-md bg-muted/20 text-[10px] text-muted-foreground/50">
            utils.ts
          </div>
        </div>

        {/* Code lines */}
        <div className="space-y-2 font-mono">
          {[
            { indent: 0, width: "45%", highlight: true },
            { indent: 12, width: "60%", highlight: false },
            { indent: 24, width: "50%", highlight: false },
            { indent: 12, width: "35%", highlight: false },
            { indent: 0, width: "25%", highlight: true },
          ].map((line, i) => (
            <div key={i} className="flex items-center gap-3 group/line">
              <span className="text-[10px] text-muted-foreground/40 w-4 shrink-0 font-mono">
                {i + 1}
              </span>
              <div style={{ marginLeft: line.indent }}>
                <SkeletonLine
                  width={line.width}
                  className={`h-2 ${line.highlight ? "bg-cyan-500/30" : ""}`}
                  hoverable
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Git status */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
          <span className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
            <span className="font-medium">main</span>
          </span>
          <span className="text-emerald-400/80 font-mono">+3</span>
          <span className="text-rose-400/80 font-mono">-1</span>
        </div>
        <StatusIndicator status="running" label="Synced" />
      </div>
    </div>
  );

  // Communication Panel Content
  const CommunicationContent = () => (
    <div className="space-y-3 h-full">
      <div className="flex items-center justify-between">
        <ToolIcon icon={MessageSquare} label="Slack" color="rose" />
        <StatusIndicator status="idle" label="Async" />
      </div>

      {/* Message threads skeleton */}
      <div className="space-y-2 mt-3">
        {[
          { unread: false, width: "80%" },
          { unread: true, width: "65%" },
          { unread: false, width: "90%" },
        ].map((msg, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-2.5 p-2.5 rounded-lg transition-colors duration-200 hover:bg-muted/30 ${msg.unread ? "bg-rose-500/15 border border-rose-500/30" : "bg-muted/20"}`}
            animate={msg.unread ? { opacity: [0.85, 1, 0.85] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-6 rounded-full bg-muted/50 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <SkeletonLine
                width={msg.width}
                className={`h-2 ${msg.unread ? "bg-rose-300/40" : ""}`}
                hoverable
              />
              <SkeletonLine width="40%" className="h-1.5" />
            </div>
            {msg.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground/50 text-center mt-2 font-medium">
        Async reduces friction
      </div>
    </div>
  );

  // Project Tracking Panel Content (Jira)
  const ProjectTrackingContent = ({ isHovered }: { isHovered: boolean }) => (
    <div className="space-y-4 h-full">
      <div className="flex items-center justify-between">
        <ToolIcon icon={Columns} label="Jira" color="blue" />
        <StatusIndicator status="running" label="Sprint" />
      </div>

      {/* Sprint board flow */}
      <div className="space-y-3 mt-3">
        {/* Sprint progress */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground/70">
          <span className="font-semibold">Sprint 12</span>
          <div className="flex-1 h-2 rounded-full bg-muted/30 overflow-hidden transition-colors duration-200 hover:bg-muted/40">
            <motion.div
              className="h-full rounded-full bg-blue-400/70"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "65%" : "0%" }}
              transition={{ duration: 1 }}
            />
          </div>
          <span className="font-mono text-blue-300/80">65%</span>
        </div>

        {/* Issue flow visualization */}
        <div className="flex items-center justify-between gap-2">
          {[
            { label: "To Do", count: 4, color: "bg-muted/40" },
            { label: "In Progress", count: 3, color: "bg-blue-500/50" },
            { label: "Done", count: 7, color: "bg-emerald-500/50" },
          ].map((status) => (
            <div
              key={status.label}
              className="flex-1 flex flex-col items-center group/status"
            >
              <div
                className={`w-full h-10 rounded-lg ${status.color} flex items-center justify-center transition-all duration-200 group-hover/status:scale-[1.03]`}
              >
                <span className="text-sm font-bold text-foreground/80">
                  {status.count}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/60 mt-1.5 font-medium">
                {status.label}
              </span>
            </div>
          ))}
        </div>

        {/* Task items */}
        <div className="space-y-2">
          {[
            { priority: "high", width: "75%" },
            { priority: "medium", width: "60%" },
            { priority: "low", width: "45%" },
          ].map((task, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 p-2 rounded-lg bg-muted/20 border border-border/30 transition-colors duration-200 hover:bg-muted/30"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  task.priority === "high"
                    ? "bg-rose-400"
                    : task.priority === "medium"
                      ? "bg-yellow-400"
                      : "bg-emerald-400"
                }`}
              />
              <SkeletonLine width={task.width} className="h-2" hoverable />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const panels: StackPanel[] = [
    {
      id: "planning",
      title: "Planning & Thinking",
      category: "Knowledge",
      tooltip: "I think in systems, not scattered notes.",
      size: "medium",
      content: <PlanningContent />,
      glowColor: "violet",
    },
    {
      id: "tasks",
      title: "Task Management",
      category: "Organization",
      tooltip: "Clear tasks, clear mind.",
      size: "wide",
      content: <TaskManagementContent />,
      glowColor: "blue",
    },
    {
      id: "focus",
      title: "Focus Mode",
      category: "Deep Work",
      tooltip: "Distraction-free productivity.",
      size: "small",
      content: <FocusModeContent />,
      glowColor: "emerald",
    },
    {
      id: "communication",
      title: "Communication",
      category: "Collaboration",
      tooltip: "Async-first approach.",
      size: "small",
      content: <CommunicationContent />,
      glowColor: "rose",
    },
    {
      id: "learning",
      title: "Learning Workflow",
      category: "Growth",
      tooltip: "Learning by building, not watching.",
      size: "medium",
      content: <LearningContent />,
      glowColor: "amber",
    },
    {
      id: "devtools",
      title: "Development Tools",
      category: "Engineering",
      tooltip: "Clean and maintainable code.",
      size: "large",
      content: <DevToolsContent />,
      glowColor: "cyan",
    },
    {
      id: "projectTracking",
      title: "Project Tracking",
      category: "Agile",
      tooltip: "Sprints keep projects moving.",
      size: "medium",
      content: <ProjectTrackingContent />,
      glowColor: "blue",
    },
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "small":
        return "col-span-1 row-span-1";
      case "medium":
        return "col-span-1 row-span-2 md:col-span-1";
      case "large":
        return "col-span-1 row-span-2 md:col-span-1";
      case "wide":
        return "col-span-1 md:col-span-2 row-span-1";
      default:
        return "col-span-1";
    }
  };

  const getGlowStyles = (glowColor: string, isHovered: boolean) => {
    if (!isHovered) return {};

    const glowColors: Record<string, string> = {
      violet:
        "0 0 40px rgba(139, 92, 246, 0.15), 0 0 80px rgba(139, 92, 246, 0.05)",
      blue: "0 0 40px rgba(59, 130, 246, 0.15), 0 0 80px rgba(59, 130, 246, 0.05)",
      emerald:
        "0 0 40px rgba(52, 211, 153, 0.15), 0 0 80px rgba(52, 211, 153, 0.05)",
      amber:
        "0 0 40px rgba(251, 191, 36, 0.15), 0 0 80px rgba(251, 191, 36, 0.05)",
      cyan: "0 0 40px rgba(34, 211, 238, 0.15), 0 0 80px rgba(34, 211, 238, 0.05)",
      rose: "0 0 40px rgba(251, 113, 133, 0.15), 0 0 80px rgba(251, 113, 133, 0.05)",
    };

    return { boxShadow: glowColors[glowColor] || "" };
  };

  const getBorderGlow = (glowColor: string, isHovered: boolean) => {
    if (!isHovered) return "border-border/40";

    const borderColors: Record<string, string> = {
      violet: "border-violet-500/40",
      blue: "border-blue-500/40",
      emerald: "border-emerald-500/40",
      amber: "border-amber-500/40",
      cyan: "border-cyan-500/40",
      rose: "border-rose-500/40",
    };

    return borderColors[glowColor] || "border-border/60";
  };

  return (
    <div ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient - reduced vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background))_100%)] opacity-40" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Transition */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-muted-foreground/70 text-sm font-medium tracking-wide mb-8"
        >
          Behind every output is a system.
        </motion.p>

        {/* Header - more dominant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 font-medium">
              Workflow System
            </span>
            <StatusIndicator status="running" label="Operational" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 text-foreground">
            My Productivity Stack
          </h2>
          <p className="text-muted-foreground/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            A personal system for staying focused, organized, and productive.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto "
          onPointerMove={(e) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const nx = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const ny = (e.clientY - rect.top - rect.height / 2) / rect.height;
            mx.set(nx * 15);
            my.set(ny * 15);
          }}
          onPointerLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          {panels.map((panel, index) => {
            const isHovered = hoveredPanel === panel.id;

            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1 + index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`${getSizeClasses(panel.size)} relative group`}
                onMouseEnter={() => setHoveredPanel(panel.id)}
                onMouseLeave={() => setHoveredPanel(null)}
                style={{
                  x: isHovered ? x : 0,
                  y: isHovered ? y : 0,
                }}
              >
                <div
                  className={`
            h-full p-5 rounded-2xl
            bg-card/60 backdrop-blur-sm
            border transition-all duration-300 ease-out
            ${getBorderGlow(panel.glowColor, isHovered)}
            ${isHovered ? "-translate-y-1.5" : ""}
          `}
                  style={getGlowStyles(panel.glowColor, isHovered)}
                >
                  <div className="mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
                      {panel.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-0.5">
                      {panel.title}
                    </h3>
                  </div>

                  <div className="relative h-[calc(100%-3.5rem)]">
                    {panel.id === "learning" ? (
                      <LearningContent isHovered={isHovered} />
                    ) : panel.id === "projectTracking" ? (
                      <ProjectTrackingContent isHovered={isHovered} />
                    ) : (
                      panel.content
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 8,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-4 left-4 right-4 pointer-events-none z-10"
                  >
                    <div className="px-3 py-2 rounded-sm bg-foreground text-background text-xs font-medium shadow-lg">
                      "{panel.tooltip}"
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-center text-muted-foreground/60 text-sm mt-14 tracking-wide font-medium"
        >
          Systems over chaos. Structure over noise.
        </motion.p>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-center text-muted-foreground/50 text-xs mt-4 italic"
        >
          Tools don't make me productive — systems do.
        </motion.p>
      </div>
    </div>
  );
};

export default ProductivityStack;
