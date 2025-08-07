"use client";

import Image from 'next/image';

const partners = [
  { name: "ORANGE", image: "/partner/ORANGE.png" },
  { name: "MTN", image: "/partner/MTN.png" },
  { name: "MOOV", image: "/partner/Moov.png" },
  { name: "CIE", image: "/partner/CIE.png" },
];

export function Partners() {
  return (
    <section id="partners">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            Nos partenaires
          </h3>
          <div className="relative mt-6 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-scroll">
              {/* Premier groupe de partenaires */}
              <div className="flex min-w-full flex-shrink-0 items-center justify-around gap-12">
                {partners.map((partner, idx) => (
                  <div key={`first-${idx}`} className="flex-shrink-0">
                    <Image
                      src={partner.image}
                      width={160}
                      height={40}
                       className="h-10 sm:h-20 w-auto px-2 dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                      alt={partner.name}
                    />
                  </div>
                ))}
              </div>
              {/* Deuxième groupe de partenaires (pour la continuité) */}
              <div className="flex min-w-full flex-shrink-0 items-center justify-around gap-12">
                {partners.map((partner, idx) => (
                  <div key={`second-${idx}`} className="flex-shrink-0">
                    <Image
                      src={partner.image}
                      width={160}
                      height={40}
                      className="h-10 sm:h-20 w-auto px-2 dark:brightness-0 dark:invert hover:opacity-80 transition-opacity"
                      alt={partner.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}