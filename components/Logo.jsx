export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[22px] font-bold tracking-[-0.04em] ${className}`}>
      <svg width="30" height="18" viewBox="0 0 30 18" aria-hidden="true" style={{ transform: "rotate(-28deg)" }}>
        <path d="M15 1H9a8 8 0 0 0 0 16h6z" fill="#FFCB2E" />
        <path d="M15 1h6a8 8 0 0 1 0 16h-6z" fill="#3346FF" />
      </svg>
      Ritual
    </span>
  );
}
