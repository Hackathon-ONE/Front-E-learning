'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "Udemy", logo: "/logos/udemy.png" },
  { name: "Webflow", logo: "/logos/webflow.png" },
  { name: "Gmail", logo: "/logos/gmail.png" },
  { name: "Vaddy", logo: "/logos/vaddy.png" },
  { name: "Struts", logo: "/logos/struts.png" },
  { name: "Wikilabs", logo: "/logos/wikilabs.png" },
  { name: "Telefónica", logo: "/logos/telefonica.png" },
];

export default function Partners() {
  const [isPaused, setIsPaused] = useState(false);
  const [xPos, setXPos] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setXPos((prev) => {
        const width = containerRef.current?.scrollWidth || 0;
        if (Math.abs(prev) >= width / 2) return 0; // loop infinito
        return prev - 1; // velocidad
      });
    }, 16); // aprox 60fps
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 bg-surface overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-20">
          Nuestros Aliados
        </h2>

        <div
          className="flex gap-12 items-center mb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={containerRef}
            className="flex gap-12 whitespace-nowrap"
            style={{ x: xPos }}
          >
            {/* Repetimos los logos para loop */}
            {[...partners, ...partners].map((p, i) => (
              <div
                key={i}
                className="relative w-32 h-16 flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110"
              >
                <Image
                  aria-label={p.name}
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}