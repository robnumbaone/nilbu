export default function Logo({ size = 28, className }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: size,
        letterSpacing: '-0.055em',
        lineHeight: 1,
        color: 'var(--paper)',
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      nilbu<span style={{ color: 'var(--accent)', marginLeft: '-0.02em' }}>.</span>
    </span>
  )
}
