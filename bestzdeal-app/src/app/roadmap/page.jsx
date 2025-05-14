'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FireflyBackground from '@/components/FireflyBackground';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Roadmap phases data
const roadmapPhases = [
  {
    id: 1,
    title: 'Phase 1: MVP Launch',
    timeline: 'Current',
    status: 'active',
    description: 'Our initial launch focuses on the core functionality of connecting buyers with sellers through a reverse marketplace model.',
    features: [
      'Buyer request submission system',
      'Seller response and offer system',
      'Basic user profiles and preferences',
      'Web application with responsive design',
      'Local storage for demo functionality'
    ]
  },
  {
    id: 2,
    title: 'Phase 2: Enhanced Marketplace',
    timeline: 'Q3 2023',
    status: 'upcoming',
    description: 'Building on our foundation, we\'ll add features to improve the user experience and facilitate better connections.',
    features: [
      'In-app messaging between buyers and sellers',
      'Advanced seller profiles with verification',
      'Smart matching algorithm for requests',
      'Notification system for new offers',
      'Category-specific request forms'
    ]
  },
  {
    id: 3,
    title: 'Phase 3: Secure Transactions',
    timeline: 'Q4 2023',
    status: 'upcoming',
    description: 'Introducing secure payment processing and buyer protection to create a complete marketplace ecosystem.',
    features: [
      'Integrated payment processing',
      'Escrow service for high-value items',
      'Buyer protection guarantee',
      'Delivery tracking integration',
      'Dispute resolution system'
    ]
  },
  {
    id: 4,
    title: 'Phase 4: Mobile & AI',
    timeline: 'Q1 2024',
    status: 'upcoming',
    description: 'Expanding to mobile platforms and leveraging AI to create a smarter, more personalized experience.',
    features: [
      'Native mobile apps for iOS and Android',
      'AI-powered deal recommendations',
      'Price prediction for buyers',
      'Fraud detection system',
      'Voice-enabled request creation'
    ]
  },
  {
    id: 5,
    title: 'Phase 5: Global Expansion',
    timeline: 'Q3 2024',
    status: 'upcoming',
    description: 'Taking BestzDeal to international markets with localization and region-specific features.',
    features: [
      'Multi-currency support',
      'Language localization',
      'International shipping options',
      'Region-specific marketplaces',
      'Cross-border transaction support'
    ]
  }
];

export default function RoadmapPage() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const phasesRef = useRef([]);

  // Add a phase to the refs array
  const addToRefs = (el) => {
    if (el && !phasesRef.current.includes(el)) {
      phasesRef.current.push(el);
    }
  };

  useEffect(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate phases
    phasesRef.current.forEach((phase, index) => {
      gsap.fromTo(
        phase,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: phase,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          delay: index * 0.1
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
      <FireflyBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Our Roadmap
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            The journey ahead for BestzDeal and our vision for the future
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-slate-700"></div>

          {/* Phases */}
          {roadmapPhases.map((phase, index) => (
            <div
              key={phase.id}
              ref={addToRefs}
              className={`relative mb-16 ${index % 2 === 0 ? 'md:pr-16 md:text-right md:ml-auto md:mr-0' : 'md:pl-16 md:ml-0 md:mr-auto'} md:w-1/2 w-full`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-1/2 md:left-auto ${index % 2 === 0 ? 'md:right-0' : 'md:left-0'} transform -translate-x-1/2 md:translate-x-0 w-6 h-6 rounded-full ${phase.status === 'active' ? 'bg-indigo-600' : 'bg-slate-600'} border-4 border-slate-800 z-10`}></div>

              {/* Content */}
              <div className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border ${phase.status === 'active' ? 'border-indigo-500' : 'border-slate-700'} ml-8 md:ml-0 md:mr-0`}>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${phase.status === 'active' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-slate-700 text-slate-300'}`}>
                  {phase.timeline}
                </div>
                <h2 className="text-xl font-semibold mb-3 text-white">{phase.title}</h2>
                <p className="text-slate-300 mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${phase.status === 'active' ? 'text-indigo-500' : 'text-slate-500'} mr-2 mt-1 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="max-w-3xl mx-auto mt-16 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">Stay Updated</h2>
          <p className="text-slate-300 mb-6 text-center">
            Subscribe to our newsletter to receive updates on our progress and be the first to know about new features.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-slate-400 text-sm mt-4 text-center">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>
  );
}
