"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type WorkspaceCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function WorkspaceCard({
  title,
  description,
  children,
}: WorkspaceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="flex w-44 flex-col items-center rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl"
    >
      {children}

      <h3 className="mt-4 font-semibold">{title}</h3>

      <p className="mt-2 text-center text-sm text-slate-500">
        {description}
      </p>
    </motion.div>
  );
}