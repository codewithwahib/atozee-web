// import React from 'react';
// import Image from 'next/image';
// import Navbar from '@/app/Components/navbar';
// import Footer from '@/app/Components/footer';
// import { Roboto, DM_Sans } from 'next/font/google';

// const dmsans = DM_Sans({
//   subsets: ['latin'],
//   weight: '700',
// });

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '700'],
//   variable: '--font-roboto',
//   display: 'swap',
// });

// const SupportServices = () => {
//   return (
//     <>
//       <Navbar />
//       <div className={`w-full px-0 py-12 md:py-16 ${roboto.variable} font-roboto`}>
//         <div className="flex flex-col lg:flex-row gap-0">
//           {/* Text Content - Left Side */}
//           <div className="lg:w-1/2 pl-0">
//             <div className="px-4 sm:px-6">
//               <h1
//                 className={`text-2xl md:text-3xl font-bold text-gray-900 pb-5 border-b pl-6 border-gray-200 tracking-widest ${dmsans.className}`}
//               >
//                 Lighting Distribution Board Solutions
//               </h1>

//               <div className="space-y-5 mt-8 text-gray-800">
//                 <div className="space-y-4 pl-6">
//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
//                     Our specialized lighting distribution boards (LDBs) are engineered for optimal illumination control, featuring modular designs with DIN-rail mounted components. We provide complete solutions including main lighting panels, sub-distribution boards, and final circuit distribution for both conventional and smart lighting systems.
//                   </p>

//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
//                     We integrate advanced lighting control technologies including DALI, KNX, and DMX protocols with circuit protection devices, timers, photocells, and occupancy sensors. Our boards support energy-efficient LED lighting systems with dimming capabilities and daylight harvesting functionality.
//                   </p>

//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
//                     All our lighting distribution solutions comply with IEC 60439 standards and include emergency lighting circuits with automatic transfer switches. We design for commercial complexes, industrial facilities, stadiums, and smart buildings with centralized lighting management capabilities.
//                   </p>
//                 </div>

//                 <div className="mt-8 pt-5 border-t border-gray-200">
//                   <h3
//                     className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
//                   >
//                     Intelligent Lighting Control Systems
//                   </h3>
//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-3 pl-6">
//                     Our solutions feature IoT-enabled monitoring, energy metering per circuit, remote control via BMS integration, and automated lighting scenarios for different zones and usage patterns, ensuring optimal energy efficiency and user comfort.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Image - Right Side */}
//           <div className="lg:w-1/2 flex items-center justify-center pr-6">
//             <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
//               <Image
//                 src="/ld.jpg"
//                 alt="Modern lighting distribution board with circuit breakers, relays, and smart control modules"
//                 width={1500}
//                 height={1100}
//                 className="object-cover w-full h-full"
//                 priority
//                 quality={100}
//                 style={{
//                   objectPosition: 'top center',
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/10 to-transparent" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default SupportServices;


import React from 'react';
import Image from 'next/image';
import Navbar from '@/app/Components/navbar';
import Footer from '@/app/Components/footer';
import { Roboto, DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({
  subsets: ['latin'],
  weight: '700',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const SupportServices = () => {
  return (
    <>
      <Navbar />
      <div className={`w-full px-0 py-10 sm:py-12 md:py-16 ${roboto.variable} font-roboto`}>
        {/* ✅ flex-col-reverse on mobile → image top, text bottom | lg:flex-row → PC layout same */}
        <div className="flex flex-col-reverse lg:flex-row gap-0">

          {/* Text Content - Left Side (mobile pe neeche aayega) */}
          <div className="lg:w-1/2 pl-0">
            <div className="px-4 sm:px-6">
              <h1
                className={`text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 pb-4 sm:pb-5 border-b pl-4 sm:pl-6 border-gray-200 tracking-wider sm:tracking-widest leading-tight ${dmsans.className}`}
              >
                Lighting Distribution Board Solutions
              </h1>

              <div className="space-y-5 mt-6 sm:mt-8 text-gray-800">
                <div className="space-y-4 pl-4 sm:pl-6">
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-2">
                    Our specialized lighting distribution boards (LDBs) are engineered for optimal illumination control, featuring modular designs with DIN-rail mounted components. We provide complete solutions including main lighting panels, sub-distribution boards, and final circuit distribution for both conventional and smart lighting systems.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-2">
                    We integrate advanced lighting control technologies including DALI, KNX, and DMX protocols with circuit protection devices, timers, photocells, and occupancy sensors. Our boards support energy-efficient LED lighting systems with dimming capabilities and daylight harvesting functionality.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-2">
                    All our lighting distribution solutions comply with IEC 60439 standards and include emergency lighting circuits with automatic transfer switches. We design for commercial complexes, industrial facilities, stadiums, and smart buildings with centralized lighting management capabilities.
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pl-4 sm:pl-6 tracking-wider sm:tracking-widest leading-tight ${dmsans.className}`}
                  >
                    Intelligent Lighting Control Systems
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-3 pl-4 sm:pl-6">
                    Our solutions feature IoT-enabled monitoring, energy metering per circuit, remote control via BMS integration, and automated lighting scenarios for different zones and usage patterns, ensuring optimal energy efficiency and user comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side (mobile pe sabse pehle aayegi) */}
          <div className="lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:pr-6 mb-6 lg:mb-0">
            <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/ld.jpg"
                alt="Modern lighting distribution board with circuit breakers, relays, and smart control modules"
                width={1500}
                height={1100}
                className="object-cover w-full h-full"
                priority
                quality={100}
                style={{
                  objectPosition: 'top center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/10 to-transparent" />
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default SupportServices;