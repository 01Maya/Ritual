const INK = "#101A4A";

export default function Bottle({ color = "#3346FF", shape = "bottle", className = "" }) {
  const label = (x, y, w, h, rx) => (
    <>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={color} />
      <circle cx={x + w / 2} cy={y + 28} r="10" fill="#FFCB2E" />
      <rect x={x + 18} y={y + h - 46} width={w - 36} height="6" rx="3" fill="#fff" fillOpacity=".9" />
      <rect x={x + 28} y={y + h - 32} width={w - 56} height="6" rx="3" fill="#fff" fillOpacity=".55" />
    </>
  );

  return (
    <svg viewBox="0 0 160 240" className={className} aria-hidden="true">
      {shape === "bottle" && (
        <>
          <rect x="46" y="6" width="68" height="36" rx="10" fill={INK} />
          <rect x="54" y="40" width="52" height="14" rx="4" fill="#fff" fillOpacity=".7" />
          <rect x="18" y="50" width="124" height="184" rx="38" fill="#fff" fillOpacity=".78" stroke={INK} strokeOpacity=".12" />
          {label(30, 96, 100, 104, 18)}
          <path d="M30 70C28 120 28 170 34 214" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" fill="none" />
        </>
      )}
      {shape === "jar" && (
        <>
          <rect x="14" y="12" width="132" height="40" rx="12" fill={INK} />
          <rect x="10" y="46" width="140" height="188" rx="34" fill="#fff" fillOpacity=".78" stroke={INK} strokeOpacity=".12" />
          {label(24, 86, 112, 112, 18)}
          <path d="M24 66C20 120 20 170 28 214" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" fill="none" />
        </>
      )}
      {shape === "glass" && (
        <>
          <path d="M30 40H130L118 224Q117 232 108 232H52Q43 232 42 224Z" fill="#fff" fillOpacity=".78" stroke={INK} strokeOpacity=".12" />
          <path d="M33.3 90H126.7L118 224Q117 232 108 232H52Q43 232 42 224Z" fill={color} />
          <ellipse cx="80" cy="90" rx="46.7" ry="5" fill="#fff" fillOpacity=".35" />
          <path d="M44 56L50 214" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" fill="none" />
        </>
      )}
    </svg>
  );
}
