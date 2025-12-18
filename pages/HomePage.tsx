import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { listingService } from '../services/listingService.js';

export const HomePage = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const all = await listingService.getAll();
        setFeaturedProperties(all.filter(p => p.featured).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* New Hero Section */}
      <section className="relative min-h-[700px] flex items-center py-20 bg-charcoal">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Headline & Promo */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                Find Your <br/>
                <span className="text-brand-light">Grand View</span>
              </h1>
              <p className="text-lg text-gray-300 font-light max-w-xl">
                Discover a curated collection of the most exclusive properties in metropolitan areas. 
                Luxury is not just a price point, it's an experience.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/properties" 
                  className="px-8 py-4 bg-brand hover:bg-brand-light text-white font-medium rounded-sm transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-2"
                >
                  Browse Listings
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* 5% Promo Box */}
              <div className="mt-8 p-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg max-w-md">
                <div className="flex items-start gap-4">
                  <div className="bg-brand text-white text-xl font-bold p-3 rounded-sm leading-none flex flex-col items-center justify-center min-w-[60px]">
                    <span>5%</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">Property Management Special</h3>
                    <p className="text-gray-300 text-sm">
                      We handle everything from tenant screening to maintenance for a flat <strong className="text-white">5% management fee</strong>. Maximize your ROI today.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Services Cards */}
            <div className="grid gap-4">
              <div className="bg-white p-6 rounded-lg shadow-xl transform translate-x-4 lg:translate-x-0 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal">Premium Selection</h3>
                    <p className="text-sm text-gray-500">Hand-picked properties ensuring unique character and high value.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal">Prime Locations</h3>
                    <p className="text-sm text-gray-500">Focusing exclusively on desirable neighborhoods in metro hubs.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-xl transform translate-x-4 lg:translate-x-0 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-charcoal">Seamless Experience</h3>
                    <p className="text-sm text-gray-500">Digital-first platform making buying and renting effortless.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 text-brand font-bold text-sm tracking-wider uppercase mb-2">
                <Star className="w-4 h-4 fill-current" />
                Featured Collections
              </div>
              <h2 className="text-3xl font-display font-bold text-charcoal">Exclusive Opportunities</h2>
            </div>
            <Link 
              to="/properties" 
              className="hidden md:flex items-center text-charcoal hover:text-brand font-medium transition-colors"
            >
              View All Properties <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link 
              to="/properties" 
              className="inline-flex items-center text-brand font-medium"
            >
              View All Properties <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};