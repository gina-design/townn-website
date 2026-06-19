"use client";

import { useState } from "react";
import Image from "next/image";

function SignupForm({ type }: { type: "waitlist" | "beta" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const cta = type === "waitlist" ? "Join our launch waitlist" : "Sign up as a beta tester";
  const success =
    type === "waitlist"
      ? "You're on the list — we'll be in touch."
      : "Got it. We'll reach out when beta spots open.";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert("Something went wrong — please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium" style={{ color: "#0E6E66", fontFamily: "var(--font-body)" }}>
        {success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 text-sm rounded-[8px] border outline-none transition-colors"
        style={{
          background: "#FFFFFF",
          borderColor: "#E2D9CF",
          color: "#1C1A17",
          fontFamily: "var(--font-body)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1ACABC")}
        onBlur={(e) => (e.target.style.borderColor = "#E2D9CF")}
      />
      <button
        type="submit"
        disabled={loading}
        className="px-8 py-4 text-base font-medium rounded-[8px] transition-colors whitespace-nowrap"
        style={{
          background: "#1ACABC",
          color: "#FFFFFF",
          fontFamily: "var(--font-body)",
        }}
        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = "#149B90")}
        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = "#1ACABC")}
      >
        {loading ? "Sending…" : cta}
      </button>
    </form>
  );
}

const tierStyles = {
  active: {
    rowBg: "#FFFFFF",
    borderLeft: "3px solid #1ACABC",
    pillBg: "#E7F5F3",
    pillText: "#0E6E66",
    titleColor: "#1C1A17",
    titleStyle: "italic" as const,
    bodyColor: "#6B5C4E",
    watermark: "#E7F5F3",
  },
  mid: {
    rowBg: "#FBF9F6",
    borderLeft: "3px solid transparent",
    pillBg: "#EDE8E2",
    pillText: "#8C7B6B",
    titleColor: "#8A7E78",
    titleStyle: "italic" as const,
    bodyColor: "#918379",
    watermark: "#EDE8E2",
  },
  dim: {
    rowBg: "#F7F3EE",
    borderLeft: "3px solid transparent",
    pillBg: "#EDE8E2",
    pillText: "#8C7B6B",
    titleColor: "#C5BAB0",
    titleStyle: "italic" as const,
    bodyColor: "#B8AFA7",
    watermark: "#EDE8E2",
  },
};

const pillars = [
  {
    phase: "Now",
    num: "01",
    title: "Gather",
    body: "Casual gatherings right in your neighborhood. An impromptu porch hangout, a backyard bonfire, a meetup at the local pub. The small moments that bring people back into each other's lives.",
    tier: "active" as const,
  },
  {
    phase: "Phase Two",
    num: "02",
    title: "Help",
    body: "Need a hand? Like to offer one? Townn connects neighbors who want to give and receive the kind of help that used to happen naturally in the village.",
    tier: "mid" as const,
  },
  {
    phase: "The Horizon",
    num: "03",
    title: "Discuss",
    body: "On the horizon, Townn will connect neighbors to have the real conversations that usually separate us. Not to debate, but to understand.",
    tier: "dim" as const,
  },
];

export default function Home() {
  return (
    <main style={{ background: "#F7F3EE" }} className="min-h-screen flex flex-col">

      {/* Nav */}
      <nav className="flex items-center px-6 py-6 max-w-3xl mx-auto w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 200" style={{ height: 42, width: "auto" }} aria-label="Townn">
          <g transform="translate(0,25) scale(0.92)" fill="#1ACABC"><path d="m97.14,70.49c2.39,2.03,5.32,2.25,8.14,1.22,6.75-2.47,10.75-10.88,10.04-16.89-.48-4.08-2.27-7.65-4.79-10.82-3.47-4.37-7.96-7.01-13.9-7.68.28.7.41,1.16.63,1.56,3.84,6.8,3.75,13.51-.34,20.2-.8,1.31-1.47,2.8-1.78,4.29-.64,2.97-.54,5.96,2,8.12Z"></path><path d="m58.01,65.07c1.4.88,3.02,1.52,4.63,1.94,5.02,1.33,9.42-1.77,9.51-6.9.03-1.82-.57-3.92-1.56-5.45-3.22-4.97-8.01-7.68-13.92-7.91-8.61-.33-17.75,7.12-19.89,15.95-.2.81-.26,1.64-.43,2.74.66-.28,1-.39,1.31-.57,6.82-3.87,13.58-4.05,20.35.19Z"></path><path d="m62.45,39.13c6.53,2,11.12,6,13.09,12.71.44,1.49.83,3.02,1.46,4.43,1.25,2.76,3.09,5.06,6.25,5.7,3.74.75,7.83-2.08,8.91-6.31,1.82-7.15-1.25-15.62-8.01-19.1-4.95-2.55-10.17-3.37-15.6-2.16-2.9.65-5.66,1.76-7.94,3.94.3.22.43.37.59.42.41.14.83.24,1.25.37Z"></path><path d="m66.84,99.7c1.7-6.44-2.99-11.06-9.46-9.51-5.37,1.29-11.42,9.15-10.65,16.62.69,6.74,4.23,12.07,9.89,15.84,2.53,1.69,5.37,2.76,8.45,3.06.06-.3.14-.44.11-.53-.13-.35-.27-.7-.45-1.02-3.81-6.79-3.9-13.49.32-20.18.82-1.29,1.41-2.8,1.8-4.28Z"></path><path d="m101.56,80.13c-2.1,2.51-2.28,5.62-.43,8.29,1.45,2.09,3.46,3.44,5.94,3.95,8.51,1.74,16.43-2.62,19.48-10.72,2.51-6.69,2.19-13.18-1.6-19.36-.33-.55-.79-1.02-1.36-1.75-.26.61-.41.86-.48,1.13-2.08,7.82-6.82,12.83-14.96,14.42-2.63.51-4.84,1.96-6.58,4.04Z"></path><path d="m53.87,85.89c2.53-.54,4.79-1.79,6.49-3.85,2.2-2.68,2.35-5.91.39-8.61-1.37-1.89-3.21-3.26-5.47-3.7-6.63-1.27-12.57.39-16.87,5.61-4.25,5.16-5.41,11.39-4.03,17.98.62,2.95,1.76,5.67,3.87,8.1.26-.42.49-.65.56-.92,2.04-7.94,6.93-12.88,15.05-14.6Z"></path><path d="m123.29,104.25c1.29-2.27,2.23-4.69,2.32-7.71-.89.43-1.4.64-1.89.9-6.42,3.44-12.76,3.67-19.2-.12-1.94-1.14-4.2-1.9-6.42-2.37-4.84-1.01-8.97,3.51-8.29,8.43.91,6.63,10.35,13.54,18.83,11.66,6.31-1.39,11.37-5.05,14.64-10.8Z"></path><path d="m76.55,100.08c-3.56.51-5.8,2.96-6.68,6.31-1.98,7.49,1.65,15.9,8.19,19.17,4.2,2.1,8.62,2.96,13.24,2.44,3.7-.42,7.09-1.76,10.33-4.48-.94-.29-1.49-.4-1.98-.63-2.34-1.13-4.83-2.07-6.97-3.52-3.5-2.37-5.41-5.93-6.47-10-.41-1.56-.92-3.14-1.69-4.53-1.7-3.09-4.2-5.3-7.97-4.76Z"></path></g>
          <text x="172" y="138" fontSize="150" fill="#1C1A17" style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}>townn</text>
        </svg>
      </nav>

      {/* Hero — text centered */}
      <section className="px-6 pt-8 sm:pt-12 pb-0 max-w-3xl mx-auto w-full flex flex-col gap-8">
        <div className="flex flex-col gap-5 max-w-2xl">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              color: "#1C1A17",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
                fontSize: "clamp(2rem, 8vw, 5rem)",
            }}
          >
            Meet your<br />neighbors.
            <br />
            <span style={{ color: "#1ACABC", fontStyle: "italic" }}>
              For real this time.
            </span>
          </h1>
          <p
            className="text-xl max-w-lg"
            style={{ fontFamily: "var(--font-body)", color: "#6B5C4E", lineHeight: 1.6 }}
          >
            Gather with neighbors, help each other out, and have the conversations that actually matter. Right where you live.
          </p>
        </div>

        <div className="max-w-md">
          <SignupForm type="waitlist" />
        </div>

        <p className="text-base" style={{ fontFamily: "var(--font-body)", color: "#6B5C4E" }}>
          Want to help shape it?{" "}
          <a href="#beta" className="underline underline-offset-2" style={{ color: "#0E6E66" }}>
            Sign up as a beta tester →
          </a>
        </p>
      </section>

      {/* Hero image — full width, gradient-faded into page bg */}
      <div className="relative w-full mt-8 sm:mt-12" style={{ height: "clamp(200px, 48vw, 520px)" }}>
        <Image
          src="/houses.jpg"
          alt="A row of small wooden house models"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: "center 38%" }}
        />
        {/* Fade top only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, #F7F3EE 0%, #F7F3EE 8%, transparent 38%)`,
          }}
        />
      </div>

      {/* Vision pillars */}
      <section style={{ borderTop: "0.5px solid #E2D9CF" }}>
        {pillars.map(({ phase, num, title, body, tier }) => (
          <div
            key={title}
            className="relative overflow-hidden px-6 py-12 sm:py-20"
            style={{
              background: tierStyles[tier].rowBg,
              borderBottom: "0.5px solid #E2D9CF",
              borderLeft: tierStyles[tier].borderLeft,
            }}
          >
            {/* Watermark number */}
            <span
              className="absolute select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(6rem, 28vw, 22rem)",
                lineHeight: 1,
                color: tierStyles[tier].watermark,
                right: "-2rem",
                bottom: "-2rem",
                letterSpacing: "-0.04em",
              }}
            >
              {num}
            </span>

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-start gap-8">
              <div className="flex sm:flex-col gap-3 sm:gap-2 sm:w-36 shrink-0 pt-1">
                <span
                  className="text-sm font-medium px-4 py-1.5 rounded-full w-fit"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: tierStyles[tier].pillBg,
                    color: tierStyles[tier].pillText,
                  }}
                >
                  {phase}
                </span>
                <span
                  className="text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "#D3C7B9", marginTop: 2 }}
                >
                  {num}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    color: tierStyles[tier].titleColor,
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    fontSize: "clamp(2rem, 8vw, 5rem)",
                    fontStyle: tierStyles[tier].titleStyle,
                  }}
                >
                  {title}
                </h2>
                <p
                  className="text-lg max-w-lg"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: tierStyles[tier].bodyColor,
                    lineHeight: 1.6,
                  }}
                >
                  {body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Beta section */}
      <section id="beta" className="relative overflow-hidden px-6 py-14 sm:py-20">
        <div
          className="absolute pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1.5px solid #E2D9CF",
            left: -120,
            bottom: -100,
            zIndex: 0,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6">
          <div
            className="px-3 py-1 rounded-full text-xs font-medium w-fit"
            style={{ background: "#E7F5F3", color: "#0E6E66", fontFamily: "var(--font-body)" }}
          >
            Briar Chapel · Launching soon
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "#1C1A17",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            }}
          >
            Want to shape it?
          </h2>
          <p
            className="text-lg max-w-sm"
            style={{ fontFamily: "var(--font-body)", color: "#6B5C4E", lineHeight: 1.6 }}
          >
            We're looking for a small group of neighbors to try Townn before it launches
            and tell us what feels right.
          </p>
          <div className="max-w-md">
            <SignupForm type="beta" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="mt-auto px-6 py-8 text-center text-xs"
        style={{
          fontFamily: "var(--font-body)",
          color: "#6B5C4E",
          borderTop: "0.5px solid #E2D9CF",
        }}
      >
        © {new Date().getFullYear()} Townn. Made with care in Chapel Hill.
      </footer>

    </main>
  );
}
