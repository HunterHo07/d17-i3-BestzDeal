'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidMeshBackground from '@/components/LiquidMeshBackground';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyUsPage() {
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
    <div ref={pageRef} className="min-h-screen py-20">
      {/* Background animation */}
      <LiquidMeshBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Why Choose BestzDeal?
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We're revolutionizing e-commerce with a buyer-first approach that saves you time and money.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          {/* Section 1: The Problem */}
          <section
            ref={addToRefs}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">The Problem with Traditional Shopping</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-slate-300 mb-4">
                  Traditional shopping puts all the burden on you, the buyer. You spend hours:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Searching across dozens of websites and stores</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Comparing prices, shipping costs, and delivery times</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Reading reviews and researching seller reliability</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Still wondering if you got the best possible deal</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-6 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="h-4 w-full bg-slate-600 rounded mb-3"></div>
                  <div className="h-4 w-3/4 bg-slate-600 rounded mb-3"></div>
                  <div className="h-4 w-full bg-slate-600 rounded mb-3"></div>
                  <div className="h-4 w-2/3 bg-slate-600 rounded mb-6"></div>
                  <div className="h-10 w-full bg-slate-600 rounded mb-3"></div>
                  <div className="h-10 w-full bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Our Solution */}
          <section
            ref={addToRefs}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">The BestzDeal Solution</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-900/30 rounded-lg p-6 flex items-center justify-center order-2 md:order-1">
                <div className="w-full max-w-xs">
                  <div className="h-10 w-full bg-indigo-700/50 rounded mb-3"></div>
                  <div className="h-4 w-3/4 bg-indigo-700/50 rounded mb-6"></div>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-700/50 mr-2"></div>
                    <div className="h-4 w-2/3 bg-indigo-700/50 rounded"></div>
                  </div>
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-700/50 mr-2"></div>
                    <div className="h-4 w-1/2 bg-indigo-700/50 rounded"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-700/50 mr-2"></div>
                    <div className="h-4 w-3/4 bg-indigo-700/50 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <p className="text-slate-300 mb-4">
                  BestzDeal flips the traditional shopping model on its head:
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You post what you want just once</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sellers compete to offer you their best deals</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>You compare offers in one place and choose the best</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save time, money, and discover new sellers</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Key Benefits */}
          <section
            ref={addToRefs}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-12"
          >
            <h2 className="text-2xl font-semibold mb-8 text-white">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-700/50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Time Efficiency</h3>
                <p className="text-slate-300">
                  Post once and receive multiple offers, eliminating hours of searching and comparing.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Cost Savings</h3>
                <p className="text-slate-300">
                  When sellers compete for your business, you get better prices and special offers.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Local Discovery</h3>
                <p className="text-slate-300">
                  Find and support local businesses you might never have discovered otherwise.
                </p>
              </div>
              <div className="bg-slate-700/50 p-6 rounded-lg">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Verified Sellers</h3>
                <p className="text-slate-300">
                  Shop with confidence from our network of verified sellers with transparent ratings.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: FAQ */}
          <section
            ref={addToRefs}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <h2 className="text-2xl font-semibold mb-8 text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Is BestzDeal free to use?</h3>
                <p className="text-slate-300">
                  Yes, BestzDeal is completely free for buyers. We make money by charging sellers a small commission on completed transactions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">How quickly will I receive offers?</h3>
                <p className="text-slate-300">
                  Most requests receive their first offers within minutes, and you'll typically get multiple offers within a few hours.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">How do you ensure seller quality?</h3>
                <p className="text-slate-300">
                  We verify all sellers before they can join our platform, and our rating system helps maintain high standards. We also offer buyer protection on all transactions.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Can I use BestzDeal for services, not just products?</h3>
                <p className="text-slate-300">
                  Absolutely! BestzDeal works for both products and services. Whether you need a plumber, a laptop, or a wedding photographer, our platform connects you with the right providers.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-16">
            <a
              href="/d17-i3-BestzDeal/demo/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
            >
              Try BestzDeal Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
