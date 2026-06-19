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
        <img
          src="/brand/lockups/townn-horizontal-primary.svg"
          alt="Townn"
          style={{ height: 42 }}
        />
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
          <a href="#beta" className="underline underline-offset-2" style={{ color: "#1ACABC" }}>
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
