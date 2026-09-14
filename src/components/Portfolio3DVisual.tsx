import type { ReactNode } from "react";

type VisualKind = "hero" | "about" | "design" | "development" | "business" | "ux" | "project" | "process";

const palettes: Record<VisualKind, [string, string, string]> = {
  hero: ["#7c3aed", "#06b6d4", "#f8fafc"],
  about: ["#0ea5e9", "#8b5cf6", "#f8fafc"],
  design: ["#ec4899", "#8b5cf6", "#f8fafc"],
  development: ["#06b6d4", "#2563eb", "#f8fafc"],
  business: ["#14b8a6", "#3b82f6", "#f8fafc"],
  ux: ["#f59e0b", "#ec4899", "#f8fafc"],
  project: ["#6366f1", "#06b6d4", "#f8fafc"],
  process: ["#8b5cf6", "#14b8a6", "#f8fafc"],
};

function GlassCard({ x, y, w, h, accent, children }: { x: number; y: number; w: number; h: number; accent: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x + 10} y={y + 14} width={w} height={h} rx="18" fill="#020617" opacity=".45" />
      <rect x={x} y={y} width={w} height={h} rx="18" fill="#0f172a" stroke={accent} strokeOpacity=".55" />
      {children}
    </g>
  );
}

export function Portfolio3DVisual({ kind, className = "" }: { kind: VisualKind; className?: string }) {
  const [a, b, light] = palettes[kind];
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#050816] ${className}`} aria-hidden="true">
      <div className="absolute -left-16 -top-16 size-48 rounded-full blur-3xl opacity-30" style={{ background: a }} />
      <div className="absolute -bottom-20 -right-10 size-56 rounded-full blur-3xl opacity-25" style={{ background: b }} />
      <svg viewBox="0 0 640 460" className="relative block h-full w-full" role="img">
        <defs>
          <linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
          <filter id={`shadow-${kind}`} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#000" floodOpacity=".55" />
          </filter>
        </defs>
        <ellipse cx="320" cy="398" rx="230" ry="28" fill="#000" opacity=".5" />

        {kind === "hero" && (
          <g filter={`url(#shadow-${kind})`}>
            <rect x="126" y="82" width="388" height="250" rx="26" fill="#111827" stroke={a} strokeOpacity=".65" />
            <rect x="148" y="106" width="344" height="190" rx="14" fill="#020617" />
            <circle cx="172" cy="128" r="5" fill={a} /><circle cx="188" cy="128" r="5" fill={b} />
            <rect x="178" y="166" width="142" height="13" rx="6" fill={light} opacity=".9" />
            <rect x="178" y="190" width="196" height="8" rx="4" fill="#64748b" />
            <rect x="178" y="211" width="164" height="8" rx="4" fill="#475569" />
            <rect x="178" y="242" width="90" height="30" rx="15" fill={`url(#g-${kind})`} />
            <circle cx="438" cy="205" r="52" fill={`url(#g-${kind})`} opacity=".9" />
            <path d="M280 338 360 350 330 382 250 370Z" fill="#1e293b" stroke={b} strokeOpacity=".6" />
          </g>
        )}

        {kind === "about" && (
          <g filter={`url(#shadow-${kind})`}>
            <rect x="170" y="92" width="300" height="205" rx="24" fill="#0f172a" stroke={b} strokeOpacity=".6" />
            <rect x="194" y="118" width="252" height="150" rx="14" fill="#020617" />
            <circle cx="320" cy="166" r="34" fill={`url(#g-${kind})`} />
            <rect x="260" y="216" width="120" height="9" rx="4" fill={light} opacity=".8" />
            <rect x="280" y="235" width="80" height="7" rx="3" fill="#64748b" />
            <path d="M205 315 435 315 468 350 172 350Z" fill="#1e293b" stroke={a} strokeOpacity=".45" />
            <rect x="268" y="350" width="104" height="14" rx="7" fill="#334155" />
          </g>
        )}

        {kind === "design" && (
          <g filter={`url(#shadow-${kind})`}>
            <GlassCard x={106} y={88} w={270} h={220} accent={a}>
              <rect x="130" y="116" width="222" height="20" rx="8" fill={light} opacity=".9" />
              <rect x="130" y="158" width="100" height="100" rx="12" fill={`url(#g-${kind})`} />
              <rect x="246" y="158" width="106" height="14" rx="6" fill="#64748b" />
              <rect x="246" y="184" width="84" height="10" rx="5" fill="#475569" />
              <rect x="246" y="208" width="96" height="10" rx="5" fill="#475569" />
            </GlassCard>
            <path d="M390 160 496 102 548 194 442 252Z" fill={`url(#g-${kind})`} opacity=".9" />
            <circle cx="455" cy="164" r="22" fill="#fff" opacity=".9" />
            <path d="M414 292 500 244 540 314 454 362Z" fill="#1e293b" stroke={b} strokeOpacity=".65" />
          </g>
        )}

        {kind === "development" && (
          <g filter={`url(#shadow-${kind})`}>
            <rect x="116" y="86" width="408" height="248" rx="24" fill="#0f172a" stroke={b} strokeOpacity=".65" />
            <rect x="140" y="112" width="360" height="198" rx="14" fill="#020617" />
            <rect x="164" y="142" width="130" height="9" rx="4" fill={a} />
            <rect x="164" y="170" width="218" height="8" rx="4" fill="#475569" />
            <rect x="164" y="195" width="178" height="8" rx="4" fill="#64748b" />
            <rect x="164" y="220" width="242" height="8" rx="4" fill="#334155" />
            <circle cx="450" cy="205" r="36" fill={`url(#g-${kind})`} opacity=".9" />
            <path d="M248 348 392 348 416 370 224 370Z" fill="#1e293b" stroke={b} strokeOpacity=".6" />
          </g>
        )}

        {kind === "business" && (
          <g filter={`url(#shadow-${kind})`}>
            <path d="M130 150 320 76 510 150 320 224Z" fill={`url(#g-${kind})`} opacity=".92" />
            <path d="M130 150 320 224 320 342 130 268Z" fill="#0f172a" stroke={a} strokeOpacity=".5" />
            <path d="M320 224 510 150 510 268 320 342Z" fill="#111827" stroke={b} strokeOpacity=".5" />
            <rect x="204" y="190" width="76" height="55" rx="8" fill="#e2e8f0" opacity=".9" />
            <rect x="356" y="194" width="84" height="11" rx="5" fill={light} opacity=".8" />
            <rect x="356" y="218" width="60" height="8" rx="4" fill="#64748b" />
            <circle cx="320" cy="126" r="30" fill="#fff" opacity=".9" />
          </g>
        )}

        {kind === "ux" && (
          <g filter={`url(#shadow-${kind})`}>
            <GlassCard x={112} y={90} w={416} h={240} accent={a}>
              <rect x="138" y="120" width="118" height="176" rx="12" fill="#111827" />
              <circle cx="197" cy="155" r="26" fill={`url(#g-${kind})`} />
              <rect x="160" y="202" width="74" height="9" rx="4" fill={light} opacity=".8" />
              <rect x="160" y="224" width="58" height="8" rx="4" fill="#64748b" />
              <rect x="278" y="122" width="220" height="16" rx="7" fill="#e2e8f0" opacity=".8" />
              <rect x="278" y="160" width="180" height="12" rx="6" fill="#475569" />
              <rect x="278" y="190" width="200" height="12" rx="6" fill="#334155" />
              <rect x="278" y="228" width="118" height="38" rx="19" fill={`url(#g-${kind})`} />
            </GlassCard>
          </g>
        )}

        {kind === "project" && (
          <g filter={`url(#shadow-${kind})`}>
            <GlassCard x={104} y={82} w={432} h={246} accent={a}>
              <rect x="130" y="114" width="380" height="18" rx="8" fill="#e2e8f0" opacity=".85" />
              <rect x="130" y="154" width="168" height="132" rx="12" fill={`url(#g-${kind})`} />
              <rect x="320" y="154" width="190" height="12" rx="6" fill="#64748b" />
              <rect x="320" y="181" width="150" height="10" rx="5" fill="#475569" />
              <rect x="320" y="208" width="170" height="10" rx="5" fill="#334155" />
              <rect x="320" y="242" width="94" height="30" rx="15" fill="#f8fafc" opacity=".9" />
            </GlassCard>
          </g>
        )}

        {kind === "process" && (
          <g filter={`url(#shadow-${kind})`}>
            {Array.from({ length: 6 }).map((_, i) => {
              const x = 105 + i * 86;
              const y = 230 + Math.sin(i * 1.1) * 65;
              return <g key={i}><circle cx={x} cy={y} r="22" fill="#0f172a" stroke={i % 2 ? b : a} strokeWidth="3" /><circle cx={x} cy={y} r="9" fill={i % 2 ? b : a} />{i < 5 && <path d={`M${x + 22} ${y} L${x + 64} ${230 + Math.sin((i + 1) * 1.1) * 65}`} stroke="#64748b" strokeWidth="4" strokeDasharray="7 8" />}</g>;
            })}
            <rect x="190" y="96" width="260" height="48" rx="24" fill="#0f172a" stroke={a} strokeOpacity=".5" />
            <rect x="232" y="114" width="176" height="10" rx="5" fill={light} opacity=".75" />
          </g>
        )}
      </svg>
    </div>
  );
}
