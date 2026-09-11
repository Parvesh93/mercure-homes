// "use client";

// import {
//   ElementType,
//   ReactNode,
//   useEffect,
//   useRef,
// } from "react";

// import { getGSAP } from "../../lib/gsap";

// interface RevealProps {
//   children: ReactNode;
//   className?: string;
//   delay?: number;
//   y?: number;
//   as?: ElementType;
// }

// export default function Reveal({
//   children,
//   className = "",
//   delay = 0,
//   y = 40,
//   as: Component = "div",
// }: RevealProps) {
//   const elementRef = useRef<HTMLElement | null>(null);

//   useEffect(() => {
//     const element = elementRef.current;

//     if (!element) return;

//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     if (reduceMotion) return;

//     const { gsap } = getGSAP();

//     const context = gsap.context(() => {
//       gsap.fromTo(
//         element,
//         {
//           opacity: 0,
//           y,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1.1,
//           delay,
//           ease: "power3.out",
//           scrollTrigger: {
//             trigger: element,
//             start: "top 88%",
//             once: true,
//           },
//         }
//       );
//     });

//     return () => context.revert();
//   }, [delay, y]);

//   return (
//     <Component ref={elementRef} className={className}>
//       {children}
//     </Component>
//   );
// }



"use client";

import {
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { getGSAP } from "../../lib/gsap";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "main"
  | "span"
  | "p";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  as = "div",
}: RevealProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const asideRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const getElement = () => {
    switch (as) {
      case "section":
        return sectionRef.current;

      case "article":
        return articleRef.current;

      case "aside":
        return asideRef.current;

      case "header":
        return headerRef.current;

      case "footer":
        return footerRef.current;

      case "main":
        return mainRef.current;

      case "span":
        return spanRef.current;

      case "p":
        return paragraphRef.current;

      case "div":
      default:
        return divRef.current;
    }
  };

  useEffect(() => {
    const element = getElement();

    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      element.style.opacity = "1";
      element.style.transform = "none";
      return;
    }

    const { gsap } = getGSAP();

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        }
      );
    }, element);

    return () => {
      context.revert();
    };
  }, [as, delay, y]);

  switch (as) {
    case "section":
      return (
        <section
          ref={sectionRef}
          className={className}
        >
          {children}
        </section>
      );

    case "article":
      return (
        <article
          ref={articleRef}
          className={className}
        >
          {children}
        </article>
      );

    case "aside":
      return (
        <aside
          ref={asideRef}
          className={className}
        >
          {children}
        </aside>
      );

    case "header":
      return (
        <header
          ref={headerRef}
          className={className}
        >
          {children}
        </header>
      );

    case "footer":
      return (
        <footer
          ref={footerRef}
          className={className}
        >
          {children}
        </footer>
      );

    case "main":
      return (
        <main
          ref={mainRef}
          className={className}
        >
          {children}
        </main>
      );

    case "span":
      return (
        <span
          ref={spanRef}
          className={className}
        >
          {children}
        </span>
      );

    case "p":
      return (
        <p
          ref={paragraphRef}
          className={className}
        >
          {children}
        </p>
      );

    case "div":
    default:
      return (
        <div
          ref={divRef}
          className={className}
        >
          {children}
        </div>
      );
  }
}