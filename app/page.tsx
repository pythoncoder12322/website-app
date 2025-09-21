"use client";

import React, { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";

type NavLink = {
  id: string;
  label: string;
};

const NAV_LINKS: NavLink[] = [
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "join", label: "Join" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Home(): JSX.Element {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" && localStorage.getItem("fch_theme");
      if (saved === "light" || saved === "dark" || saved === "system")
        setTheme(saved);
      else setTheme("system");
    } catch {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    const preferDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const resolved =
      theme === "system" ? (preferDark ? "dark" : "light") : theme;
    setIsDark(resolved === "dark");

    if (typeof document !== "undefined") {
      if (resolved === "dark")
        document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    }

    try {
      localStorage.setItem("fch_theme", theme);
    } catch {}
  }, [theme]);

  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  const toggleTheme = () =>
    setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <div className="font-serif antialiased text-gray-900 dark:text-gray-100 dark:bg-slate-900">
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="#" className="text-lg font-semibold tracking-tight">
              FC Hacks
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link: NavLink) => (
              <motion.a
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="relative inline-block text-base font-medium group cursor-pointer"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.span
                  aria-hidden
                  className="absolute left-0 bottom-0 h-[2px] w-full origin-left bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{
                    type: "tween",
                    duration: 0.28,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: "left center" }}
                />
              </motion.a>
            ))}
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full ring-1 ring-white/10"
              aria-label="Toggle color mode"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md bg-white/10 backdrop-blur-sm"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden px-4 pb-6"
            >
              <div className="bg-white/5 dark:bg-black/40 rounded-xl p-4 backdrop-blur-md border border-white/10">
                <ul className="flex flex-col gap-3">
                  {NAV_LINKS.map((l: NavLink) => (
                    <li key={l.id}>
                      <a
                        href={`#${l.id}`}
                        className="block py-2 px-3 rounded-md font-medium hover:bg-white/5"
                        onClick={() => setMobileOpen(false)}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
          src="/assets/codingcinematicvid.mp4"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30 dark:from-black/60 dark:to-black/70" />
        <motion.section
          className="relative z-20 max-w-4xl mx-4 md:mx-6 w-full rounded-3xl p-6 md:p-10 backdrop-blur-3xl bg-white/12 dark:bg-black/40 border border-white/10 dark:border-white/6 shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate={reduceMotion ? undefined : "show"}
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
              Innovation with Elegance
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-4 text-gray-100 max-w-2xl mx-auto">
            <p className="text-base md:text-lg leading-relaxed">
              FC Hacks is a student collective that treats software like craft. We design,
              prototype, and ship beautiful, resilient projects—together.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#join"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform"
            >
              Become a Member
            </a>
            <a
              href="#events"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white/90 font-medium hover:bg-white/5 transition"
            >
              Explore Events
            </a>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-6 text-sm text-gray-200">
            <span className="opacity-80">Join our first meeting — September 26</span>
          </motion.div>
        </motion.section>
      </main>

      <section id="about" className="relative min-h-screen bg-[#081f09] flex items-center">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 md:px-6 py-16 md:py-20 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-100 mb-4">Our Philosophy</h2>
            <p className="text-stone-200 max-w-xl leading-relaxed">
              Inspired by timeless design, FC Hacks believes coding is an act of
              craft—where intention, readability, and longevity matter. We pair
              practical skills with thoughtful critique so every project feels
              like architecture that lasts.
            </p>
            <div className="mt-6 flex gap-4 flex-wrap">
              <a href="#events" className="px-5 py-3 bg-[#122410] text-stone-100 rounded-full">
                See Events
              </a>
              <a href="#join" className="px-5 py-3 border border-white/10 text-stone-200 rounded-full">
                Join Us
              </a>
            </div>
          </motion.div>
          <motion.div
            className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=1600&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Abstract architectural lines"
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section id="events" className="px-4 md:px-6 py-16 md:py-20 bg-[#131216] text-center">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-extrabold text-white mb-8"
          >
            Upcoming Events
          </motion.h3>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {[
              {
                title: "First Meeting",
                desc: "Get familiar with the club and learn what we do.",
                date: "2025-09-26",
              },
              {
                title: "Workshop",
                desc: "Learn how to code in your respective fields.",
                date: "2025-10-03",
              },
              {
                title: "Workshop",
                desc: "Learn how to code in your respective fields.",
                date: "2025-10-10",
              },
            ].map(
              (
                ev: { title: string; desc: string; date: string },
                i: number
              ) => {
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(ev.date));
                return (
                  <motion.article
                    key={i}
                    className="rounded-xl p-6 bg-white/5 border border-white/10 text-left"
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-1">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-white/60 mb-2">{formattedDate}</p>
                    <p className="text-sm text-white/80 leading-snug">{ev.desc}</p>
                  </motion.article>
                );
              }
            )}
          </motion.div>
        </div>
      </section>

      <section
        id="join"
        className="px-4 md:px-6 py-16 md:py-20 bg-gradient-to-b from-white/3 to-white/2 text-center dark:from-black/30 dark:to-black/20"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4"
          >
            Join FC Hacks
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-stone-700 dark:text-stone-200 max-w-2xl mx-auto leading-relaxed mb-6"
          >
            Be part of a collective that values craft, clarity, and collaboration. Whether you’re
            new to code or a seasoned hacker, we’ll help you build things that last.
          </motion.p>
          <motion.a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdJ8qUgqsHDBEELzE5xT6zU8-g2xYbQiiUIYlD3JOQfC30e4w/viewform?usp=dialog"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-8 py-3 rounded-full bg-clip-padding bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-semibold shadow-md"
          >
            Sign Up
          </motion.a>
        </div>
      </section>

      <footer className="px-4 md:px-6 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FC Hacks — Built with care.
      </footer>
    </div>
  );
}
