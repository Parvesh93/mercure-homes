import type { CollectionItem } from "../../../data/collections";

interface CollectionMaterialsProps {
  collection: CollectionItem;
}

export default function CollectionMaterials({
  collection,
}: CollectionMaterialsProps) {
  return (
    <section className="bg-[#171715] py-[clamp(120px,14vw,210px)] text-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-white/40">
              Materials & Finishes
            </p>
          </div>

          <div>
            <h2 className="font-heading max-w-[900px] text-[clamp(46px,6vw,92px)] leading-[0.96] tracking-[-0.05em]">
              Every surface
              is part of the story.
            </h2>

            <div className="mt-16 border-t border-white/15">
              {collection.materials.map((material, index) => (
                <div
                  key={material.name}
                  className="grid gap-5 border-b border-white/15 py-8 md:grid-cols-[70px_1fr_1.2fr] md:items-center"
                >
                  <span className="text-[10px] tracking-[0.2em] text-white/30">
                    0{index + 1}
                  </span>

                  <h3 className="font-heading text-[clamp(24px,3vw,38px)] tracking-[-0.035em]">
                    {material.name}
                  </h3>

                  <p className="max-w-[450px] text-[14px] leading-[1.8] text-white/50">
                    {material.description}
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