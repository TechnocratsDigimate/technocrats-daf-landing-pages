"use client";

import dynamic from "next/dynamic";

export const AuditShortFormClient = dynamic(
  () => import("./AuditShortForm").then((m) => ({ default: m.AuditShortForm })),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse" />
    ),
  }
);
