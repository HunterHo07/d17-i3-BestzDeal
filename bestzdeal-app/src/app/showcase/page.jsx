'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Sample showcase items
const showcaseItems = [
  {
    id: 1,
    category: 'electronics',
    title: 'iPhone 13 Pro',
    description: 'User saved $120 by getting competing offers from 5 different sellers',
    savingsPercent: '12%',
    image: '/showcase1.png', // This would be a real image in a production app
    testimonial: 'I was about to buy from the Apple Store when I decided to try BestzDeal. I got the exact same phone for $120 less with free AirPods!'
  },
  {
    id: 2,
    category: 'home',
    title: 'Dyson V11 Vacuum',
    description: 'Local store beat online prices and offered same-day delivery',
    savingsPercent: '15%',
    image: '/showcase2.png',
    testimonial: 'Not only did I save money, but I got my vacuum the same day instead of waiting for shipping. The local store even threw in an extra attachment!'
  },
  {
    id: 3,
    category: 'services',
    title: 'Home Renovation',
    description: 'Received 8 competing quotes for kitchen remodeling project',
    savingsPercent: '22%',
    image: '/showcase3.png',
    testimonial: 'The range of quotes was eye-opening. We saved thousands and found a contractor with amazing reviews we never would have discovered otherwise.'
  },
  {
    id: 4,
    category: 'electronics',
    title: 'Gaming Laptop',
    description: 'Found a specialized gaming store with expert advice and better specs',
    savingsPercent: '8%',
    image: '/showcase4.png',
    testimonial: 'The specialized store actually recommended a slightly different model that better fit my needs. I got better specs for less money!'
  },
  {
    id: 5,
    category: 'fashion',
    title: 'Designer Handbag',
    description: 'Authenticated pre-owned option saved buyer over $500',
    savingsPercent: '40%',
    image: '/showcase5.png',
    testimonial: 'I was skeptical about pre-owned luxury items, but the seller provided authentication certificates and the bag was in perfect condition.'
  },
  {
    id: 6,
    category: 'services',
    title: 'Wedding Photography',
    description: 'Found an amazing up-and-coming photographer at half the price',
    savingsPercent: '50%',
    image: '/showcase6.png',
    testimonial: 'The photographer we found was building their portfolio and offered an incredible package. The photos were absolutely stunning!'
  },
];

export default function ShowcasePage() {
  const [filter, setFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const itemsRef = useRef([]);

  // Filter items based on category
  const filteredItems = filter === 'all'
    ? showcaseItems
    : showcaseItems.filter(item => item.category === filter);

  // Add an item to the refs array
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  // Handle item click to show details
  const handleItemClick = (id) => {
    setActiveItem(activeItem === id ? null : id);
  };

  useEffect(() => {
    // Reset refs array when filter changes
    itemsRef.current = [];

    // Animate header
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, [filter]);

  useEffect(() => {
    // Animate items when they're added to the DOM
    if (itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        }
      );
    }
  }, [filteredItems]);

  return (
    <div ref={pageRef} className="min-h-screen py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-900/10 to-slate-900 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Success Stories
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See how real users are saving time and money with BestzDeal
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            onClick={() => setFilter('all')}
          >
            All Categories
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === 'electronics' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            onClick={() => setFilter('electronics')}
          >
            Electronics
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === 'home' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            onClick={() => setFilter('home')}
          >
            Home & Garden
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === 'services' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            onClick={() => setFilter('services')}
          >
            Services
          </button>
          <button
            className={`px-4 py-2 rounded-full ${filter === 'fashion' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            onClick={() => setFilter('fashion')}
          >
            Fashion
          </button>
        </div>

        {/* Showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              ref={addToRefs}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${activeItem === item.id ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-slate-700 hover:border-indigo-400'}`}
              onClick={() => handleItemClick(item.id)}
            >
              {/* Image */}
              <div className="h-48 bg-slate-700 flex items-center justify-center overflow-hidden">
                <img
                  src={`/d17-i3-BestzDeal/showcase${item.id}.svg`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <span className="bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded text-sm font-medium">
                    Saved {item.savingsPercent}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{item.description}</p>

                {/* Expanded content */}
                {activeItem === item.id && (
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-slate-300 italic">"{item.testimonial}"</p>
                    <div className="mt-4 flex justify-end">
                      <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                        Read full story →
                      </button>
                    </div>
                  </div>
                )}

                {/* Click to expand indicator */}
                {activeItem !== item.id && (
                  <div className="mt-2 text-center">
                    <span className="text-indigo-400 text-sm">Click to see more</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/d17-i3-BestzDeal/demo/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-colors inline-flex items-center justify-center"
          >
            Create Your Request
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
