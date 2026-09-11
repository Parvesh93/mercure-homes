"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import MercureLogo from "../../components/brand/MercureLogo";

import { usePathname } from "next/navigation";

type HeaderTheme = "dark" | "light";

const navItems = [

  // {
  //   label: "HOME",
  //   href: "/",
  // },

  {
    label: "ABOUT",
    href: "/about",
  },
  {
    label: "COLLECTIONS",
    href: "/collections",
  },

  {
    label: "PROJECTS",
    href: "/projects",
  },
  
  {
    label: "PROCESS",
    href: "/process",
  },
  {
    label: "TEAM",
    href: "/team",
  },
  {
    label: "THE SDP GROUP",
    href: "/sdp-group",
  },

  {
    label: "CONTACT",
    href: "/contact",
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [headerTheme, setHeaderTheme] =
    useState<HeaderTheme>("dark");

    const pathname = usePathname();

  /* =====================================================
     DETECT ACTIVE SECTION THEME
  ===================================================== */

  useEffect(() => {
  let rafId = 0;

  const detectTheme = () => {
    cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      const probeY =
        window.innerWidth < 768 ? 40 : 46;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-header-theme]"
        )
      );

      let activeTheme: HeaderTheme = "dark";

      for (const section of sections) {
        const rect =
          section.getBoundingClientRect();

        if (
          rect.top <= probeY &&
          rect.bottom > probeY
        ) {
          const theme =
            section.dataset.headerTheme;

          if (
            theme === "light" ||
            theme === "dark"
          ) {
            activeTheme = theme;
            break;
          }
        }
      }

      setHeaderTheme(activeTheme);

      setScrolled(
        window.scrollY > 24
      );
    });
  };

  /*
   * Run immediately.
   */
  detectTheme();

  /*
   * Run again after the new route
   * has mounted and layout has settled.
   */
  const timer1 = window.setTimeout(
    detectTheme,
    50
  );

  const timer2 = window.setTimeout(
    detectTheme,
    250
  );

  window.addEventListener(
    "scroll",
    detectTheme,
    {
      passive: true,
    }
  );

  window.addEventListener(
    "resize",
    detectTheme
  );

  return () => {
    cancelAnimationFrame(rafId);

    clearTimeout(timer1);
    clearTimeout(timer2);

    window.removeEventListener(
      "scroll",
      detectTheme
    );

    window.removeEventListener(
      "resize",
      detectTheme
    );
  };
}, [pathname]);

  /* =====================================================
     LOCK PAGE WHILE MOBILE MENU IS OPEN
  ===================================================== */

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [menuOpen]);

  /*
   * Mobile menu itself is dark,
   * so force white header UI while open.
   */

  const isDark =
    menuOpen ||
    headerTheme === "dark";

  return (
    <>
      {/* =================================================
          HEADER
      ================================================== */}

      <header
        className={[
          "fixed inset-x-0 top-0 z-[100]",
          "transition-[background-color,backdrop-filter,border-color]",
          "duration-500",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",

          scrolled
            ? isDark
              ? "border-b border-white/[0.06] bg-[#1a1a1a]/88 backdrop-blur-xl"
              : "border-b border-black/[0.07] bg-[#fff9f1]/88 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="site-container flex h-[82px] items-center justify-between gap-4 md:h-[92px]">

          {/* =============================================
              LOGO
          ============================================== */}

          <Link
            href="/"
            aria-label="Mercure Homes"
            onClick={() =>
              setMenuOpen(false)
            }
            className="relative z-[120] flex shrink-0 items-center"
          >
            <img
              src={
                isDark
                  ? "/brand/logos/mercure-full-white.svg"
                  : "/brand/logos/mercure-full-black.svg"
              }
              alt="Mercure Homes"
              draggable={false}
              className={[
                "block h-auto",
                "w-[132px]",
                "object-contain",
                "transition-opacity",
                "duration-300",
                "sm:w-[140px]",
                "md:w-[118px]",
                "lg:w-[124px]",
              ].join(" ")}
            />
          </Link>

          {/* =============================================
              DESKTOP NAVIGATION
          ============================================== */}

          <nav className="hidden items-center gap-[clamp(30px,2.8vw,46px)] lg:flex">
            {navItems.map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group relative py-3",
                    "text-[11px]",
                    "font-medium",
                    "tracking-[0.08em]",
                    "transition-colors duration-300",

                    isDark
                      ? "!text-white/80 hover:!text-white"
                      : "!text-[#1a1a1a]/65 hover:!text-[#1a1a1a]",
                  ].join(" ")}
                >
                  {item.label}

                  <span
                    className={[
                      "absolute bottom-[4px] left-0",
                      "h-px w-full",
                      "origin-left scale-x-0",
                      "bg-[#caa544]",
                      "transition-transform duration-500",
                      "ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              )
            )}
          </nav>

          {/* =============================================
              DESKTOP CTA
          ============================================== */}

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className={[
                "group flex items-center gap-5",
                "text-[10px]",
                "font-medium",
                "uppercase",
                "tracking-[0.18em]",
                "transition-colors duration-300",

                isDark
                  ? "!text-white/90 hover:!text-white"
                  : "!text-[#1a1a1a]/75 hover:!text-[#1a1a1a]",
              ].join(" ")}
            >
              <span>
                Begin a project
              </span>

              <span
                className={[
                  "relative block h-px w-10 overflow-hidden",

                  isDark
                    ? "bg-white/25"
                    : "bg-black/15",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute inset-0",
                    "-translate-x-full",
                    "bg-[#caa544]",
                    "transition-transform duration-700",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "group-hover:translate-x-0",
                  ].join(" ")}
                />
              </span>
            </Link>
          </div>

          {/* =============================================
              MOBILE TOGGLE
          ============================================== */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (current) => !current
              )
            }
            className={[
              "relative z-[120]",
              "flex h-11 w-11",
              "shrink-0",
              "appearance-none",
              "items-center",
              "justify-center",
              "border-0",
              "bg-transparent",
              "p-0",
              "before:!content-none",
              "after:!content-none",
              "lg:hidden",

              isDark
                ? "text-white"
                : "text-[#1a1a1a]",
            ].join(" ")}
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={
              menuOpen
            }
          >
            {menuOpen ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="block"
              >
                <path
                  d="M5 5L21 21"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />

                <path
                  d="M21 5L5 21"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            ) : (
              <svg
                width="26"
                height="20"
                viewBox="0 0 26 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="block"
              >
                <path
                  d="M2 6H24"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />

                <path
                  d="M2 14H24"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* =================================================
          MOBILE NAVIGATION
      ================================================== */}

      <div
        className={[
          "fixed inset-0 z-[90]",
          "overflow-hidden",
          "bg-[#1a1a1a]",
          "transition-all duration-700",
          "ease-[cubic-bezier(0.22,1,0.36,1)]",
          "lg:hidden",

          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* Background brand mark */}

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none",
            "absolute bottom-[-6vw]",
            "right-[-6vw]",
            "select-none",
            "opacity-[0.04]",
          ].join(" ")}
        >
          <MercureLogo
            variant="m-white"
            className="w-[58vw] max-w-[360px]"
          />
        </div>

        {/* Gold accent */}

        <div
          className={[
            "absolute",
            "left-[var(--page-padding)]",
            "right-[var(--page-padding)]",
            "top-[82px]",
            "h-px",
            "origin-left",
            "bg-[#caa544]/30",
            "transition-transform",
            "duration-700",

            menuOpen
              ? "scale-x-100"
              : "scale-x-0",
          ].join(" ")}
        />

        <div className="site-container relative z-10 flex min-h-[100svh] flex-col justify-between pb-9 pt-[125px]">

          {/* =============================================
              MOBILE LINKS
          ============================================== */}

          <nav className="flex flex-col">
            {navItems.map(
              (item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className={[
                    "group flex",
                    "items-center",
                    "justify-between",
                    "border-b",
                    "border-white/10",
                    "py-5",
                    "transition-all",
                    "duration-700",

                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0",
                  ].join(" ")}
                  style={{
                    transitionDelay:
                      menuOpen
                        ? `${120 + index * 70}ms`
                        : "0ms",
                  }}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="text-[8px] tracking-[0.18em] text-white/25">
                      0{index + 1}
                    </span>

                    <span
                      className={[
                        "font-heading",
                        "text-[clamp(34px,9vw,54px)]",
                        "font-normal",
                        "leading-none",
                        "tracking-[-0.045em]",
                        "text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </span>
                  </div>

                  <span className="text-[15px] text-white/35 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </Link>
              )
            )}
          </nav>

          {/* =============================================
              MOBILE BOTTOM
          ============================================== */}

          <div
            className={[
              "transition-all duration-700",

              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0",
            ].join(" ")}
            style={{
              transitionDelay:
                menuOpen
                  ? "450ms"
                  : "0ms",
            }}
          >
            <Link
              href="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
              className="group flex items-center gap-5"
            >
              <span className="text-[10px] uppercase tracking-[0.23em] text-white/65">
                Begin a project
              </span>

              <span className="h-px w-10 bg-[#caa544]/60" />

              <span className="text-white/60">
                ↗
              </span>
            </Link>

            <div className="mt-9 flex items-end justify-between border-t border-white/10 pt-6">
              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-white/25">
                  Luxury Interior Atelier
                </p>

                <p className="mt-2 text-[8px] uppercase tracking-[0.24em] text-white/25">
                  Bengaluru · India
                </p>
              </div>

              <MercureLogo
                variant="m-white"
                className="w-[21px] opacity-40"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}