import { useRef } from "react";

interface SkillCardProps {
  skill: {
    name: string;
    icon: string;
    color: string;
  };
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Unique id per instance to avoid duplicate SVG ids when multiple cards render
  const uid = useRef<string>(Math.random().toString(36).slice(2, 9));

  // Custom SVG icons for each skill
  const getSkillIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      html: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`htmlGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M20 15 L50 10 L80 15 L75 75 L50 85 L25 75 Z"
            fill={`url(#htmlGrad-${uid.current})`}
          />
          <rect
            x="35"
            y="30"
            width="30"
            height="5"
            fill="white"
            fillOpacity="0.9"
          />
          <rect
            x="35"
            y="45"
            width="30"
            height="5"
            fill="white"
            fillOpacity="0.7"
          />
          <rect
            x="35"
            y="60"
            width="20"
            height="5"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      ),
      css: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`cssGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="35"
            fill={`url(#cssGrad-${uid.current})`}
          />
          <rect
            x="35"
            y="35"
            width="30"
            height="8"
            rx="2"
            fill="white"
            fillOpacity="0.9"
          />
          <rect
            x="35"
            y="48"
            width="20"
            height="6"
            rx="2"
            fill="white"
            fillOpacity="0.7"
          />
          <rect
            x="35"
            y="58"
            width="25"
            height="6"
            rx="2"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      ),
      javascript: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`jsGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.7 }}
              />
            </linearGradient>
          </defs>
          <rect
            x="15"
            y="15"
            width="70"
            height="70"
            rx="10"
            fill="url(#jsGrad)"
          />
          <text
            x="50"
            y="65"
            fontSize="40"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
          >
            JS
          </text>
        </svg>
      ),
      react: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`reactGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="15"
            fill="none"
            stroke={`url(#reactGrad-${uid.current})`}
            strokeWidth="3"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="15"
            fill="none"
            stroke={`url(#reactGrad-${uid.current})`}
            strokeWidth="3"
            transform="rotate(60 50 50)"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="40"
            ry="15"
            fill="none"
            stroke={`url(#reactGrad-${uid.current})`}
            strokeWidth="3"
            transform="rotate(120 50 50)"
          />
          <circle
            cx="50"
            cy="50"
            r="6"
            fill={`url(#reactGrad-${uid.current})`}
          />
        </svg>
      ),
      typescript: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`tsGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.7 }}
              />
            </linearGradient>
          </defs>
          <rect
            x="15"
            y="15"
            width="70"
            height="70"
            rx="10"
            fill={`url(#tsGrad-${uid.current})`}
          />
          <text
            x="50"
            y="65"
            fontSize="40"
            fontWeight="bold"
            fill="white"
            textAnchor="middle"
          >
            TS
          </text>
        </svg>
      ),
      git: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`gitGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <circle
            cx="30"
            cy="50"
            r="12"
            fill={`url(#gitGrad-${uid.current})`}
          />
          <circle
            cx="70"
            cy="50"
            r="12"
            fill={`url(#gitGrad-${uid.current})`}
          />
          <circle
            cx="50"
            cy="25"
            r="12"
            fill={`url(#gitGrad-${uid.current})`}
          />
          <line
            x1="38"
            y1="43"
            x2="62"
            y2="43"
            stroke={`url(#gitGrad-${uid.current})`}
            strokeWidth="4"
          />
          <line
            x1="42"
            y1="32"
            x2="42"
            y2="43"
            stroke={`url(#gitGrad-${uid.current})`}
            strokeWidth="4"
          />
          <line
            x1="58"
            y1="32"
            x2="58"
            y2="43"
            stroke={`url(#gitGrad-${uid.current})`}
            strokeWidth="4"
          />
        </svg>
      ),
      tailwind: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient
              id={`tailwindGrad-${uid.current}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M50 25 Q35 25 30 35 Q25 45 35 45 Q40 45 45 40 Q50 35 55 40 Q60 45 65 45 Q75 45 70 35 Q65 25 50 25 Z"
            fill={`url(#tailwindGrad-${uid.current})`}
          />
          <path
            d="M50 50 Q35 50 30 60 Q25 70 35 70 Q40 70 45 65 Q50 60 55 65 Q60 70 65 70 Q75 70 70 60 Q65 50 50 50 Z"
            fill={`url(#tailwindGrad-${uid.current})`}
            fillOpacity="0.7"
          />
        </svg>
      ),
      api: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="apiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <rect
            x="25"
            y="30"
            width="15"
            height="40"
            rx="3"
            fill="url(#apiGrad)"
          />
          <rect
            x="45"
            y="20"
            width="15"
            height="60"
            rx="3"
            fill="url(#apiGrad)"
            fillOpacity="0.8"
          />
          <rect
            x="65"
            y="35"
            width="15"
            height="35"
            rx="3"
            fill="url(#apiGrad)"
            fillOpacity="0.6"
          />
        </svg>
      ),
      ui: (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="uiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: skill.color, stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: skill.color, stopOpacity: 0.6 }}
              />
            </linearGradient>
          </defs>
          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="8"
            fill="url(#uiGrad)"
          />
          <rect
            x="30"
            y="30"
            width="40"
            height="8"
            rx="2"
            fill="white"
            fillOpacity="0.9"
          />
          <rect
            x="30"
            y="45"
            width="30"
            height="6"
            rx="2"
            fill="white"
            fillOpacity="0.7"
          />
          <circle cx="35" cy="65" r="4" fill="white" fillOpacity="0.8" />
          <circle cx="50" cy="65" r="4" fill="white" fillOpacity="0.6" />
        </svg>
      ),
    };

    return icons[iconName] || icons.html;
  };

  return (
    <div
      ref={cardRef}
      className="glass-card rounded-xl cursor-pointer p-4 flex flex-col items-center justify-center gap-3 min-w-[120px] group opacity-0 animate-stagger-in relative overflow-hidden transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/30"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Animated background layer */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-transparent transition-all duration-500" />

      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>

      {/* Icon container with animated background */}
      <div className="relative w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
        <div className="absolute inset-0 bg-primary/10 rounded-xl transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110" />
        <div className="relative z-10 scale-75 transition-transform duration-500 group-hover:scale-90">
          {getSkillIcon(skill.icon)}
        </div>
      </div>

      {/* Skill name */}
      <h3 className="text-sm font-display font-semibold text-foreground relative z-10 transition-colors duration-300 group-hover:text-primary">
        {skill.name}
      </h3>
    </div>
  );
};

export default SkillCard;
