import { Link } from "react-router-dom";

const disciplines = [
  "Physics",
  "Mathematics",
  "Geoscience",
  "Engineering",
  "Data Science",
  "Programming",
  "Research",
  "Education",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* ============================================================
          DHD NEXUS HERO
          ============================================================ */}
      <section className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/5 blur-3xl" />
          <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* --------------------------------------------------------
              HERO TEXT
              -------------------------------------------------------- */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              A multidisciplinary knowledge ecosystem
            </p>

            <h1 className="max-w-3xl text-6xl font-bold leading-[0.95] tracking-tight text-cyan-400 sm:text-7xl lg:text-8xl">
              DHD
              <br />
              Nexus
            </h1>

            <p className="mt-8 max-w-2xl text-2xl font-medium leading-relaxed text-slate-200 sm:text-3xl">
              Where disciplines converge, ideas connect, and knowledge becomes
              one body.
            </p>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              DHD Nexus is my evolving space for learning, teaching, research,
              experimentation, and building. Physics, mathematics, geoscience,
              engineering, data science, programming, and education meet here as
              connected parts of one intellectual journey.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/physics-academy"
                className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Enter Physics Academy
              </Link>

              <a
                href="#about"
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                About the Nexus
              </a>
            </div>
          </div>

          {/* ========================================================
              DYNAMIC NEXUS VISUALIZATION
              ======================================================== */}
          <div
            id="nexus"
            className="relative mx-auto aspect-square w-full max-w-[600px]"
          >
            <style>{`
              @keyframes nexus-orbit-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }

              @keyframes nexus-orbit-medium {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
              }

              @keyframes nexus-orbit-fast {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }

              @keyframes nexus-counter-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }

              @keyframes nexus-counter-medium {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }

              @keyframes nexus-counter-fast {
                from { transform: rotate(0deg); }
                to { transform: rotate(-360deg); }
              }

              @keyframes nexus-pulse {
                0%, 100% {
                  transform: scale(0.96);
                  opacity: 0.75;
                }
                50% {
                  transform: scale(1.04);
                  opacity: 1;
                }
              }

              @keyframes nexus-ring-pulse {
                0%, 100% {
                  opacity: 0.25;
                  transform: scale(0.94);
                }
                50% {
                  opacity: 0.6;
                  transform: scale(1.04);
                }
              }

              @keyframes nexus-flow {
                0% {
                  stroke-dashoffset: 180;
                  opacity: 0.05;
                }
                20% {
                  opacity: 0.8;
                }
                70% {
                  opacity: 0.45;
                }
                100% {
                  stroke-dashoffset: 0;
                  opacity: 0.05;
                }
              }

              .nexus-orbit-slow {
                transform-origin: 300px 300px;
                animation: nexus-orbit-slow 42s linear infinite;
              }

              .nexus-orbit-medium {
                transform-origin: 300px 300px;
                animation: nexus-orbit-medium 34s linear infinite;
              }

              .nexus-orbit-fast {
                transform-origin: 300px 300px;
                animation: nexus-orbit-fast 28s linear infinite;
              }

              .nexus-counter-slow {
                transform-origin: center;
                animation: nexus-counter-slow 42s linear infinite;
              }

              .nexus-counter-medium {
                transform-origin: center;
                animation: nexus-counter-medium 34s linear infinite;
              }

              .nexus-counter-fast {
                transform-origin: center;
                animation: nexus-counter-fast 28s linear infinite;
              }

              .nexus-core {
                transform-origin: center;
                animation: nexus-pulse 5s ease-in-out infinite;
              }

              .nexus-ring {
                transform-origin: center;
                animation: nexus-ring-pulse 6s ease-in-out infinite;
              }

              .nexus-flow {
                stroke-dasharray: 14 20 4 24;
                animation: nexus-flow 5s linear infinite;
              }

              .nexus-flow-2 {
                animation-delay: -1.7s;
              }

              .nexus-flow-3 {
                animation-delay: -3.1s;
              }

              @media (prefers-reduced-motion: reduce) {
                .nexus-orbit-slow,
                .nexus-orbit-medium,
                .nexus-orbit-fast,
                .nexus-counter-slow,
                .nexus-counter-medium,
                .nexus-counter-fast,
                .nexus-core,
                .nexus-ring,
                .nexus-flow,
                .nexus-flow-2,
                .nexus-flow-3 {
                  animation: none !important;
                }
              }
            `}</style>

            <svg
              viewBox="0 0 600 600"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="DHD Nexus showing different disciplines orbiting and flowing through a central knowledge nexus"
            >
              <defs>
                <radialGradient id="coreGlow">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
                  <stop offset="45%" stopColor="#22d3ee" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </radialGradient>

                <radialGradient id="coreSurface">
                  <stop offset="0%" stopColor="#0f2535" />
                  <stop offset="100%" stopColor="#020617" />
                </radialGradient>

                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* ======================================================
                  ATMOSPHERE
                  ====================================================== */}
              <circle
                cx="300"
                cy="300"
                r="190"
                fill="url(#coreGlow)"
                filter="url(#softGlow)"
              />

              <circle
                className="nexus-ring"
                cx="300"
                cy="300"
                r="170"
                fill="none"
                stroke="#22d3ee"
                strokeOpacity="0.18"
                strokeWidth="1"
              />

              <circle
                cx="300"
                cy="300"
                r="235"
                fill="none"
                stroke="#a855f7"
                strokeOpacity="0.16"
                strokeWidth="1"
              />

              {/* ======================================================
                  FLOW PATHS
                  The animated dashed paths represent knowledge flowing
                  between the disciplines and the central Nexus.
                  ====================================================== */}
              <g fill="none">
                <path
                  className="nexus-flow"
                  d="M300 72 C300 150 300 205 300 258"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow nexus-flow-2"
                  d="M464 136 C410 185 360 225 330 270"
                  stroke="#a855f7"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow nexus-flow-3"
                  d="M528 300 C450 300 390 300 342 300"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow"
                  d="M464 464 C410 410 360 365 330 330"
                  stroke="#a855f7"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow nexus-flow-2"
                  d="M300 528 C300 450 300 395 300 342"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow nexus-flow-3"
                  d="M136 464 C190 410 240 365 270 330"
                  stroke="#a855f7"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow nexus-flow"
                  d="M72 300 C150 300 210 300 258 300"
                  stroke="#22d3ee"
                  strokeWidth="2"
                />

                <path
                  className="nexus-flow nexus-flow-2"
                  d="M136 136 C190 190 240 235 270 270"
                  stroke="#a855f7"
                  strokeWidth="2"
                />
              </g>

              {/* ======================================================
                  ORBITAL STRUCTURE
                  ====================================================== */}
              <circle
                cx="300"
                cy="300"
                r="235"
                fill="none"
                stroke="#a855f7"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="3 10"
              />

              <circle
                cx="300"
                cy="300"
                r="180"
                fill="none"
                stroke="#22d3ee"
                strokeOpacity="0.10"
                strokeWidth="1"
                strokeDasharray="2 8"
              />

              {/* ======================================================
                  OUTER ORBIT — 3 DISCIPLINES
                  ====================================================== */}
              <g className="nexus-orbit-slow">
                <circle cx="300" cy="65" r="5" fill="#22d3ee" opacity="0.85" />

                <circle cx="535" cy="300" r="5" fill="#a855f7" opacity="0.85" />

                <circle cx="300" cy="535" r="5" fill="#22d3ee" opacity="0.85" />
              </g>

              {/* ======================================================
                  MIDDLE ORBIT — 3 DISCIPLINES
                  ======================================================== */}
              <g className="nexus-orbit-medium">
                <circle cx="475" cy="120" r="5" fill="#22d3ee" opacity="0.85" />

                <circle cx="475" cy="480" r="5" fill="#a855f7" opacity="0.85" />

                <circle cx="125" cy="480" r="5" fill="#22d3ee" opacity="0.85" />
              </g>

              {/* ======================================================
                  INNER ORBIT — 2 DISCIPLINES
                  ======================================================== */}
              <g className="nexus-orbit-fast">
                <circle cx="125" cy="120" r="5" fill="#a855f7" opacity="0.85" />

                <circle cx="65" cy="300" r="5" fill="#22d3ee" opacity="0.85" />
              </g>

              {/* ======================================================
                  DISCIPLINE LABELS
                  These are intentionally kept readable and stationary
                  while the underlying orbital field moves.
                  ======================================================== */}
              <g
                fill="#cbd5e1"
                fontSize="14"
                fontWeight="500"
                textAnchor="middle"
              >
                <text x="300" y="42">
                  Physics
                </text>

                <text x="488" y="106">
                  Research
                </text>

                <text x="556" y="305">
                  Data Science
                </text>

                <text x="488" y="505">
                  Engineering
                </text>

                <text x="300" y="558">
                  Education
                </text>

                <text x="112" y="505">
                  Programming
                </text>

                <text x="44" y="305">
                  Geoscience
                </text>

                <text x="112" y="106">
                  Mathematics
                </text>
              </g>

              {/* ======================================================
                  CENTRAL NEXUS
                  ======================================================== */}
              <g className="nexus-core">
                <circle
                  cx="300"
                  cy="300"
                  r="76"
                  fill="url(#coreSurface)"
                  stroke="#22d3ee"
                  strokeOpacity="0.5"
                  strokeWidth="1.5"
                />

                <circle
                  cx="300"
                  cy="300"
                  r="88"
                  fill="none"
                  stroke="#22d3ee"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />

                <text
                  x="300"
                  y="292"
                  fill="#22d3ee"
                  fontSize="24"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  DHD
                </text>

                <text
                  x="300"
                  y="320"
                  fill="#f8fafc"
                  fontSize="20"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  Nexus
                </text>

                <text
                  x="300"
                  y="344"
                  fill="#64748b"
                  fontSize="8"
                  letterSpacing="2"
                  textAnchor="middle"
                >
                  ONE BODY OF KNOWLEDGE
                </text>
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================================
          THE IDEA
          ============================================================ */}
      <section
        id="about"
        className="border-y border-slate-800/80 bg-slate-950/40 px-6 py-20 sm:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
            The idea behind the Nexus
          </p>

          <h2 className="mt-5 text-3xl font-bold text-slate-100 sm:text-4xl">
            Different fields. Connected thinking. One evolving body of work.
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
            The boundaries between disciplines are useful for learning, but
            discovery often happens where those boundaries meet. DHD Nexus
            brings together the things I study, teach, research, build, and
            explore — not as separate identities, but as connected expressions
            of the same curiosity.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {disciplines.map((discipline) => (
              <button
                key={discipline}
                type="button"
                className="rounded-lg border border-slate-700 bg-slate-950/40 px-4 py-2 text-sm font-medium text-slate-400 transition-all duration-200 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-cyan-400 hover:shadow-[0_0_18px_rgba(34,211,238,0.08)]"
              >
                {discipline}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          THE NEXUS IN ACTION
          ============================================================ */}
      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                The Nexus in action
              </p>

              <h2 className="mt-5 text-4xl font-bold text-slate-100">
                Physics Academy
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-400">
                The first major learning environment emerging from DHD Nexus. It
                brings together physics teaching, interactive laboratories,
                scientific visualisation, computational thinking, and
                examination-focused learning.
              </p>

              <Link
                to="/physics-academy"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-cyan-400 transition hover:text-cyan-300"
              >
                Explore Physics Academy
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-wrap gap-3">
                  {[
                    "Teaching",
                    "Interactive Labs",
                    "Scientific Visualisation",
                    "Python",
                    "Manim",
                    "Problem Solving",
                    "Research",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 border-l-2 border-cyan-400/40 pl-5">
                  <p className="text-lg leading-8 text-slate-200">
                    One example of how separate interests can become a connected
                    learning experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT
          ============================================================ */}
      <section className="border-t border-slate-800/80 bg-slate-950/30 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">
              About
            </p>

            <h2 className="mt-5 text-4xl font-bold text-slate-100">
              The person behind the Nexus.
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-slate-300">
              DHD Nexus is a personal intellectual ecosystem — a place where
              learning, teaching, research, technology, and experimentation
              meet.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-400">
              It grows alongside the person building it. Some parts are
              established, others are experiments, and still others are ideas
              waiting to become projects. The common thread is a commitment to
              understanding things deeply, connecting ideas across fields, and
              turning knowledge into something useful.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT
          ============================================================ */}
      <section id="contact" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/50 px-6 py-12 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Contact
          </p>

          <h2 className="mt-5 text-3xl font-bold text-slate-100 sm:text-4xl">
            Let's connect ideas.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
            Whether you are interested in the teaching platform, research,
            collaboration, technology, or simply want to exchange ideas, DHD
            Nexus is open to meaningful conversations.
          </p>

          <a
            href="mailto:contact@dhdnexus.com"
            className="mt-8 inline-flex rounded-lg border border-cyan-400/50 px-6 py-3 font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* ============================================================
          CLOSING
          ============================================================ */}
      <section className="px-6 pb-24 pt-8 text-center sm:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 h-px w-24 bg-cyan-400/40" />

          <p className="text-2xl font-medium leading-relaxed text-slate-200 sm:text-3xl">
            Learn deeply. Connect ideas. Build boldly.
          </p>

          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-500">
            DHD Nexus
          </p>
        </div>
      </section>
    </main>
  );
}
