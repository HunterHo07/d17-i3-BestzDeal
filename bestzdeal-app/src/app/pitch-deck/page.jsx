'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import CubeAnimation from '@/components/CubeAnimation';

// Pitch deck slides data
const slides = [
  {
    id: 1,
    title: 'BestzDeal',
    subtitle: 'The Reverse Marketplace',
    content: 'Shop/seller come to find you — users post what they want, shops compete to offer best deals.',
    type: 'intro'
  },
  {
    id: 2,
    title: 'The Problem',
    content: [
      'Buyers waste time searching and comparing prices',
      'Small/local sellers struggle to find direct leads',
      'Marketplace apps favor big sellers; local options hidden',
      'No reverse marketplace for buyer-driven demand'
    ],
    type: 'problem'
  },
  {
    id: 3,
    title: 'Our Solution',
    content: [
      'Buyer posts product request (name, budget, location, delivery/pickup preference)',
      'Verified sellers respond with offers (price, ETA, bonuses)',
      'Buyer reviews offers and accepts best deal',
      'Optional: rating, chat, secure payment system'
    ],
    type: 'solution'
  },
  {
    id: 4,
    title: 'Market Opportunity',
    content: [
      'Global e-commerce market: $5.7 trillion (2022)',
      'Projected growth to $8.1 trillion by 2026',
      'Reverse marketplace segment: Emerging but underdeveloped',
      'Local commerce market: $1.4 trillion opportunity'
    ],
    type: 'market'
  },
  {
    id: 5,
    title: 'Business Model',
    content: [
      'Free for buyers',
      'Seller subscription tiers (Basic/Free, Premium $29/mo, Business $99/mo)',
      'Transaction fees (5% on completed transactions)',
      'Promotional features (Boosted visibility, Featured deals)'
    ],
    type: 'business'
  },
  {
    id: 6,
    title: 'Competitive Advantage',
    content: [
      'First true reverse marketplace focused on both products and services',
      'Local-first approach connects buyers with nearby businesses',
      'Seller verification and rating system ensures quality',
      'No upfront costs for sellers - pay only for actual customers'
    ],
    type: 'advantage'
  },
  {
    id: 7,
    title: 'Roadmap',
    content: [
      'Phase 1: MVP - Web app for buyers to post, sellers reply manually',
      'Phase 2: Add chat, auto-matching, seller dashboard, notifications',
      'Phase 3: Secure in-app payment, delivery tracking, buyer protection',
      'Phase 4: Mobile app, subscription model, AI deal matcher'
    ],
    type: 'roadmap'
  },
  {
    id: 8,
    title: 'The Team',
    content: [
      'CEO: Jane Smith - Former Product Lead at Amazon',
      'CTO: John Davis - Ex-Uber Engineering Manager',
      'CMO: Sarah Johnson - Previously at Shopify',
      'COO: Michael Chen - Former Operations Director at eBay'
    ],
    type: 'team'
  },
  {
    id: 9,
    title: 'Join the Revolution',
    content: 'BestzDeal is transforming e-commerce by putting buyers first and creating a more efficient, fair marketplace for everyone.',
    type: 'outro'
  }
];

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef([]);
  const pageRef = useRef(null);

  // Add a slide to the refs array
  const addToRefs = (el) => {
    if (el && !slideRefs.current.includes(el)) {
      slideRefs.current.push(el);
    }
  };

  // Navigate to next slide
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Navigate to previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Navigate to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]);

  // Animate slide transition
  useEffect(() => {
    if (slideRefs.current.length > 0) {
      // Hide all slides
      slideRefs.current.forEach((slide) => {
        gsap.set(slide, { opacity: 0, y: 50 });
      });

      // Show current slide
      gsap.to(slideRefs.current[currentSlide], {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    }
  }, [currentSlide, slideRefs.current.length]);

  return (
    <div ref={pageRef} className="min-h-screen flex flex-col">
      {/* Background animation */}
      <CubeAnimation />

      {/* Slide navigation dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-indigo-500' : 'bg-slate-600'}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
        onClick={prevSlide}
        disabled={currentSlide === 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center ${currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-600'}`}
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slides */}
      <div className="flex-grow flex items-center justify-center relative z-10 py-20 px-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={addToRefs}
            className={`absolute inset-0 flex items-center justify-center ${index === currentSlide ? 'block' : 'hidden'}`}
          >
            <div className="max-w-4xl w-full bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              {/* Intro slide */}
              {slide.type === 'intro' && (
                <div className="text-center py-12">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">{slide.title}</h1>
                  <p className="text-2xl md:text-3xl text-indigo-400 mb-8">{slide.subtitle}</p>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto">{slide.content}</p>
                </div>
              )}

              {/* Problem/Solution/Market/Business/Advantage/Roadmap/Team slides */}
              {['problem', 'solution', 'market', 'business', 'advantage', 'roadmap', 'team'].includes(slide.type) && (
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{slide.title}</h2>
                  <ul className="space-y-4">
                    {Array.isArray(slide.content) ? (
                      slide.content.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-xl text-slate-300">{item}</span>
                        </li>
                      ))
                    ) : (
                      <p className="text-xl text-slate-300">{slide.content}</p>
                    )}
                  </ul>
                </div>
              )}

              {/* Outro slide */}
              {slide.type === 'outro' && (
                <div className="text-center py-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">{slide.title}</h2>
                  <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">{slide.content}</p>
                  <a
                    href="/d17-i3-BestzDeal/demo/"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
                  >
                    Try the Demo
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Slide number */}
              <div className="absolute bottom-4 right-4 text-slate-500 text-sm">
                {index + 1} / {slides.length}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
