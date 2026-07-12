/**
 * Generated flat-illustration "photos" for portfolio cards.
 * Swap for real photography later: drop a file in /public/works and render
 * <img> instead — the card markup stays the same.
 */
export default function WorkImage({ scene }: { scene: string }) {
  const common = {
    viewBox: '0 0 400 300',
    preserveAspectRatio: 'xMidYMid slice',
    style: { width: '100%', height: '100%', display: 'block' },
    'aria-hidden': true as const,
  };
  const id = scene;

  return (
    <svg {...common}>
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9f0f6" />
          <stop offset="1" stopColor="#fbe7d1" />
        </linearGradient>
        <radialGradient id={`sun-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a3" />
          <stop offset="0.5" stopColor="#f9a866" />
          <stop offset="1" stopColor="#f9a866" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`roof-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fb923c" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>

      {scene === 'interior' ? (
        <>
          <rect width="400" height="300" fill="#f3e7d8" />
          <rect x="0" y="0" width="400" height="196" fill="#efe2d1" />
          <rect x="0" y="196" width="400" height="104" fill="#d9c7b0" />
          <rect x="238" y="46" width="120" height="118" rx="4" fill="#cdd9e4" />
          <rect x="238" y="46" width="120" height="118" rx="4" fill="none" stroke="#b7a68f" strokeWidth="5" />
          <line x1="298" y1="46" x2="298" y2="164" stroke="#b7a68f" strokeWidth="4" />
          <line x1="238" y1="105" x2="358" y2="105" stroke="#b7a68f" strokeWidth="4" />
          <circle cx="118" cy="60" r="34" fill={`url(#sun-${id})`} opacity="0.7" />
          <rect x="40" y="150" width="150" height="46" rx="10" fill="#f0b27a" />
          <rect x="40" y="130" width="150" height="34" rx="10" fill="#f6c79a" />
          <rect x="46" y="196" width="12" height="24" fill="#a98a63" />
          <rect x="172" y="196" width="12" height="24" fill="#a98a63" />
          <rect x="300" y="120" width="8" height="76" fill="#b59a75" />
          <path d="M285 120h38l-8 22h-22z" fill="#f97316" />
          <rect x="0" y="196" width="400" height="6" fill="#c9b494" />
        </>
      ) : scene === 'facade' ? (
        <>
          <rect width="400" height="300" fill={`url(#sky-${id})`} />
          <circle cx="330" cy="66" r="60" fill={`url(#sun-${id})`} />
          <rect x="70" y="40" width="220" height="230" fill="#efe6d9" />
          <rect x="70" y="40" width="120" height="230" fill="#e2d4c0" />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2].map((c) => (
              <rect key={`${r}-${c}`} x={90 + c * 62} y={62 + r * 54} width="40" height="34" rx="3" fill="#a9c4da" stroke="#cbbf9d" />
            ))
          )}
          <g stroke="#6b7280" strokeWidth="3">
            <line x1="60" y1="70" x2="300" y2="70" />
            <line x1="60" y1="150" x2="300" y2="150" />
            <line x1="60" y1="230" x2="300" y2="230" />
            <line x1="78" y1="40" x2="78" y2="270" />
            <line x1="290" y1="40" x2="290" y2="270" />
            <line x1="184" y1="40" x2="184" y2="270" />
          </g>
          <rect x="0" y="270" width="400" height="30" fill="#e5d9ca" />
        </>
      ) : scene === 'roof' ? (
        <>
          <rect width="400" height="300" fill={`url(#sky-${id})`} />
          <circle cx="70" cy="60" r="52" fill={`url(#sun-${id})`} />
          <path d="M-10 210 200 70 410 210z" fill={`url(#roof-${id})`} />
          <g stroke="#9a3412" strokeWidth="3" opacity="0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={-10 + i * 20} y1={210 - i * 6} x2={200} y2={70} />
            ))}
            <line x1="40" y1="196" x2="360" y2="196" />
            <line x1="70" y1="174" x2="330" y2="174" />
            <line x1="100" y1="152" x2="300" y2="152" />
            <line x1="130" y1="130" x2="270" y2="130" />
          </g>
          <rect x="250" y="96" width="34" height="60" fill="#8a4a12" />
          <rect x="244" y="90" width="46" height="12" fill="#6b3810" />
          <rect x="-10" y="210" width="420" height="90" fill="#e5d9ca" />
        </>
      ) : scene === 'mansard' ? (
        <>
          <rect width="400" height="300" fill={`url(#sky-${id})`} />
          <circle cx="330" cy="60" r="56" fill={`url(#sun-${id})`} />
          <path d="M60 150 200 70 340 150z" fill={`url(#roof-${id})`} />
          <rect x="80" y="150" width="240" height="90" fill="#efe6d9" />
          <path d="M175 150 200 118 225 150z" fill="#8a4a12" />
          <rect x="184" y="132" width="32" height="18" fill="#a9c4da" stroke="#8a4a12" strokeWidth="3" />
          <rect x="110" y="176" width="46" height="40" rx="3" fill="#a9c4da" stroke="#cbbf9d" />
          <rect x="244" y="176" width="46" height="40" rx="3" fill="#a9c4da" />
          <rect x="60" y="240" width="280" height="6" fill="#c9b494" />
          <rect x="0" y="246" width="400" height="54" fill="#e5d9ca" />
        </>
      ) : scene === 'septic' ? (
        <>
          <rect width="400" height="300" fill={`url(#sky-${id})`} />
          <circle cx="70" cy="54" r="46" fill={`url(#sun-${id})`} />
          <rect x="0" y="120" width="400" height="30" fill="#8fae6a" />
          <rect x="0" y="150" width="400" height="60" fill="#cbb28c" />
          <rect x="0" y="210" width="400" height="90" fill="#a98f68" />
          <rect x="200" y="150" width="150" height="120" rx="16" fill="#e5e9ef" stroke="#b9c0cb" strokeWidth="4" />
          <ellipse cx="275" cy="150" rx="75" ry="12" fill="#eef1f5" stroke="#b9c0cb" strokeWidth="4" />
          <rect x="262" y="132" width="26" height="22" rx="3" fill="#f97316" />
          <path d="M40 150v-18h120" fill="none" stroke="#5b6472" strokeWidth="10" strokeLinecap="round" />
          <rect x="150" y="176" width="60" height="16" rx="4" fill="#5b6472" />
        </>
      ) : (
        // default 'house' — private house under construction
        <>
          <rect width="400" height="300" fill={`url(#sky-${id})`} />
          <circle cx="320" cy="64" r="62" fill={`url(#sun-${id})`} />
          <rect x="90" y="150" width="170" height="120" fill="#efe6d9" />
          <rect x="90" y="150" width="80" height="120" fill="#e2d4c0" />
          <path d="M78 152 175 92 272 152z" fill={`url(#roof-${id})`} />
          <rect x="112" y="176" width="42" height="42" rx="3" fill="#a9c4da" stroke="#cbbf9d" strokeWidth="3" />
          <rect x="196" y="176" width="42" height="42" rx="3" fill="#a9c4da" stroke="#cbbf9d" strokeWidth="3" />
          <rect x="150" y="228" width="36" height="42" fill="#8a4a12" />
          {/* tower crane */}
          <g stroke="#f59e0b" strokeWidth="6" fill="none">
            <line x1="300" y1="270" x2="300" y2="70" />
            <line x1="300" y1="70" x2="360" y2="70" />
            <line x1="300" y1="70" x2="255" y2="105" />
          </g>
          <line x1="345" y1="70" x2="345" y2="110" stroke="#6b7280" strokeWidth="3" />
          <rect x="337" y="110" width="16" height="10" fill="#f97316" />
          <rect x="0" y="270" width="400" height="30" fill="#e5d9ca" />
        </>
      )}
    </svg>
  );
}
