"use client";

import { motion } from "framer-motion";

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Netflix",
    "YouTube",
    "Instagram",
    "Uber",
    "Spotify",
  ];
  
  export function Partners() {
    return (
      <section id="companies">
        <div className="py-14">
          <div className="container mx-auto px-4 md:px-8">
            <h3 className="text-center text-sm font-semibold text-gray-500">
            Nos partenaires
            </h3>
            <div className="relative mt-6 overflow-hidden">
              <motion.div
                className="flex space-x-8 md:space-x-12"
                animate={{
                  x: [0, -1000],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...companies, ...companies].map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0"
                  >
                    <img
                      src={`https://cdn.magicui.design/companies/${logo}.svg`}
                      className="h-10 w-40 px-2 dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                      alt={logo}
                    />
                  </div>
                ))}
              </motion.div>
              <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  