import Link from "next/link";

import MercureLogo from "../../components/brand/MercureLogo";

const navigation = [
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Process",
    href: "/process",
  },
  {
    label: "SDP Group",
    href: "/sdp-group",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
  },
  {
    label: "Pinterest",
    href: "#",
  },
  {
    label: "YouTube",
    href: "#",
  },
  {
    label: "LinkedIn",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer
      data-header-theme="dark"
      className={[
        "relative overflow-hidden",
        "bg-[var(--obsidian-slate)]",
        "text-[var(--ivory-vein)]",
      ].join(" ")}
    >
      {/* =====================================
          SUBTLE BRAND ATMOSPHERE
      ====================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -bottom-[18%] -left-[8%] h-[420px] w-[420px] rounded-full bg-[var(--caramel-bronze)]/[0.045] blur-[150px]" />

        <div className="absolute -right-[10%] top-[8%] h-[360px] w-[360px] rounded-full bg-[var(--gilded-ochre)]/[0.025] blur-[150px]" />
      </div>

      <div className="site-container relative z-10">
        {/* =====================================
            TOP BRAND STATEMENT
        ====================================== */}

        <div className="border-b border-[var(--alabaster-mist)]/10 py-[clamp(70px,8vw,120px)]">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            {/* LOGO */}

            <div>
              <Link
                href="/"
                aria-label="Mercure Homes"
                className="inline-block"
              >
                <img
                  src="/brand/logos/mercure-full-white.svg"
                  alt="Mercure Homes"
                  draggable={false}
                  className="h-auto w-[150px] object-contain md:w-[165px]"
                />
              </Link>
            </div>

            {/* BRAND MESSAGE */}

            <div>
              <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--brand-gold)]">
                Crafting your story
              </p>

              <h2
                className={[
                  "mt-5 max-w-[850px]",
                  "font-editorial",
                  "text-[clamp(36px,4.5vw,68px)]",
                  "leading-[1.04]",
                  "tracking-[-0.035em]",
                  "text-[var(--ivory-vein)]",
                ].join(" ")}
              >
                Spaces made personal,
                one statement at a time.
              </h2>
            </div>
          </div>
        </div>

        {/* =====================================
            MAIN FOOTER
        ====================================== */}

        <div
          className={[
            "grid gap-14",
            "border-b border-[var(--alabaster-mist)]/10",
            "py-16",
            "md:grid-cols-2",
            "lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]",
            "lg:gap-12",
            "lg:py-20",
          ].join(" ")}
        >
          {/* =================================
              BRAND
          ================================== */}

          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[var(--brand-gold)]" />

              <p className="text-[9px] uppercase tracking-[0.24em] text-[var(--brand-gold)]">
                Mercure Homes
              </p>
            </div>

            <p className="mt-7 max-w-[340px] text-[13px] leading-[1.85] text-[var(--alabaster-mist)]/58">
              Personalised interiors shaped through
              material intelligence, considered design
              and Indian craftsmanship.
            </p>

            <p className="mt-7 text-[9px] uppercase tracking-[0.22em] text-[var(--alabaster-mist)]/32">
              An SDP Group Company
            </p>
          </div>

          {/* =================================
              NAVIGATION
          ================================== */}

          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.24em] text-[var(--brand-gold)]">
              Navigate
            </p>

            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex w-fit items-center gap-3",
                    "text-[13px]",
                    "text-[var(--alabaster-mist)]/62",
                    "transition-colors duration-300",
                    "hover:text-[var(--ivory-vein)]",
                  ].join(" ")}
                >
                  <span>{item.label}</span>

                  <span
                    className={[
                      "h-px w-0",
                      "bg-[var(--brand-gold)]",
                      "transition-all duration-500",
                      "group-hover:w-5",
                    ].join(" ")}
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* =================================
              SOCIAL
          ================================== */}

          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.24em] text-[var(--brand-gold)]">
              Follow
            </p>

            <div className="flex flex-col gap-4">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "group flex w-fit items-center gap-3",
                    "text-[13px]",
                    "text-[var(--alabaster-mist)]/62",
                    "transition-colors duration-300",
                    "hover:text-[var(--ivory-vein)]",
                  ].join(" ")}
                >
                  <span>{item.label}</span>

                  <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* =================================
              CONTACT
          ================================== */}

          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.24em] text-[var(--brand-gold)]">
              Visit the Atelier
            </p>

            <p className="text-[13px] leading-[1.8] text-[var(--alabaster-mist)]/65">
              Bengaluru, India
            </p>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

              <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--alabaster-mist)]/38">
                By appointment
              </p>
            </div>

            <Link
              href="/contact"
              className={[
                "group mt-8 flex w-fit items-center gap-5",
                "text-[10px]",
                "uppercase",
                "tracking-[0.2em]",
                "text-[var(--ivory-vein)]",
              ].join(" ")}
            >
              <span>Begin a conversation</span>

              <span className="text-[var(--brand-gold)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* =====================================
            BOTTOM BAR
        ====================================== */}

        <div
          className={[
            "flex flex-col gap-5",
            "py-7",
            "text-[9px]",
            "uppercase",
            "tracking-[0.18em]",
            "text-[var(--alabaster-mist)]/30",
            "md:flex-row",
            "md:items-center",
            "md:justify-between",
          ].join(" ")}
        >
          <p>
            © {new Date().getFullYear()} Mercure Homes
          </p>

          <div className="hidden items-center gap-4 md:flex">
            <span className="h-px w-8 bg-[var(--brand-gold)]/35" />

            <p>
              Bengaluru · India
            </p>

            <span className="h-px w-8 bg-[var(--brand-gold)]/35" />
          </div>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-[var(--ivory-vein)]/70"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-[var(--ivory-vein)]/70"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================
          GIANT BACKGROUND M
      ====================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute bottom-[-10vw] right-[-5vw]",
          "select-none",
          "font-heading",
          "text-[clamp(260px,32vw,620px)]",
          "leading-none",
          "text-[var(--ivory-vein)]/[0.018]",
        ].join(" ")}
      >
        M
      </div>
    </footer>
  );
}