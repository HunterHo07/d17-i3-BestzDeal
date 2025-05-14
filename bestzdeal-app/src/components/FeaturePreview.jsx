'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturePreview = () => {
  const [productName, setProductName] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [showOffers, setShowOffers] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const offersRef = useRef(null);
  const successRef = useRef(null);
  const titleRef = useRef(null);
  
  // Sample offers data
  const offers = [
    { id: 1, seller: 'ElectroHub', price: '$899', rating: 4.8, delivery: '2-day shipping', bonus: 'Free case + screen protector' },
    { id: 2, seller: 'Local Tech Store', price: '$929', rating: 4.9, delivery: 'Same-day pickup', bonus: '2-year warranty' },
    { id: 3, seller: 'MegaElectronics', price: '$879', rating: 4.6, delivery: '3-5 day shipping', bonus: '$50 store credit' },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName && budget) {
      setShowOffers(true);
      
      // Scroll to offers section
      setTimeout(() => {
        offersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  const handleSelectOffer = (offerId) => {
    setSelectedOffer(offerId);
    setShowSuccess(true);
    
    // Scroll to success section
    setTimeout(() => {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const handleReset = () => {
    setProductName('');
    setBudget('');
    setLocation('');
    setShowOffers(false);
    setSelectedOffer(null);
    setShowSuccess(false);
    
    // Scroll back to form
    setTimeout(() => {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  useEffect(() => {
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
    
    // Animate form
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
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
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-white"
        >
          Try It Yourself
        </h2>
        <p className="text-xl text-slate-300 text-center max-w-3xl mx-auto mb-16">
          See how easy it is to post a request and get competing offers from sellers.
        </p>
        
        {/* Request Form */}
        <div 
          ref={formRef} 
          className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-16"
        >
          <h3 className="text-xl font-semibold mb-6 text-white">What are you looking for?</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="productName" className="block text-slate-300 mb-2">Product Name</label>
              <input
                type="text"
                id="productName"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. iPhone 13 Pro, 128GB"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="budget" className="block text-slate-300 mb-2">Your Budget</label>
              <input
                type="text"
                id="budget"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. $800-1000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="location" className="block text-slate-300 mb-2">Your Location (Optional)</label>
              <input
                type="text"
                id="location"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. New York, NY"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Find Best Deals
            </button>
          </form>
        </div>
        
        {/* Offers Section */}
        {showOffers && (
          <div 
            ref={offersRef} 
            className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-16"
          >
            <h3 className="text-xl font-semibold mb-2 text-white">Competing Offers</h3>
            <p className="text-slate-300 mb-6">
              Here are the best deals for <span className="text-indigo-400 font-medium">{productName}</span> within your budget of <span className="text-indigo-400 font-medium">{budget}</span>
            </p>
            
            <div className="space-y-4">
              {offers.map((offer) => (
                <div 
                  key={offer.id} 
                  className={`p-4 rounded-lg border transition-all ${selectedOffer === offer.id ? 'bg-indigo-900/30 border-indigo-500' : 'bg-slate-700/50 border-slate-600 hover:border-indigo-400'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div className="flex items-center mb-2 md:mb-0">
                      <div className="w-10 h-10 bg-slate-600 rounded-full mr-3"></div>
                      <h4 className="font-medium text-white">{offer.seller}</h4>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-white ml-1">{offer.rating}</span>
                      </div>
                      <span className="text-2xl font-bold text-white">{offer.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-3 md:mb-0">
                      <span className="text-slate-300 text-sm">{offer.delivery}</span>
                      <p className="text-indigo-400 text-sm">Bonus: {offer.bonus}</p>
                    </div>
                    <button
                      onClick={() => handleSelectOffer(offer.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedOffer === offer.id ? 'bg-indigo-600 text-white' : 'bg-slate-600 hover:bg-indigo-600 text-white'}`}
                    >
                      {selectedOffer === offer.id ? 'Selected' : 'Select Offer'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Success Section */}
        {showSuccess && (
          <div 
            ref={successRef} 
            className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500 text-center"
          >
            <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Deal Secured!</h3>
            <p className="text-slate-300 mb-6">
              You've successfully selected an offer for your {productName}. In a real scenario, you would now complete the transaction with the seller.
            </p>
            <button
              onClick={handleReset}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturePreview;
