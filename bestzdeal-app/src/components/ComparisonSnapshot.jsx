'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ComparisonSnapshot = () => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate left column
    gsap.fromTo(
      leftColumnRef.current,
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate right column
    gsap.fromTo(
      rightColumnRef.current,
      { x: 50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
          trigger: rightColumnRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-950/50 to-slate-900/50 relative z-10">
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef} 
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
        >
          The BestzDeal Difference
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Traditional Shopping */}
          <div 
            ref={leftColumnRef} 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Traditional Shopping</h3>
            </div>
            
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Hours spent searching across multiple websites and stores</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>No way to know if you're getting the best price</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Limited visibility of local businesses and their offers</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Frustrating experience with no personalized options</span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-1/3 bg-slate-600 rounded"></div>
                <div className="h-4 w-1/4 bg-slate-600 rounded"></div>
              </div>
              <div className="h-4 w-full bg-slate-600 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-slate-600 rounded"></div>
            </div>
          </div>
          
          {/* BestzDeal Shopping */}
          <div 
            ref={rightColumnRef} 
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">BestzDeal Shopping</h3>
            </div>
            
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Post once and receive multiple offers in minutes</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Sellers compete to give you their best price</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Discover local businesses you never knew existed</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalized experience based on your preferences</span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-indigo-900/30 rounded-lg border border-indigo-800">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-1/3 bg-indigo-700/50 rounded"></div>
                <div className="h-4 w-1/4 bg-indigo-600 rounded"></div>
              </div>
              <div className="h-4 w-full bg-indigo-700/50 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-indigo-700/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSnapshot;
