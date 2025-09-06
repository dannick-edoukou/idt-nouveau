"use client";

import Image from 'next/image';

const partners = [
{
    name: "RTI 1",
    image: "/chaines/rti.png",
 
  },
  {
    name: "RTI 2",
    image: "/chaines/rti2.png",
 
  },
  {
    name: "NCI",
    image: "/chaines/nci.png",
 
  },
  {
    name: "La 3",
    image: "/chaines/la3.png",
 
  },
  {
    name: "Life TV",
    image: "/chaines/lifetv.png",
   
  },
  {
    name: "A+ Ivoire",
    image: "/chaines/aivoire.jpg",
 
  },
  {
    name: "7 Info",
    image: "/chaines/7info.jpg",
 
  },
  {
    name: "Easy TV",
    image: "/chaines/easy.jpg",
  
  },

];

export function Partners2() {
  return (
    <section id="partners2">
      <div >
        <div className="container mx-auto px-4 md:px-8">      
          <div className="relative mt-6 overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex animate-scroll-2">
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
        @keyframes scroll-2 {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-2 {
          animation: scroll-2 20s linear infinite;
        }
        
        .animate-scroll-2:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}