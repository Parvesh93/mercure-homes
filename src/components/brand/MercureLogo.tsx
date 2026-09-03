import Image from "next/image";

type LogoVariant =
  | "full-black"
  | "full-white"
  | "full-gold"
  | "wordmark-black"
  | "wordmark-white"
  | "m-black"
  | "m-white"
  | "square-black"
  | "square-white";

interface MercureLogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const logoMap: Record<
  LogoVariant,
  {
    src: string;
    width: number;
    height: number;
    alt: string;
  }
> = {
  "full-black": {
    src: "/brand/logos/mercure-full-black.svg",
    width: 328,
    height: 109,
    alt: "Mercure Homes",
  },

  "full-white": {
    src: "/brand/logos/mercure-full-white.svg",
    width: 328,
    height: 109,
    alt: "Mercure Homes",
  },

  "full-gold": {
    src: "/brand/logos/mercure-full-gold.svg",
    width: 328,
    height: 109,
    alt: "Mercure Homes",
  },

  "wordmark-black": {
    src: "/brand/logos/mercure-wordmark-black.svg",
    width: 328,
    height: 66,
    alt: "Mercure",
  },

  "wordmark-white": {
    src: "/brand/logos/mercure-wordmark-white.svg",
    width: 328,
    height: 66,
    alt: "Mercure",
  },

  "m-black": {
    src: "/brand/logos/mercure-m-black.svg",
    width: 75,
    height: 62,
    alt: "Mercure Homes",
  },

  "m-white": {
    src: "/brand/logos/mercure-m-white.svg",
    width: 75,
    height: 62,
    alt: "Mercure Homes",
  },

  "square-black": {
    src: "/brand/logos/mercure-square-black.svg",
    width: 131,
    height: 131,
    alt: "Mercure Homes",
  },

  "square-white": {
    src: "/brand/logos/mercure-square-white.svg",
    width: 131,
    height: 131,
    alt: "Mercure Homes",
  },
};

export default function MercureLogo({
  variant = "full-black",
  className = "",
  priority = false,
}: MercureLogoProps) {
  const logo = logoMap[variant];

  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={[
        "h-auto w-auto object-contain",
        className,
      ].join(" ")}
    />
  );
}