'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { getPath } from '../../utils/routes';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AuroraBackground from '@/components/AuroraBackground';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingPage() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  // Add a section to the refs array
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate sections
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Background animation */}
      <AuroraBackground />

      {/* Hero Section */}
      <section ref={headerRef} className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Stop Searching.<br />Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Finding</span>.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
            BestzDeal flips shopping on its head. Post what you want, and let sellers compete to give you their best deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getPath('/demo/')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
            >
              Try It Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href={getPath('/why-us/')}
              className="border border-indigo-400 text-indigo-400 hover:bg-indigo-400/10 px-8 py-4 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={addToRefs} className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            How BestzDeal Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-indigo-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-white">Post Your Request</h3>
              <p className="text-slate-300 text-center">
                Tell us what you're looking for, your budget, and location preferences. It takes less than a minute.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-indigo-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-white">Sellers Compete</h3>
              <p className="text-slate-300 text-center">
                Local and online sellers see your request and compete to offer you their best deals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300">
              <div className="w-16 h-16 bg-indigo-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-indigo-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-white">Choose the Best Deal</h3>
              <p className="text-slate-300 text-center">
                Compare offers based on price, seller ratings, and delivery options. Select your perfect match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section ref={addToRefs} className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
            Perfect For Any Purchase
          </h2>
          <p className="text-xl text-slate-300 text-center max-w-3xl mx-auto mb-16">
            BestzDeal works for everything from electronics to home services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Use Case 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
              <div className="h-40 bg-slate-700 flex items-center justify-center">
                <span className="text-5xl">📱</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Electronics</h3>
                <p className="text-slate-300">
                  Find the best deals on phones, laptops, TVs, and more from local and online retailers.
                </p>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
              <div className="h-40 bg-slate-700 flex items-center justify-center">
                <span className="text-5xl">🏠</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Home Services</h3>
                <p className="text-slate-300">
                  Get competing quotes from plumbers, electricians, cleaners, and other service providers.
                </p>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
              <div className="h-40 bg-slate-700 flex items-center justify-center">
                <span className="text-5xl">🛋️</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Furniture</h3>
                <p className="text-slate-300">
                  Describe the perfect piece and let furniture stores compete for your business.
                </p>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
              <div className="h-40 bg-slate-700 flex items-center justify-center">
                <span className="text-5xl">🚗</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-white">Auto Services</h3>
                <p className="text-slate-300">
                  Find the best prices on car repairs, maintenance, and parts from trusted mechanics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={addToRefs} className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            What Our Users Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <p className="text-slate-300 mb-4 italic">
                "I saved over $200 on a new laptop by using BestzDeal. Multiple stores competed for my business, and I got a much better deal than I would have found on my own."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white font-medium">JD</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">John D.</h4>
                  <div className="flex text-yellow-500">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
              <p className="text-slate-300 mb-4 italic">
                "As a small business owner, BestzDeal has been a game-changer. I can now connect directly with customers looking for exactly what I offer."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white font-medium">SM</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Sarah M.</h4>
                  <div className="flex text-yellow-500">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Save Time and Money?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands of smart shoppers who are letting sellers compete for their business.
          </p>
          <a
            href={getPath('/demo/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
          >
            Try BestzDeal Now
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
