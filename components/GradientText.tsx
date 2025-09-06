"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  animationSpeed?: number; // seconds
  colors?: string[];
}

const defaultColors = [
  "black",
  "#ff9800",
  "#ffd580",
  "#ff9800",
  "black"
];

const GradientText = ({
  children,
  className,
  animationSpeed = 3,
  colors = defaultColors,
}: GradientTextProps) => {
  // Inject keyframes only once
  useEffect(() => {
    const styleId = "gradient-text-keyframes";
    if (typeof window !== "undefined" && !document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        @keyframes improved-gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <span
      className={cn(
        "text-transparent bg-clip-text",
        className
      )}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 50%",
        animation: `improved-gradient-move ${animationSpeed}s ease-in-out infinite`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
