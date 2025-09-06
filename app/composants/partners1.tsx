"use client";

import Image from 'next/image';
import GradientText from "@/components/GradientText";
const partners = [
  { name: "ORANGE", image: "/partner/ORANGE.png" },
  { name: "MTN", image: "/partner/MTN.png" },
  { name: "MOOV", image: "/partner/Moov.png" },
  { name: "CIE", image: "/partner/CIE.jpg" },
];

export function Partners1() {
  return (
    <section id="partners">
      <div className="mt-8">
        <div className="container mx-auto px-4 md:px-8">
            <GradientText className="text-start text-xl font-semibold">
  Nos partenaires
</GradientText>
          
          <div className="relative mt-6 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-scroll">
              {/* Premier groupe de partenaires */}
              <div className="flex min-w-full flex-shrink-0 items-center justify-around gap-12">
                {partners.map((partner, idx) => (
                  <div key={`first-${idx}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32">
                    <Image
                      src={partner.image}
                      alt={`Logo ${partner.name}`}
                      width={120}
                      height={60}
                      className="object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
              {/* Deuxième groupe de partenaires (pour la continuité) */}
              <div className="flex min-w-full flex-shrink-0 items-center justify-around gap-12">
                {partners.map((partner, idx) => (
                  <div key={`second-${idx}`} className="flex-shrink-0 flex items-center justify-center h-16 w-32">
                    <Image
                      src={partner.image}
                      alt={`Logo ${partner.name}`}
                      width={120}
                      height={60}
                      className="object-contain transition-all duration-300"
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