import Link from "next/link";

export default function CustomisationStatement() {
  return (
    <section className="bg-[var(--surface-light)] py-[clamp(130px,16vw,240px)]">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              Made to Order
            </p>
          </div>

          <div>
            <blockquote className="font-editorial max-w-[1050px] text-[clamp(48px,7vw,108px)] leading-[0.98] tracking-[-0.045em]">
              “Every piece is made to order.
              Nothing leaves our atelier
              without your approval.”
            </blockquote>

            <Link
              href="/contact"
              className="group mt-12 flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em]"
            >
              <span>Request a consultation</span>

              <span className="relative block h-px w-14 overflow-hidden bg-black/20">
                <span className="absolute inset-0 -translate-x-full bg-black transition-transform duration-700 group-hover:translate-x-0" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}