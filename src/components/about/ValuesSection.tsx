const values = [
  {
    number: "01",
    title: "Craftsmanship",
    text: "A respect for material, proportion and detail in everything we make.",
  },
  {
    number: "02",
    title: "Personalisation",
    text: "Every choice is considered around the individual, never the catalogue.",
  },
  {
    number: "03",
    title: "Integrity",
    text: "Clarity in process, materials and execution from the first conversation onward.",
  },
  {
    number: "04",
    title: "Guidance",
    text: "Expert direction without imposing a predetermined way of living.",
  },
  {
    number: "05",
    title: "Confidence",
    text: "The assurance that comes from experience, precision and deeply considered design.",
  },
];

export default function ValuesSection() {
  return (
    <section className="bg-[var(--background)] py-[clamp(120px,14vw,210px)]">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              What Guides Us
            </p>
          </div>

          <div>
            <h2 className="heading-md max-w-[850px]">
              Values that shape
              every decision.
            </h2>

            <div className="mt-16 border-t border-black/15">
              {values.map((value) => (
                <div
                  key={value.number}
                  className="group grid gap-5 border-b border-black/15 py-7 md:grid-cols-[70px_1fr_1.2fr] md:items-center"
                >
                  <span className="text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
                    {value.number}
                  </span>

                  <h3 className="font-heading text-[clamp(24px,3vw,38px)] tracking-[-0.035em]">
                    {value.title}
                  </h3>

                  <p className="max-w-[440px] text-[14px] leading-[1.8] text-[var(--text-secondary)]">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}