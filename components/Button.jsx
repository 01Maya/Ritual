const styles = {
  sun: "bg-sun text-ink hover:bg-white",
  ink: "bg-ink text-white hover:bg-ultra",
  white: "bg-white text-ink hover:bg-sun",
  ghost: "text-white ring-1 ring-white/40 hover:bg-white hover:text-ink",
  outline: "text-ink ring-1 ring-ink/25 hover:bg-ink hover:text-white",
};

export default function Button({ href = "#", variant = "ink", className = "", children, ...rest }) {
  return (
    <a
      href={href}
      className={`motion-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors duration-300 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
