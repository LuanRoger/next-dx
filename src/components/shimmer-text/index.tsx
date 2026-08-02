"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant =
  | "default"
  | "secondary"
  | "destructive"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "orange"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "emerald"
  | "sky"
  | "slate"
  | "fuchsia";

type ShimmerTextProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  spread?: number;
  variant?: Variant;
};

const variantMap: Record<Variant, string> = {
  amber: "text-amber-600 dark:text-amber-400",
  blue: "text-blue-600 dark:text-blue-400",
  cyan: "text-cyan-600 dark:text-cyan-400",
  default: "",
  destructive: "text-destructive dark:text-destructive-foreground",
  emerald: "text-emerald-600 dark:text-emerald-400",
  fuchsia: "text-fuchsia-600 dark:text-fuchsia-400",
  green: "text-green-600 dark:text-green-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
  lime: "text-lime-600 dark:text-lime-400",
  orange: "text-orange-600 dark:text-orange-400",
  pink: "text-pink-600 dark:text-pink-400",
  purple: "text-purple-600 dark:text-purple-400",
  red: "text-red-600 dark:text-red-400",
  rose: "text-rose-600 dark:text-rose-400",
  secondary: "text-secondary-foreground",
  sky: "text-sky-600 dark:text-sky-400",
  slate: "text-slate-600 dark:text-slate-400",
  violet: "text-violet-600 dark:text-violet-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
};

export default function ShimmerText({
  children,
  className,
  variant = "default",
  duration = 1.5,
  delay = 1.5,
}: ShimmerTextProps) {
  return (
    <div className="group overflow-hidden">
      <div>
        <motion.div
          animate={{
            backgroundPositionX: ["-100%", "250%"],
          }}
          className={cn(
            "inline-block [--shimmer-contrast:rgba(255,255,255,0.6)] dark:[--shimmer-contrast:rgba(0,0,0,0.5)]",
            variantMap[variant],
            className
          )}
          initial={{
            backgroundPositionX: "250%",
          }}
          style={
            {
              background:
                "currentColor linear-gradient(to right, currentColor 0%, var(--shimmer-contrast) 40%, var(--shimmer-contrast) 60%, currentColor 100%)",
              backgroundClip: "text",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            } as React.CSSProperties
          }
          transition={{
            delay,
            duration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 1.5,
          }}
        >
          <span>{children}</span>
        </motion.div>
      </div>
    </div>
  );
}
