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
//                 Comprehensive Switchgear Support Services
//               </h1>

//               <div className="space-y-5 mt-8 text-gray-800">
//                 <div className="space-y-4 pl-6">
//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
//                     Our 24/7 technical support team provides immediate assistance for all switchgear operations, from routine maintenance to emergency troubleshooting. With certified engineers on call, we ensure minimal downtime and optimal performance of your electrical distribution systems.
//                   </p>

//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
//                     We offer specialized services including thermographic inspections, partial discharge testing, and contact resistance measurements to proactively identify potential issues in your switchgear before they escalate into critical failures.
//                   </p>

//                   <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wider pt-2">
//                     Our maintenance programs include detailed documentation of all service activities, replacement part recommendations, and performance optimization strategies tailored to your specific switchgear configuration and operational requirements.
//                   </p>
//                 </div>

//                 <div className="mt-8 pt-5 border-t border-gray-200">
//                   <h3
//                     className={`text-xl md:text-2xl font-bold text-gray-900 pl-6 tracking-widest ${dmsans.className}`}
//                   >
//                     Your Trusted Partner for Switchgear Lifecycle Support
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Image - Right Side */}
//           <div className="lg:w-1/2 flex items-center justify-center pr-6">
//             <div className="relative w-full h-[380px] lg:h-[480px] overflow-hidden shadow-lg">
//               <Image
//                 src="/sss.jpg"
//                 alt="Switchgear technical support and maintenance"
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
                Comprehensive Switchgear Support Services
              </h1>

              <div className="space-y-5 mt-6 sm:mt-8 text-gray-800">
                <div className="space-y-4 pl-4 sm:pl-6">
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-2">
                    Our 24/7 technical support team provides immediate assistance for all switchgear operations, from routine maintenance to emergency troubleshooting. With certified engineers on call, we ensure minimal downtime and optimal performance of your electrical distribution systems.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-2">
                    We offer specialized services including thermographic inspections, partial discharge testing, and contact resistance measurements to proactively identify potential issues in your switchgear before they escalate into critical failures.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-600 font-roboto tracking-wide sm:tracking-wider pt-2">
                    Our maintenance programs include detailed documentation of all service activities, replacement part recommendations, and performance optimization strategies tailored to your specific switchgear configuration and operational requirements.
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 border-t border-gray-200">
                  <h3
                    className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 pl-4 sm:pl-6 tracking-wider sm:tracking-widest leading-tight ${dmsans.className}`}
                  >
                    Your Trusted Partner for Switchgear Lifecycle Support
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Image - Right Side (mobile pe sabse pehle aayegi) */}
          <div className="lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:pr-6 mb-6 lg:mb-0">
            <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[480px] overflow-hidden shadow-lg">
              <Image
                src="/sss.jpg"
                alt="Switchgear technical support and maintenance"
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