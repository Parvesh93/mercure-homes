const materials = [
  {
    number: "01",
    title: "Italian Marble",
    text: "Distinctive natural stone selected for character, movement and timelessness.",
  },
  {
    number: "02",
    title: "Imported Linens",
    text: "Textiles chosen for tactility, drape and the quiet richness they bring to a room.",
  },
  {
    number: "03",
    title: "Italian Leather",
    text: "Premium leather selected for touch, ageing and lasting refinement.",
  },
  {
    number: "04",
    title: "Ethically Sourced Wood",
    text: "Carefully selected timber shaped through precise craftsmanship and considered detailing.",
  },
];

export default function MaterialStories() {
  return (
    <section className="bg-[#171715] py-[clamp(120px,14vw,210px)] text-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-white/40">
              Material Stories
            </p>
          </div>

          <div>
            <h2 className="font-heading max-w-[900px] text-[clamp(46px,6vw,92px)] leading-[0.96] tracking-[-0.05em]">
              The character
              of a space begins
              with what it is made of.
            </h2>

            <div className="mt-16 border-t border-white/15">
              {materials.map((material) => (
                <div
                  key={material.number}
                  className="grid gap-5 border-b border-white/15 py-8 md:grid-cols-[70px_1fr_1.2fr] md:items-center"
                >
                  <span className="text-[10px] tracking-[0.2em] text-white/30">
                    {material.number}
                  </span>

                  <h3 className="font-heading text-[clamp(24px,3vw,38px)] tracking-[-0.035em]">
                    {material.title}
                  </h3>

                  <p className="max-w-[450px] text-[14px] leading-[1.8] text-white/50">
                    {material.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-12 max-w-[620px] text-[14px] leading-[1.8] text-white/45">
              Through the wider SDP Group, Mercure Homes also draws on
              deep experience in natural stone and material sourcing,
              allowing material selection to become part of the design
              story rather than an afterthought.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}