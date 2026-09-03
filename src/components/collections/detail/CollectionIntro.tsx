import type { CollectionItem } from "../../../data/collections";

interface CollectionIntroProps {
  collection: CollectionItem;
}

export default function CollectionIntro({
  collection,
}: CollectionIntroProps) {
  return (
    <section className="bg-[var(--background)] py-[clamp(120px,14vw,220px)]">
      <div className="site-container">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              The Collection
            </p>
          </div>

          <div>
            <h2 className="font-editorial max-w-[1000px] text-[clamp(46px,6vw,92px)] leading-[1.02] tracking-[-0.04em]">
              {collection.statement}
            </h2>

            <div className="mt-14 flex justify-end">
              <p className="body-lg max-w-[620px]">
                {collection.intro}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}