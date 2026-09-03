"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { getGSAP } from "../../lib/gsap";

const materialItems = [
  {
    number: "01",
    name: "Natural Stone",
  },
  {
    number: "02",
    name: "Wood",
  },
  {
    number: "03",
    name: "Metal",
  },
  {
    number: "04",
    name: "Textile",
  },
];

export default function MaterialSculpture() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { gsap } = getGSAP();

    /* =====================================================
       THREE SETUP
    ===================================================== */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      32,
      1,
      0.1,
      100
    );

    camera.position.set(0, 0.1, 8.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setClearColor(0x000000, 0);

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type =
      THREE.PCFSoftShadowMap;

    /* =====================================================
       TEXTURES
    ===================================================== */

    const textureLoader =
      new THREE.TextureLoader();

    const stoneTexture =
      textureLoader.load(
        "/images/materials/stone.jpg"
      );

    const woodTexture =
      textureLoader.load(
        "/images/materials/wood.jpg"
      );

    const metalTexture =
      textureLoader.load(
        "/images/materials/metal.jpg"
      );

    const textileTexture =
      textureLoader.load(
        "/images/materials/textile.jpg"
      );

    const textures = [
      stoneTexture,
      woodTexture,
      metalTexture,
      textileTexture,
    ];

    textures.forEach((texture) => {
      texture.colorSpace =
        THREE.SRGBColorSpace;

      texture.wrapS =
        THREE.RepeatWrapping;

      texture.wrapT =
        THREE.RepeatWrapping;

      texture.anisotropy = Math.min(
        renderer.capabilities.getMaxAnisotropy(),
        8
      );
    });

    stoneTexture.repeat.set(1.2, 1.2);
    woodTexture.repeat.set(1.8, 1.8);
    metalTexture.repeat.set(2.2, 2.2);
    textileTexture.repeat.set(2.6, 2.6);

    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.25
      );

    scene.add(ambientLight);

    const keyLight =
      new THREE.DirectionalLight(
        0xfff5e8,
        3.4
      );

    keyLight.position.set(
      4.5,
      5,
      6
    );

    keyLight.castShadow = true;

    scene.add(keyLight);

    const fillLight =
      new THREE.DirectionalLight(
        0xd4c8ba,
        1.7
      );

    fillLight.position.set(
      -5,
      2,
      3
    );

    scene.add(fillLight);

    const rimLight =
      new THREE.DirectionalLight(
        0xffffff,
        1.3
      );

    rimLight.position.set(
      1,
      -4,
      -3
    );

    scene.add(rimLight);

    const warmLight =
      new THREE.PointLight(
        0xd3a77d,
        5,
        10
      );

    warmLight.position.set(
      -3,
      2,
      4
    );

    scene.add(warmLight);

    /* =====================================================
       SCULPTURE
    ===================================================== */

    const sculpture =
      new THREE.Group();

    scene.add(sculpture);

    /*
     * Base orientation.
     *
     * Pointer + drag values are added on top
     * of these values in the render loop.
     */
    const baseRotation = {
      x: -0.27,
      y: -0.38,
      z: -0.045,
    };

    sculpture.rotation.set(
      baseRotation.x,
      baseRotation.y,
      baseRotation.z
    );

    /*
     * Slightly different dimensions make
     * the object look more like a material
     * study than four identical shelves.
     */

    const geometries = [
      new THREE.BoxGeometry(
        4.05,
        0.22,
        2.62,
        16,
        2,
        16
      ),

      new THREE.BoxGeometry(
        3.75,
        0.2,
        2.45,
        16,
        2,
        16
      ),

      new THREE.BoxGeometry(
        4.2,
        0.16,
        2.25,
        16,
        2,
        16
      ),

      new THREE.BoxGeometry(
        3.55,
        0.24,
        2.72,
        16,
        2,
        16
      ),
    ];

    const stoneMaterial =
      new THREE.MeshStandardMaterial({
        map: stoneTexture,
        roughness: 0.74,
        metalness: 0.02,
      });

    const woodMaterial =
      new THREE.MeshStandardMaterial({
        map: woodTexture,
        roughness: 0.69,
        metalness: 0.01,
      });

    const metalMaterial =
      new THREE.MeshStandardMaterial({
        map: metalTexture,
        roughness: 0.34,
        metalness: 0.66,
      });

    const textileMaterial =
      new THREE.MeshStandardMaterial({
        map: textileTexture,
        roughness: 0.96,
        metalness: 0,
      });

    const threeMaterials = [
      stoneMaterial,
      woodMaterial,
      metalMaterial,
      textileMaterial,
    ];

    const meshes =
      threeMaterials.map(
        (material, index) => {
          const mesh =
            new THREE.Mesh(
              geometries[index],
              material
            );

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          return mesh;
        }
      );

    /*
     * Resting composition.
     *
     * Includes small X/Z offsets so the
     * layers aren't perfectly stacked.
     */

    const restingPositions = [
      {
        x: 0.15,
        y: 0.42,
        z: 0.05,
        r: -0.035,
      },

      {
        x: -0.18,
        y: 0.14,
        z: -0.06,
        r: 0.025,
      },

      {
        x: 0.08,
        y: -0.14,
        z: 0.08,
        r: -0.055,
      },

      {
        x: -0.12,
        y: -0.42,
        z: -0.04,
        r: 0.04,
      },
    ];

    meshes.forEach(
      (mesh, index) => {
        const position =
          restingPositions[index];

        mesh.position.set(
          position.x,
          position.y,
          position.z
        );

        mesh.rotation.z =
          position.r;

        sculpture.add(mesh);
      }
    );

    /* =====================================================
       SHADOW
    ===================================================== */

    const groundGeometry =
      new THREE.PlaneGeometry(
        7,
        5
      );

    const groundMaterial =
      new THREE.ShadowMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.1,
      });

    const ground =
      new THREE.Mesh(
        groundGeometry,
        groundMaterial
      );

    ground.rotation.x =
      -Math.PI / 2;

    ground.position.set(
      0,
      -1.48,
      0
    );

    ground.receiveShadow = true;

    scene.add(ground);

    /* =====================================================
       RESIZE
    ===================================================== */

    const resize = () => {
      const parent =
        canvas.parentElement;

      if (!parent) return;

      const width =
        parent.clientWidth;

      const height =
        parent.clientHeight;

      renderer.setSize(
        width,
        height,
        false
      );

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    /* =====================================================
       INTERACTION STATE
    ===================================================== */

    /*
     * Mouse-follow rotation.
     */

    const pointerTarget = {
      x: 0,
      y: 0,
    };

    const pointerCurrent = {
      x: 0,
      y: 0,
    };

    /*
     * Manual drag rotation.
     */

    const dragRotation = {
      x: 0,
      y: 0,
    };

    /*
     * Rotational velocity used after
     * pointer release for inertia.
     */

    const velocity = {
      x: 0,
      y: 0,
    };

    let isDragging = false;
    let pointerId:
      number | null = null;

    let previousX = 0;
    let previousY = 0;

    /* =====================================================
       MOUSE FOLLOW
    ===================================================== */

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      if (
        reduceMotion ||
        isDragging
      ) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside) {
        pointerTarget.x = 0;
        pointerTarget.y = 0;
        return;
      }

      pointerTarget.x =
        ((event.clientX -
          rect.left) /
          rect.width -
          0.5) *
        2;

      pointerTarget.y =
        ((event.clientY -
          rect.top) /
          rect.height -
          0.5) *
        2;
    };

    const handleSectionLeave = () => {
      if (isDragging) return;

      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    section.addEventListener(
      "mouseleave",
      handleSectionLeave
    );

    /* =====================================================
       CLICK / TOUCH DRAG
    ===================================================== */

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (reduceMotion) return;

      isDragging = true;

      pointerId =
        event.pointerId;

      previousX =
        event.clientX;

      previousY =
        event.clientY;

      velocity.x = 0;
      velocity.y = 0;

      pointerTarget.x = 0;
      pointerTarget.y = 0;

      canvas.setPointerCapture(
        event.pointerId
      );

      canvas.classList.add(
        "is-dragging"
      );
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (
        !isDragging ||
        pointerId !==
          event.pointerId
      ) {
        return;
      }

      const deltaX =
        event.clientX -
        previousX;

      const deltaY =
        event.clientY -
        previousY;

      previousX =
        event.clientX;

      previousY =
        event.clientY;

      /*
       * Drag sensitivity.
       */

      const sensitivity = 0.006;

      dragRotation.y +=
        deltaX * sensitivity;

      dragRotation.x +=
        deltaY * sensitivity;

      /*
       * Limit vertical flipping.
       *
       * Horizontal rotation is deliberately
       * unrestricted.
       */

      dragRotation.x =
        THREE.MathUtils.clamp(
          dragRotation.x,
          -0.75,
          0.75
        );

      /*
       * Save velocity for inertia.
       */

      velocity.y =
        deltaX * sensitivity;

      velocity.x =
        deltaY * sensitivity;
    };

    const endDrag = (
      event: PointerEvent
    ) => {
      if (
        pointerId !== null &&
        event.pointerId !==
          pointerId
      ) {
        return;
      }

      isDragging = false;

      if (
        pointerId !== null &&
        canvas.hasPointerCapture(
          pointerId
        )
      ) {
        canvas.releasePointerCapture(
          pointerId
        );
      }

      pointerId = null;

      canvas.classList.remove(
        "is-dragging"
      );
    };

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    canvas.addEventListener(
      "pointermove",
      handlePointerMove
    );

    canvas.addEventListener(
      "pointerup",
      endDrag
    );

    canvas.addEventListener(
      "pointercancel",
      endDrag
    );

    /* =====================================================
       RENDER LOOP
    ===================================================== */

    const clock =
      new THREE.Clock();

    let frameId = 0;

    const render = () => {
      const time =
        clock.getElapsedTime();

      if (!reduceMotion) {
        /*
         * Smooth passive cursor-follow.
         */

        pointerCurrent.x +=
          (pointerTarget.x -
            pointerCurrent.x) *
          0.04;

        pointerCurrent.y +=
          (pointerTarget.y -
            pointerCurrent.y) *
          0.04;

        /*
         * Inertia after pointer release.
         */

        if (!isDragging) {
          dragRotation.y +=
            velocity.y;

          dragRotation.x +=
            velocity.x;

          velocity.x *= 0.94;
          velocity.y *= 0.94;

          /*
           * Kill extremely small movement.
           */

          if (
            Math.abs(velocity.x) <
            0.00001
          ) {
            velocity.x = 0;
          }

          if (
            Math.abs(velocity.y) <
            0.00001
          ) {
            velocity.y = 0;
          }
        }

        /*
         * Keep vertical drag safe.
         */

        dragRotation.x =
          THREE.MathUtils.clamp(
            dragRotation.x,
            -0.75,
            0.75
          );

        /*
         * Final rotation =
         *
         * base orientation
         * + pointer follow
         * + manual drag
         */

        sculpture.rotation.y =
          baseRotation.y +
          pointerCurrent.x *
            0.15 +
          dragRotation.y;

        sculpture.rotation.x =
          baseRotation.x -
          pointerCurrent.y *
            0.1 +
          dragRotation.x;

        sculpture.rotation.z =
          baseRotation.z +
          pointerCurrent.x *
            0.025;

        /*
         * Extremely subtle breathing.
         */

        sculpture.position.y =
          Math.sin(
            time * 0.55
          ) * 0.025;
      }

      renderer.render(
        scene,
        camera
      );

      frameId =
        requestAnimationFrame(
          render
        );
    };

    render();

    /* =====================================================
       GSAP SCROLL ANIMATIONS
    ===================================================== */

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      gsap.fromTo(
        ".material-heading",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        sculpture.scale,
        {
          x: 0.8,
          y: 0.8,
          z: 0.8,
        },
        {
          x: 1,
          y: 1,
          z: 1,

          duration: 1.5,
          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".material-canvas",
            start: "top 82%",
            once: true,
          },
        }
      );

      /*
       * Scroll-driven decomposition.
       */

      const separatedPositions = [
        {
          x: 0.42,
          y: 0.95,
          z: 0.15,
          r: -0.09,
        },

        {
          x: -0.28,
          y: 0.32,
          z: -0.12,
          r: 0.065,
        },

        {
          x: 0.3,
          y: -0.32,
          z: 0.18,
          r: -0.085,
        },

        {
          x: -0.38,
          y: -0.95,
          z: -0.1,
          r: 0.075,
        },
      ];

      meshes.forEach(
        (mesh, index) => {
          const separated =
            separatedPositions[
              index
            ];

          gsap.to(
            mesh.position,
            {
              x: separated.x,
              y: separated.y,
              z: separated.z,

              ease: "none",

              scrollTrigger: {
                trigger:
                  ".material-canvas",

                start:
                  "top 72%",

                end:
                  "bottom 38%",

                scrub: 1.15,
              },
            }
          );

          gsap.to(
            mesh.rotation,
            {
              z: separated.r,

              ease: "none",

              scrollTrigger: {
                trigger:
                  ".material-canvas",

                start:
                  "top 72%",

                end:
                  "bottom 38%",

                scrub: 1.15,
              },
            }
          );
        }
      );

      gsap.fromTo(
        ".material-legend-item",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,

          duration: 0.8,
          stagger: 0.1,

          ease: "power3.out",

          scrollTrigger: {
            trigger:
              ".material-legend",

            start: "top 88%",
            once: true,
          },
        }
      );
    }, section);

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      ctx.revert();

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      section.removeEventListener(
        "mouseleave",
        handleSectionLeave
      );

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      canvas.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      canvas.removeEventListener(
        "pointerup",
        endDrag
      );

      canvas.removeEventListener(
        "pointercancel",
        endDrag
      );

      cancelAnimationFrame(
        frameId
      );

      geometries.forEach(
        (geometry) =>
          geometry.dispose()
      );

      groundGeometry.dispose();

      stoneMaterial.dispose();
      woodMaterial.dispose();
      metalMaterial.dispose();
      textileMaterial.dispose();

      groundMaterial.dispose();

      textures.forEach(
        (texture) =>
          texture.dispose()
      );

      renderer.dispose();
    };
  }, []);

  return (
  <section
    ref={sectionRef}
    data-header-theme="light"
    className={[
      "relative overflow-hidden",
      "bg-[var(--alabaster-mist)]",
      "py-[clamp(120px,13vw,210px)]",
      "text-[var(--obsidian-slate)]",
    ].join(" ")}
  >
    {/* Giant background word */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap"
    >
      <span
        className={[
          "font-heading",
          "text-[clamp(130px,20vw,360px)]",
          "leading-none",
          "tracking-[-0.06em]",
          "text-[var(--walnut-patina)]/[0.025]",
        ].join(" ")}
      >
        MATERIAL
      </span>
    </div>

    {/* subtle warmth */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute left-[8%] top-[18%] h-[320px] w-[320px] rounded-full bg-[var(--gilded-ochre)]/[0.035] blur-[120px]" />

      <div className="absolute bottom-[8%] right-[8%] h-[300px] w-[300px] rounded-full bg-[var(--caramel-bronze)]/[0.025] blur-[120px]" />
    </div>

    <div className="site-container relative z-10">
      {/* Intro */}
      <div className="material-heading grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-[var(--brand-gold)]" />

            <p className="eyebrow !text-[var(--brand-gold)]">
              Material Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-10">
          <h2
            className={[
              "max-w-[900px]",
              "text-[clamp(48px,6vw,92px)]",
              "leading-[0.96]",
              "tracking-[-0.05em]",
              "text-[var(--obsidian-slate)]",
            ].join(" ")}
          >
            <span className="font-heading">
              Materials are part
            </span>

            <br />

            <span className="font-editorial tracking-[-0.035em]">
              of the architecture.
            </span>
          </h2>

          <div className="hidden items-center gap-4 pt-3 xl:flex">
            <span className="h-[5px] w-[5px] rounded-full bg-[var(--brand-gold)]" />

            <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--walnut-patina)]/48">
              Drag to explore
            </span>
          </div>
        </div>
      </div>

      {/* 3D Stage */}
      <div className="material-canvas relative mt-[clamp(45px,5vw,75px)]">
        <div className="relative h-[500px] w-full md:h-[620px] lg:h-[700px]">
          <canvas
            ref={canvasRef}
            data-cursor="Drag"
            className="material-3d-canvas absolute inset-0 h-full w-full touch-pan-y"
          />

          {/* Left meta */}
          <div className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 lg:block">
            <p className="text-[8px] uppercase tracking-[0.24em] text-[var(--walnut-patina)]/42">
              Material Study
            </p>

            <p className="mt-3 font-heading text-[13px] tracking-[0.18em] text-[var(--walnut-patina)]/58">
              01 — 04
            </p>
          </div>

          {/* Right copy */}
          <div className="pointer-events-none absolute bottom-10 right-0 hidden max-w-[290px] lg:block">
            <span className="mb-5 block h-px w-12 bg-[var(--brand-gold)]/65" />

            <p className="text-[13px] leading-[1.85] text-[var(--walnut-patina)]/60">
              Move or drag the material
              composition to explore its
              surfaces and depth.
            </p>
          </div>
        </div>
      </div>

      {/* Material legend */}
      <div className="material-legend grid border-t border-[var(--walnut-patina)]/15 sm:grid-cols-2 lg:grid-cols-4">
        {materialItems.map((material, index) => (
          <div
            key={material.name}
            className={[
              "material-legend-item",
              "flex items-center justify-between",
              "border-b border-[var(--walnut-patina)]/10",
              "py-7",

              index % 2 === 0
                ? "sm:pr-6"
                : "sm:px-6",

              index !== materialItems.length - 1
                ? "lg:border-r lg:border-[var(--walnut-patina)]/10"
                : "",

              "lg:border-b-0",
            ].join(" ")}
          >
            <span className="text-[9px] tracking-[0.2em] text-[var(--brand-gold)]">
              {material.number}
            </span>

            <span className="font-heading text-[20px] tracking-[-0.03em] text-[var(--obsidian-slate)]">
              {material.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <p className="max-w-[520px] text-[13px] leading-[1.85] text-[var(--walnut-patina)]/55">
          Material combinations shown are illustrative.
          Every Mercure palette is developed around the
          individual project and its wider interior language.
        </p>
      </div>
    </div>
  </section>
);
}