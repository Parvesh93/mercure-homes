import Link from "next/link";

const process = [
  "Conceive",
  "Design",
  "Craft",
  "Install",
];

export default function AboutProcess() {
  return (
    <section className="bg-[#171715] py-[clamp(120px,14vw,210px)] text-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-white/40">
              How We Work
            </p>
          </div>

          <div>
            <h2 className="font-heading max-w-[900px] text-[clamp(46px,6vw,92px)] leading-[0.96] tracking-[-0.05em]">
              From an idea
              to a space that
              feels entirely yours.
            </h2>

            <div className="mt-16 border-t border-white/15">
              {process.map((step, index) => (
                <div
                  key={step}
                  className="grid grid-cols-[60px_1fr] items-center border-b border-white/15 py-7"
                >
                  <span className="text-[10px] tracking-[0.2em] text-white/35">
                    0{index + 1}
                  </span>

                  <span className="font-heading text-[clamp(28px,4vw,52px)] tracking-[-0.04em]">
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/process"
              className="group mt-10 flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em]"
            >
              <span>Explore our process</span>

              <span className="relative block h-px w-12 overflow-hidden bg-white/25">
                <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-700 group-hover:translate-x-0" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}