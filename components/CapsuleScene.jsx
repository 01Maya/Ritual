"use client";
import { useEffect, useId, useMemo } from "react";
import {
  motion,
  animate,
  easeInOut,
  easeOut,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/* [name, highlight, shade] */
const BEAD_COLORS = [
  ["sun", "#FFE49A", "#F2A900"],
  ["white", "#FFFFFF", "#C4CCF7"],
  ["coral", "#FFBBA6", "#E8613D"],
  ["mint", "#BDF5DA", "#2FB584"],
  ["ink", "#7381E8", "#101A4A"],
  ["lilac", "#E0D7FF", "#8D77F0"],
];

function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* Capsule: x 140..860, y 250..450 inside viewBox "0 120 1000 560". Beads start inside, end in a pile below. */
function makeBeads(count) {
  const rand = seeded(7);
  const out = [];
  for (let i = 0; i < count; i++) {
    const r = 9 + rand() * 9;
    const maxDy = 100 - r - 8;
    const sx = 262 + rand() * 476;
    const sy = 350 + (rand() * 2 - 1) * maxDy;
    const ex = 500 + (rand() * 2 - 1) * 390;
    const lift = (1 - Math.abs(ex - 500) / 390) * rand() * 120;
    const ey = 650 - r - lift - rand() * 14;
    out.push({
      r: +r.toFixed(1),
      sx: +sx.toFixed(1),
      sy: +sy.toFixed(1),
      ex: +ex.toFixed(1),
      ey: +ey.toFixed(1),
      d: +(rand() * 0.2).toFixed(3),
      c: Math.floor(rand() * BEAD_COLORS.length),
    });
  }
  return out;
}

function Bead({ b, progress, uid }) {
  const t = useTransform(progress, [0.28 + b.d, 0.62 + b.d], [0, 1], { ease: easeOut });
  const x = useTransform(t, [0, 1], [0, b.ex - b.sx]);
  const y = useTransform(t, [0, 1], [0, b.ey - b.sy]);
  return <motion.circle cx={b.sx} cy={b.sy} r={b.r} fill={`url(#${uid}-${BEAD_COLORS[b.c][0]})`} style={{ x, y }} />;
}

const LEFT = "M500 250H240A100 100 0 0 0 240 450H500Z";
const RIGHT = "M500 250H760A100 100 0 0 1 760 450H500Z";

/**
 * progress: MotionValue 0..1. 0 = closed, ~0.5 = halves apart, ~0.85 = beads settled.
 * intro: play an assemble animation on mount (hero only).
 */
export default function CapsuleScene({ progress, intro = false, beadCount = 44, className = "" }) {
  const uid = "cap" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const reduce = useReducedMotion();
  const introV = useMotionValue(intro ? 0 : 1);

  useEffect(() => {
    if (!intro) return;
    if (reduce) {
      introV.set(1);
      return;
    }
    const controls = animate(introV, 1, { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 });
    return () => controls.stop();
  }, [intro, reduce, introV]);

  const beads = useMemo(() => makeBeads(beadCount), [beadCount]);

  const lxS = useTransform(progress, [0.1, 0.5], [0, -300], { ease: easeInOut });
  const rxS = useTransform(progress, [0.1, 0.5], [0, 300], { ease: easeInOut });
  const lx = useTransform([lxS, introV], ([a, i]) => a - (1 - i) * 340);
  const rx = useTransform([rxS, introV], ([a, i]) => a + (1 - i) * 340);
  const lr = useTransform(progress, [0.1, 0.5], [0, -4]);
  const rr = useTransform(progress, [0.1, 0.5], [0, 5]);

  return (
    <svg
      viewBox="0 120 1000 560"
      className={`h-auto w-full overflow-visible ${className}`}
      role="img"
      aria-label="A clear capsule opening to release colorful beads"
    >
      <defs>
        {BEAD_COLORS.map(([name, hi, lo]) => (
          <radialGradient key={name} id={`${uid}-${name}`} cx=".35" cy=".3" r=".85">
            <stop offset="0" stopColor="#fff" stopOpacity=".95" />
            <stop offset=".3" stopColor={hi} />
            <stop offset="1" stopColor={lo} />
          </radialGradient>
        ))}
        <linearGradient id={`${uid}-lf`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF1B0" stopOpacity=".95" />
          <stop offset=".25" stopColor="#FFD34D" stopOpacity=".5" />
          <stop offset=".7" stopColor="#FFC21A" stopOpacity=".3" />
          <stop offset="1" stopColor="#F29E00" stopOpacity=".85" />
        </linearGradient>
        <linearGradient id={`${uid}-rf`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".85" />
          <stop offset=".25" stopColor="#DDE3FF" stopOpacity=".35" />
          <stop offset=".7" stopColor="#B9C4FF" stopOpacity=".2" />
          <stop offset="1" stopColor="#8FA0FF" stopOpacity=".6" />
        </linearGradient>
      </defs>

      {/* back walls */}
      <motion.g style={{ x: lx, rotate: lr }}>
        <path d={LEFT} fill="#FFC21A" fillOpacity=".28" />
      </motion.g>
      <motion.g style={{ x: rx, rotate: rr }}>
        <path d={RIGHT} fill="#FFFFFF" fillOpacity=".16" />
      </motion.g>

      {/* beads */}
      <motion.g style={{ opacity: introV }}>
        {beads.map((b, i) => (
          <Bead key={i} b={b} progress={progress} uid={uid} />
        ))}
      </motion.g>

      {/* front glass */}
      <motion.g style={{ x: lx, rotate: lr }}>
        <path d={LEFT} fill={`url(#${uid}-lf)`} stroke="#fff" strokeOpacity=".6" strokeWidth="3" />
        <path d="M262 276H470" stroke="#fff" strokeOpacity=".85" strokeWidth="9" strokeLinecap="round" />
        <path d="M262 426H440" stroke="#fff" strokeOpacity=".3" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
      <motion.g style={{ x: rx, rotate: rr }}>
        <path d={RIGHT} fill={`url(#${uid}-rf)`} stroke="#fff" strokeOpacity=".6" strokeWidth="3" />
        <path d="M530 276H738" stroke="#fff" strokeOpacity=".85" strokeWidth="9" strokeLinecap="round" />
        <path d="M560 426H738" stroke="#fff" strokeOpacity=".3" strokeWidth="5" strokeLinecap="round" />
        <path d="M500 250V450" stroke="#101A4A" strokeOpacity=".18" strokeWidth="2" />
      </motion.g>
    </svg>
  );
}
