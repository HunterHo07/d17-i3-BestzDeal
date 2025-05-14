'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      imageRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2 },
      '-=1'
    );

    // Floating animation for the image
    gsap.to(imageRef.current, {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-16"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 to-slate-950 z-0"></div>

      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
            >
              Flip the Shopping Experience
            </h1>
            <p
              ref={subtitleRef}
              className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Post what you want, and sellers compete to offer you the best deals. Save time, save money.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/d17-i3-BestzDeal/demo/"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
              >
                Try It Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="/d17-i3-BestzDeal/why-us/"
                className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400/10 px-8 py-3 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right column - Image/Illustration */}
          <div ref={imageRef} className="relative">
            <div className="relative mx-auto max-w-md">
              {/* Main device frame */}
              <div className="bg-slate-800 rounded-3xl p-4 shadow-xl border border-slate-700">
                {/* Screen content */}
                <div className="bg-slate-900 rounded-2xl p-4 overflow-hidden">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-600 rounded-full"></div>
                      <div className="ml-2 h-4 w-20 bg-slate-700 rounded"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                      <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                    </div>
                  </div>

                  {/* Request form */}
                  <div className="bg-slate-800 rounded-xl p-4 mb-4">
                    <div className="h-5 w-1/2 bg-slate-700 rounded mb-3"></div>
                    <div className="h-10 w-full bg-slate-700 rounded mb-3"></div>
                    <div className="h-10 w-full bg-slate-700 rounded mb-3"></div>
                    <div className="h-10 w-full bg-slate-700 rounded mb-3"></div>
                    <div className="h-10 w-1/2 bg-indigo-600 rounded mx-auto"></div>
                  </div>

                  {/* Offers section */}
                  <div className="space-y-3">
                    <div className="bg-slate-800 rounded-xl p-3 border border-indigo-500">
                      <div className="flex justify-between mb-2">
                        <div className="h-4 w-1/3 bg-slate-700 rounded"></div>
                        <div className="h-4 w-1/4 bg-indigo-600 rounded"></div>
                      </div>
                      <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-3">
                      <div className="flex justify-between mb-2">
                        <div className="h-4 w-1/3 bg-slate-700 rounded"></div>
                        <div className="h-4 w-1/4 bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-3">
                      <div className="flex justify-between mb-2">
                        <div className="h-4 w-1/3 bg-slate-700 rounded"></div>
                        <div className="h-4 w-1/4 bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-600/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-600/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
