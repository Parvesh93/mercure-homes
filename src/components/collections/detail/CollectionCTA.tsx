import Link from "next/link";

import type { CollectionItem } from "../../../data/collections";

interface CollectionCTAProps {
  collection: CollectionItem;
}

export default function CollectionCTA({
  collection,
}: CollectionCTAProps) {
  return (
    <section className="bg-[var(--background)] py-[clamp(130px,16vw,240px)]">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2.3fr]">
          <div>
            <p className="eyebrow text-[var(--text-secondary)]">
              Made for You
            </p>
          </div>

          <div>
            <h2 className="font-editorial max-w-[1000px] text-[clamp(48px,7vw,104px)] leading-[0.98] tracking-[-0.045em]">
              Every {collection.title.toLowerCase()} project
              begins with your space,
              not a standard specification.
            </h2>

            <p className="body-lg mt-10 max-w-[580px]">
              Materials, proportions, finishes and details can be
              developed around the wider interior and your individual
              requirements.
            </p>

            <Link
              href="/contact"
              className="group mt-10 flex w-fit items-center gap-5 text-[10px] uppercase tracking-[0.22em]"
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