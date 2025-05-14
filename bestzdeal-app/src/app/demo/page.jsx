'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Sample categories
const categories = [
  { id: 1, name: 'Electronics', icon: '📱' },
  { id: 2, name: 'Home & Garden', icon: '🏠' },
  { id: 3, name: 'Fashion', icon: '👕' },
  { id: 4, name: 'Toys & Games', icon: '🎮' },
  { id: 5, name: 'Sports & Outdoors', icon: '⚽' },
  { id: 6, name: 'Automotive', icon: '🚗' },
  { id: 7, name: 'Health & Beauty', icon: '💄' },
  { id: 8, name: 'Books & Media', icon: '📚' },
];

// Sample sellers
const sellers = [
  {
    id: 1,
    name: 'ElectroHub',
    rating: 4.8,
    responseTime: '15 min avg',
    completedDeals: 1243,
    verified: true,
    image: '/d17-i3-BestzDeal/seller1.svg' // This would be a real image in a production app
  },
  {
    id: 2,
    name: 'Local Tech Store',
    rating: 4.9,
    responseTime: '5 min avg',
    completedDeals: 876,
    verified: true,
    image: '/d17-i3-BestzDeal/seller2.svg'
  },
  {
    id: 3,
    name: 'MegaElectronics',
    rating: 4.6,
    responseTime: '30 min avg',
    completedDeals: 2156,
    verified: true,
    image: '/d17-i3-BestzDeal/seller3.svg'
  },
  {
    id: 4,
    name: 'Discount Depot',
    rating: 4.3,
    responseTime: '45 min avg',
    completedDeals: 543,
    verified: false,
    image: '/d17-i3-BestzDeal/seller4.svg'
  },
  {
    id: 5,
    name: 'Premium Gadgets',
    rating: 4.7,
    responseTime: '20 min avg',
    completedDeals: 987,
    verified: true,
    image: '/d17-i3-BestzDeal/seller5.svg'
  },
];

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [productName, setProductName] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [deliveryPreference, setDeliveryPreference] = useState('');
  const [urgency, setUrgency] = useState('');
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(null);
  const headerRef = useRef(null);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setCategory(categoryId);
    setStep(2);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to get offers
    setTimeout(() => {
      // Generate random offers based on the product and budget
      const generatedOffers = sellers.map(seller => {
        // Parse budget to get a price range
        const budgetValue = parseInt(budget.replace(/[^0-9]/g, ''));
        const minPrice = Math.max(budgetValue * 0.8, budgetValue - 200);
        const maxPrice = budgetValue * 1.1;
        const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);

        // Random delivery time based on urgency
        let deliveryTime;
        if (urgency === 'urgent') {
          deliveryTime = Math.floor(Math.random() * 2) + 1 + ' days';
        } else if (urgency === 'soon') {
          deliveryTime = Math.floor(Math.random() * 3) + 3 + ' days';
        } else {
          deliveryTime = Math.floor(Math.random() * 5) + 5 + ' days';
        }

        // Random bonuses
        const bonuses = [
          'Free shipping',
          '2-year warranty',
          'Free case',
          '10% off next purchase',
          'Free screen protector',
          'Extended return period',
          'Free technical support'
        ];
        const randomBonus = bonuses[Math.floor(Math.random() * bonuses.length)];

        return {
          id: seller.id,
          seller: seller.name,
          sellerRating: seller.rating,
          sellerImage: seller.image,
          verified: seller.verified,
          price: '$' + price,
          delivery: deliveryTime,
          bonus: randomBonus
        };
      });

      // Sort by price (lowest first)
      generatedOffers.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });

      setOffers(generatedOffers);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  // Handle offer selection
  const handleSelectOffer = (offerId) => {
    setSelectedOffer(offerId);
    setStep(4);
  };

  // Handle restart
  const handleRestart = () => {
    setStep(1);
    setCategory(null);
    setProductName('');
    setBudget('');
    setLocation('');
    setDeliveryPreference('');
    setUrgency('');
    setOffers([]);
    setSelectedOffer(null);
  };

  // Animation effect
  useEffect(() => {
    // Animate header
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Animate content based on step change
    const content = document.querySelector(`.step-${step}`);
    if (content) {
      gsap.fromTo(
        content,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [step]);

  return (
    <div ref={pageRef} className="min-h-screen py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-900/10 to-slate-900 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            BestzDeal Demo
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience how easy it is to post a request and get competing offers from sellers.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${step >= 1 ? 'text-indigo-400' : 'text-slate-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                1
              </div>
              <span className="text-sm">Select Category</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 2 ? 'text-indigo-400' : 'text-slate-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                2
              </div>
              <span className="text-sm">Request Details</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 3 ? 'text-indigo-400' : 'text-slate-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                3
              </div>
              <span className="text-sm">Compare Offers</span>
            </div>
            <div className={`flex flex-col items-center ${step >= 4 ? 'text-indigo-400' : 'text-slate-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step >= 4 ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                4
              </div>
              <span className="text-sm">Complete</span>
            </div>
          </div>
          <div className="relative h-2 bg-slate-700 rounded-full mt-4">
            <div
              className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="step-1 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-semibold mb-6 text-white">What are you looking for?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className="bg-slate-700 hover:bg-indigo-600 transition-colors p-6 rounded-lg flex flex-col items-center"
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <span className="text-4xl mb-2">{cat.icon}</span>
                    <span className="text-white font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Request Details */}
        {step === 2 && (
          <div className="step-2 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-semibold mb-6 text-white">Tell us more about your request</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="productName" className="block text-slate-300 mb-2">Product Name/Description</label>
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
                <div className="mb-4">
                  <label htmlFor="location" className="block text-slate-300 mb-2">Your Location</label>
                  <input
                    type="text"
                    id="location"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. New York, NY"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-slate-300 mb-2">Delivery Preference</label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${deliveryPreference === 'shipping' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                      onClick={() => setDeliveryPreference('shipping')}
                    >
                      Shipping
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${deliveryPreference === 'pickup' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                      onClick={() => setDeliveryPreference('pickup')}
                    >
                      Local Pickup
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${deliveryPreference === 'either' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                      onClick={() => setDeliveryPreference('either')}
                    >
                      Either
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-slate-300 mb-2">How Urgent Is Your Request?</label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${urgency === 'urgent' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                      onClick={() => setUrgency('urgent')}
                    >
                      Very Urgent (1-2 days)
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${urgency === 'soon' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                      onClick={() => setUrgency('soon')}
                    >
                      Need Soon (3-5 days)
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg ${urgency === 'flexible' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                      onClick={() => setUrgency('flexible')}
                    >
                      Flexible (5+ days)
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    disabled={!productName || !budget}
                  >
                    Find Best Deals
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Compare Offers */}
        {step === 3 && (
          <div className="step-3 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-semibold mb-2 text-white">Compare Offers</h2>
              <p className="text-slate-300 mb-6">
                Here are the best deals for <span className="text-indigo-400 font-medium">{productName}</span> within your budget
              </p>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-300">Finding the best deals for you...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="p-4 rounded-lg border transition-all bg-slate-700/50 border-slate-600 hover:border-indigo-400"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="w-10 h-10 bg-slate-600 rounded-full mr-3 flex items-center justify-center text-xl overflow-hidden">
                            <img
                              src={`/d17-i3-BestzDeal/seller${offer.id}.svg`}
                              alt={offer.seller}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-white flex items-center">
                              {offer.seller}
                              {offer.verified && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </h4>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-slate-300 text-sm ml-1">{offer.sellerRating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-white">
                          {offer.price}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="mb-3 md:mb-0">
                          <span className="text-slate-300 text-sm block">Delivery: {offer.delivery}</span>
                          <span className="text-indigo-400 text-sm block">Bonus: {offer.bonus}</span>
                        </div>
                        <button
                          onClick={() => handleSelectOffer(offer.id)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Select Offer
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <button
                  className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {step === 4 && (
          <div className="step-4 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500 text-center">
              <div className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-white">Deal Secured!</h2>
              <p className="text-slate-300 mb-6">
                You've successfully selected an offer for your {productName}. In a real scenario, you would now complete the transaction with the seller.
              </p>
              <div className="bg-slate-700/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-4 text-white">What happens next?</h3>
                <ol className="text-left text-slate-300 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">1</span>
                    <span>The seller will be notified of your selection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">2</span>
                    <span>You'll receive contact details to finalize the purchase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">3</span>
                    <span>Complete the transaction securely through our platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0">4</span>
                    <span>Receive your item and leave feedback for the seller</span>
                  </li>
                </ol>
              </div>
              <button
                onClick={handleRestart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Start a New Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
