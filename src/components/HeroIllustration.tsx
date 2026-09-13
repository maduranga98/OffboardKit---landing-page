/**
 * Decorative hero backdrop — abstract flat-shape illustration in the
 * Talentech-style "clean, soft, geometric" spirit, built entirely from
 * brand tokens. No per-shape gradients; the only softness comes from a
 * blurred wash behind the vector shapes, matching how .hero-glow already
 * works elsewhere on the page.
 */
export function HeroIllustration() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Soft color wash — same technique as .hero-glow, kept subtle */}
      <div
        className="absolute hero-glow"
        style={{ top: "6%", right: "-6%", width: 620, height: 620, opacity: 0.4 }}
      />
      <div
        className="absolute hero-glow"
        style={{ bottom: "-4%", left: "38%", width: 380, height: 320, opacity: 0.18 }}
      />

      {/* Flat vector shapes — no gradients, brand colors only */}
      <svg
        className="absolute"
        style={{ top: "-4%", right: "-6%", width: "62%", maxWidth: 760 }}
        viewBox="0 0 760 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Large tilted card frame */}
        <rect
          x="120"
          y="60"
          width="520"
          height="360"
          rx="32"
          transform="rotate(-4 380 240)"
          fill="#0D9E8A"
          fillOpacity="0.06"
          stroke="#12C4AD"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />

        {/* Smaller offset card, opposite tilt */}
        <rect
          x="260"
          y="180"
          width="360"
          height="240"
          rx="24"
          transform="rotate(3 440 300)"
          fill="#1E3A5F"
          fillOpacity="0.35"
          stroke="#F5F0E8"
          strokeOpacity="0.06"
          strokeWidth="1.5"
        />

        {/* Handoff path — dotted journey line with checkpoint nodes */}
        <path
          d="M90 560 C 220 480, 300 380, 420 340 S 620 260, 700 140"
          stroke="#12C4AD"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="1 10"
          strokeLinecap="round"
        />
        {/* Completed node */}
        <circle cx="220" cy="480" r="9" fill="#0D9E8A" />
        <path
          d="M216 480l3 3 6-7"
          stroke="#0F1C2E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Completed node */}
        <circle cx="420" cy="340" r="9" fill="#0D9E8A" />
        <path
          d="M416 340l3 3 6-7"
          stroke="#0F1C2E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pending node */}
        <circle
          cx="620"
          cy="200"
          r="9"
          fill="none"
          stroke="#F5F0E8"
          strokeOpacity="0.3"
          strokeWidth="2"
        />

        {/* Small floating accent squares */}
        <rect
          x="70"
          y="120"
          width="34"
          height="34"
          rx="9"
          fill="#0D9E8A"
          fillOpacity="0.12"
        />
        <rect
          x="560"
          y="480"
          width="26"
          height="26"
          rx="7"
          fill="#12C4AD"
          fillOpacity="0.16"
        />

        {/* Single ember accent — the "last day" marker */}
        <circle cx="690" cy="150" r="5" fill="#FF6B47" fillOpacity="0.7" />

        {/* Thin connecting lines between the two card frames */}
        <line
          x1="180"
          y1="200"
          x2="140"
          y2="140"
          stroke="#F5F0E8"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
        <line
          x1="580"
          y1="360"
          x2="630"
          y2="420"
          stroke="#F5F0E8"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
