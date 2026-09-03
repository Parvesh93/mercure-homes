import Link from "next/link";

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
    <footer className="bg-[#11110f] text-white">
      <div className="site-container">
        <div className="grid gap-14 border-b border-white/15 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr] lg:gap-12 lg:py-20">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Mercure Homes">
              <span className="font-heading block text-[20px] tracking-[0.18em]">
                MERCURE
              </span>

              <span className="mt-[3px] block text-[9px] tracking-[0.48em] text-white/45">
                HOMES
              </span>
            </Link>

            <p className="mt-8 max-w-[330px] text-[13px] leading-[1.8] text-white/45">
              Luxury personalised interiors where Italian design
              sensibility meets Indian craftsmanship.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.24em] text-white/35">
              Navigate
            </p>

            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit text-[13px] text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.24em] text-white/35">
              Follow
            </p>

            <div className="flex flex-col gap-4">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-fit text-[13px] text-white/65 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-7 text-[9px] uppercase tracking-[0.24em] text-white/35">
              Visit the Atelier
            </p>

            <p className="text-[13px] leading-[1.8] text-white/60">
              Bengaluru, India
            </p>

            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-white/35">
              By appointment
            </p>

            <Link
              href="/contact"
              className="group mt-8 flex w-fit items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white"
            >
              <span>Contact us</span>

              <span className="transition-transform duration-500 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-7 text-[9px] uppercase tracking-[0.18em] text-white/30 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Mercure Homes
          </p>

          <p>
            An SDP Group Company
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-white/70"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white/70"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}