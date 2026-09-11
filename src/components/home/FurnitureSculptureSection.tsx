"use client";

import {
  Suspense,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  ContactShadows,
  Environment,
  Float,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

/* =========================================================
   CHAIR
========================================================= */

function Chair({
  pointer,
}: {
  pointer: {
    x: number;
    y: number;
  };
}) {
  const groupRef =
    useRef<THREE.Group>(null);

  const { scene } = useGLTF(
    "/models/chair.glb"
  );

  useFrame((state, delta) => {
    const group =
      groupRef.current;

    if (!group) return;

    /* -----------------------------------------------
       CONTINUOUS PREMIUM ROTATION
    ----------------------------------------------- */

    group.rotation.y +=
      delta * 0.16;

    /* -----------------------------------------------
       CURSOR INFLUENCE
    ----------------------------------------------- */

    const targetX =
      pointer.y * 0.08;

    const targetZ =
      pointer.x * -0.055;

    group.rotation.x =
      THREE.MathUtils.lerp(
        group.rotation.x,
        targetX,
        0.035
      );

    group.rotation.z =
      THREE.MathUtils.lerp(
        group.rotation.z,
        targetZ,
        0.035
      );

    /* -----------------------------------------------
       VERY SUBTLE BREATHING
    ----------------------------------------------- */

    const breathe =
      Math.sin(
        state.clock.elapsedTime *
          0.75
      ) * 0.015;

    group.position.y =
      breathe;
  });

  return (
    <group
  ref={groupRef}
  scale={1.35}
  position={[0, -0.35, 0]}
>
      <primitive
        object={scene}
      />
    </group>
  );
}

/* =========================================================
   SCENE
========================================================= */

function FurnitureScene({
  pointer,
}: {
  pointer: {
    x: number;
    y: number;
  };
}) {
  return (
    <>
      {/* ambient */}

      <ambientLight
        intensity={1.25}
      />

      {/* key light */}

      <directionalLight
        position={[
          4,
          6,
          5,
        ]}
        intensity={2.2}
      />

      {/* soft opposite fill */}

      <directionalLight
        position={[
          -4,
          2,
          -3,
        ]}
        intensity={0.7}
      />

      {/* environment */}

      <Environment
        preset="studio"
        environmentIntensity={0.6}
      />

      {/* chair */}

      <Float
        speed={1.1}
        rotationIntensity={0}
        floatIntensity={0.16}
        floatingRange={[
          -0.04,
          0.04,
        ]}
      >
        <Chair
          pointer={pointer}
        />
      </Float>

      {/* premium grounded shadow */}

      {/* <ContactShadows
        position={[
          0,
          -1.7,
          0,
        ]}
        opacity={0.22}
        scale={6}
        blur={3}
        far={5}
      /> */}
    </>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

export default function FurnitureSculptureSection() {
  const [
    pointer,
    setPointer,
  ] = useState({
    x: 0,
    y: 0,
  });

  const handlePointerMove = (
    event: React.PointerEvent<HTMLElement>
  ) => {
    if (
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX -
        rect.left) /
        rect.width;

    const y =
      (event.clientY -
        rect.top) /
        rect.height;

    setPointer({
      x:
        (x - 0.5) * 2,

      y:
        (y - 0.5) * 2,
    });
  };

  const handlePointerLeave =
    () => {
      setPointer({
        x: 0,
        y: 0,
      });
    };

  return (
    <section
      data-header-theme="light"
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      className={[
        "relative",
        "min-h-[90svh]",
        "overflow-hidden",
        "bg-[var(--ivory-vein)]",
        "text-[var(--obsidian-slate)]",
      ].join(" ")}
    >
      {/* =================================================
          SUBTLE BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* warm centre glow */}

        <div
          className={[
            "absolute",
            "left-1/2",
            "top-1/2",
            "h-[55vw]",
            "max-h-[760px]",
            "w-[55vw]",
            "max-w-[760px]",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "rounded-full",
            "bg-[var(--gilded-ochre)]/[0.025]",
            "blur-[120px]",
          ].join(" ")}
        />

        {/* vertical architecture line */}

        <div className="absolute left-1/2 top-[10%] h-[80%] w-px bg-[var(--walnut-patina)]/[0.06]" />

        {/* horizontal architecture line */}

        <div className="absolute left-[8%] top-1/2 h-px w-[84%] bg-[var(--walnut-patina)]/[0.06]" />
      </div>

      {/* =================================================
          LABEL
      ================================================== */}

      <div
        className={[
          "site-container",
          "absolute",
          "left-1/2",
          "top-[clamp(80px,9vw,130px)]",
          "z-20",
          "-translate-x-1/2",
        ].join(" ")}
      >
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-[var(--brand-gold)]" />

          <p className="eyebrow !text-[var(--brand-gold)]">
            Sculpt
          </p>
        </div>
      </div>

      {/* =================================================
          LARGE BACKGROUND WORD
      ================================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute",
          "left-1/2",
          "top-1/2",
          "z-[1]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "select-none",
          "font-heading",
          "text-[clamp(120px,22vw,380px)]",
          "leading-none",
          "tracking-[-0.08em]",
          "text-[var(--walnut-patina)]/[0.025]",
        ].join(" ")}
      >
        SCULPT
      </div>

      {/* =================================================
          ORBIT
      ================================================== */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none",
          "absolute",
          "left-1/2",
          "top-1/2",
          "z-[2]",
          "h-[min(52vw,680px)]",
          "w-[min(52vw,680px)]",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "rounded-full",
          "border",
          "border-[var(--brand-gold)]/[0.14]",
          "max-md:h-[78vw]",
          "max-md:w-[78vw]",
        ].join(" ")}
      >
        {/* orbit marker */}

        <span
          className={[
            "absolute",
            "left-1/2",
            "top-[-5px]",
            "h-[9px]",
            "w-[9px]",
            "-translate-x-1/2",
            "rounded-full",
            "bg-[var(--brand-gold)]",
            "shadow-[0_0_0_6px_rgba(194,151,71,0.08)]",
          ].join(" ")}
        />
      </div>

      {/* =================================================
          THREE.JS CANVAS
      ================================================== */}

      <div className="absolute inset-0 z-10">
        <Canvas
          dpr={[1, 1.7]}
  camera={{
    position: [0, 0.15, 6.5],
    fov: 38,
  }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping:
              THREE.ACESFilmicToneMapping,
            toneMappingExposure:
              1,
          }}
        >
          <Suspense
            fallback={null}
          >
            <FurnitureScene
              pointer={
                pointer
              }
            />
          </Suspense>
        </Canvas>
      </div>

      {/* =================================================
          BOTTOM MICRO DETAILS
      ================================================== */}

      <div
        className={[
          "site-container",
          "pointer-events-none",
          "absolute",
          "bottom-[clamp(40px,6vw,80px)]",
          "left-1/2",
          "z-20",
          "-translate-x-1/2",
        ].join(" ")}
      >
        <div
          className={[
            "flex",
            "items-end",
            "justify-between",
          ].join(" ")}
        >
          <div>
            <span className="block h-px w-10 bg-[var(--brand-gold)]/70" />
          </div>

          <p
            className={[
              "hidden",
              "text-[8px]",
              "uppercase",
              "tracking-[0.24em]",
              "text-[var(--walnut-patina)]/36",
              "md:block",
            ].join(" ")}
          >
            Move to interact
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PRELOAD
========================================================= */

useGLTF.preload(
  "/models/chair.glb"
);