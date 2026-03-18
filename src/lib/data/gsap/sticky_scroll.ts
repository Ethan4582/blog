import type { PostContent } from "../../types";
import { assets } from "../../asset_data";


export const stickyScrollData: PostContent = {
  author: "SinghAshir65848",
  date: "March 19, 2026",
  difficulty: "Intermediate",
  introduction:
  "A popular GSAP ScrollTrigger animation with scroll-driven stacked sections and smooth transitions. Built in Next.js with optional scaling and hero fade for a clean storytelling effect.",
  liveDemo: "https://t7labs-demo.pages.dev/gallery/sticky-scroll-trigger",
  sourceCode: "https://github.com/Ethan4582/demo-t7labs/tree/master/src/components/StickyScroll",
   notes: "If you face any issues, refer to the working source code provided.",
   image: assets.tutorials.stickyScroll.image,
 videoDemo:assets.tutorials.stickyScroll.gif,
  sections: [
    {
      id: "initializing-project",
      title: "Initializing the project",
      content: [
        {
          type: "paragraph",
          text: "Start by creating a new Next.js application and install GSAP:",
        },
        {
          type: "code",
          language: "bash",
          code: "npx create-next-app@latest sticky-scroll\ncd sticky-scroll\nnpm install gsap",
        },
      ],
    },
    {
      id: "component-structure",
      title: "Component structure",
      content: [
        {
          type: "paragraph",
          text: "Create a folder `components/StickyScroll` with the following files:",
        },
        {
          type: "code",
          language: "plaintext",
          code: `components/
  StickyScroll/
    StickyScroll.tsx
    StickyScroll.module.css
    ControlScroll.tsx   (optional toggle button)`,
        },
        {
          type: "paragraph",
          text: "The main component accepts optional props for images, a scaling flag, and a title. If no images are provided, it falls back to a set of placeholder images from picsum.",
        },
      ],
    },
    {
      id: "styling",
      title: "Styling with CSS modules",
      content: [
        {
          type: "paragraph",
          text: "The styles define full‑viewport sections, absolute positioning for images, and the large hero text. Note that we avoid global selectors to keep the component isolated.",
        },
        {
          type: "code",
          name: "StickyScroll.module.css",
          language: "css",
          code: `.container {
  width: 100%;
}

/* ✅ FIXED: no global selector */
.section {
  width: 100%;
  height: 100vh;
  position: relative;
}

.hero h1 {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: 400;
  font-size: 200px;
  color: #fff;
  letter-spacing: -8px;
  line-height: 90%;
  z-index: 2;
}

.card.scroll {
  position: relative;
}

.img {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 1000px;
  height: 700px;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* GSAP hooks */
.pinned {}
.scroll {}
.hero {}
.card {}
          `,
        },
      ],
    },
    {
      id: "core-animation-logic",
      title: "Core animation logic (GSAP ScrollTrigger)",
      content: [
        {
          type: "paragraph",
          text: "The `useEffect` sets up GSAP context and creates ScrollTrigger instances for each pinned section. It also handles the optional scaling of images and the hero text fade.",
        },
        {
          type: "code",
          name: "StickyScroll.tsx",
          language: "tsx",
          code: `"use client";

import { useEffect, useRef } from "react";
import { Instrument_Serif } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StickyScroll.module.css";

gsap.registerPlugin(ScrollTrigger);

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});

const fallbackImages: string[] = [
  "https://picsum.photos/id/1069/900/1200",
  "https://picsum.photos/id/1071/900/1200",
  "https://picsum.photos/id/1076/900/1200",
  "https://picsum.photos/id/1079/900/1200",
  "https://picsum.photos/id/1068/900/1200",
  "https://picsum.photos/id/1067/900/1200",
  "https://picsum.photos/id/1050/900/1200",
  "https://picsum.photos/id/1065/900/1200",
];

type Props = {
  images?: string[];
  enableScale?: boolean;
  title?: string;
};

export default function StickyScroll({
  images,
  enableScale = false,
  title = "ScrollTrigger",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const safeImages = images && images.length > 0 ? images : fallbackImages;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const lastCard = containerRef.current!.querySelector(
        \`.\${styles.scroll}\`
      ) as HTMLElement;

      const pinnedSections = gsap.utils.toArray<HTMLElement>(
        \`.\${styles.pinned}\`
      );

      pinnedSections.forEach((section, index, sections) => {
        const img = section.querySelector(\`.\${styles.img}\`) as HTMLElement;
        const nextSection = sections[index + 1] || lastCard;

        const endScalePoint = \`top+=\${nextSection.offsetTop - section.offsetTop} top\`;

        // Pin the section
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              index === sections.length - 1
                ? \`+=\${lastCard.offsetHeight}\`
                : \`+=\${document.body.offsetHeight}\`,
            pin: true,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Optional scale effect on the image
        if (enableScale && img) {
          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: endScalePoint,
                scrub: 1,
              },
            }
          );
        }
      });

      // Hero text fade-out
      const heroH1 = containerRef.current!.querySelector(
        \`.\${styles.hero} h1\`
      ) as HTMLElement | null;

      if (heroH1) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=400vh",
          scrub: 1,
          onUpdate: (self) => {
            heroH1.style.opacity = \`\${1 - self.progress}\`;
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [enableScale, safeImages]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        backgroundImage:
          "url(https://pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev/good_bg/black_glass.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Hero section */}
      <section className={\`\${styles.section} \${styles.hero} \${styles.pinned}\`}>
        <div className={styles.img} />
        <h1 className={instrumentSerif.className}>{title}</h1>
      </section>

      {/* Image cards (all but last are pinned) */}
      {safeImages.slice(0, -1).map((src, i) => (
        <section
          key={i}
          className={\`\${styles.section} \${styles.card} \${styles.pinned}\`}
        >
          <div className={styles.img}>
            <img src={src} alt={\`img-\${i}\`} />
          </div>
        </section>
      ))}

      {/* Last card (not pinned, allows final scroll) */}
      <section
        className={\`\${styles.section} \${styles.card} \${styles.scroll}\`}
      >
        <div className={styles.img}>
          <img src={safeImages[safeImages.length - 1]} alt="last" />
        </div>
      </section>
    </div>
  );
}`,
        },
        {
          type: "paragraph",
          text: "The `pinned` sections are pinned to the viewport while the next section catches up. The optional `enableScale` prop toggles the image scaling animation, which shrinks each image as its section is scrolled past.",
        },
      ],
    },
    {
      id: "control-button",
      title: "Optional control button",
      content: [
        {
          type: "paragraph",
          text: "To dynamically enable or disable the scaling effect, you can wrap the component with a simple toggle button. This demonstrates how the component responds to prop changes.",
        },
        {
          type: "code",
          name: "ControlScroll.tsx",
          language: "tsx",
          code: `"use client";

import React, { useState } from "react";
import StickyScroll from "./StickyScroll";

export default function ControlScroll() {
  const [enableScale, setEnableScale] = useState(false);

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed bottom-8 left-8 z-[100]">
        <button
          onClick={() => setEnableScale(!enableScale)}
          className="px-5 py-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-lg border border-white/10 text-white rounded-full text-[11px] font-medium tracking-widest uppercase transition-all active:scale-95 shadow-2xl"
        >
          {enableScale ? "Disable Stacking" : "Enable Stacking"}
        </button>
      </div>

      <StickyScroll enableScale={enableScale} />
    </div>
  );
}`,
        },
      ],
    },
    {
      id: "using-the-component",
      title: "Using the component",
      content: [
        {
          type: "paragraph",
          text: "Simply import the component (with or without the control wrapper) into any page. Ensure the page uses the `'use client'` directive if you're in the App Router.",
        },
        {
          type: "code",
          name: "app/page.tsx",
          language: "tsx",
          code: `import ControlScroll from '@/components/StickyScroll/ControlScroll';

export default function Home() {
  return (
    <main>
      <ControlScroll />
    </main>
  );
}`,
        },
        {
          type: "paragraph",
          text: "You can also pass custom image URLs and a title directly to `StickyScroll` if you don't need the toggle:",
        },
        {
          type: "code",
          language: "tsx",
          code: `<StickyScroll 
  images={['/custom1.jpg', '/custom2.jpg']} 
  title="My Story" 
  enableScale={true}
/>`,
        },
        {
          type: "paragraph",
          text: "The component automatically falls back to placeholder images, so it works out of the box.",
        },
      ],
    },
     {
  id: "wrapping-up",
  title: "Wrapping Up",
  content: [
    {
      type: "paragraph",
      text: "This project draws inspiration from various creative studio/Agency website"
    },
  ],
}
  ],
};