'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ThreeStepSummary = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current;
    
    // Create animation for each step
    steps.forEach((step, index) => {
      gsap.fromTo(
        step,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          delay: index * 0.2
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add a step to the refs array
  const addToRefs = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-950/50 relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          How BestzDeal Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div 
            ref={addToRefs} 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-white">Post Your Request</h3>
            <p className="text-slate-300 text-center">
              Tell us what you're looking for, your budget, and location preferences. It takes less than a minute.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-xs bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="h-4 w-3/4 bg-slate-600 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-slate-600 rounded mb-3"></div>
                <div className="h-10 w-full bg-slate-600 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div 
            ref={addToRefs} 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-white">Sellers Compete</h3>
            <p className="text-slate-300 text-center">
              Local and online sellers see your request and compete to offer you their best deals.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-xs bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-600 mr-2"></div>
                  <div className="h-4 w-1/2 bg-slate-600 rounded"></div>
                </div>
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-slate-600 mr-2"></div>
                  <div className="h-4 w-1/3 bg-slate-600 rounded"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-600 mr-2"></div>
                  <div className="h-4 w-2/3 bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div 
            ref={addToRefs} 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
          >
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-4 text-white">Choose the Best Deal</h3>
            <p className="text-slate-300 text-center">
              Compare offers based on price, seller ratings, and delivery options. Select your perfect match.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-xs bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="h-4 w-full bg-indigo-600 rounded mb-3"></div>
                <div className="h-4 w-3/4 bg-slate-600 rounded mb-3"></div>
                <div className="h-10 w-1/2 bg-indigo-600 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeStepSummary;
