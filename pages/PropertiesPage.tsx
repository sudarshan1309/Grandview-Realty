import React, { useEffect, useState } from 'react';
import { listingService } from '../services/listingService.js';
import { PropertyCard } from '../components/PropertyCard.jsx';
import { MapComponent } from '../components/MapComponent.jsx';

const CATEGORIES = [
  { id: 'all', label: 'All Listings' },
  { id: 'sales', label: 'For Sale' },
  { id: 'rent', label: 'For Rent' },
  { id: 'land', label: 'Land / Lots' },
  { id: 'commercial', label: 'Commercial' },
];

export const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await listingService.getAll();
        setProperties(data);
        setFilteredProperties(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, properties]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Filter Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm z-10">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-2 no-scrollbar pb-1 md:pb-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id 
                  ? 'bg-brand text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand hover:text-brand'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Map Section (2/3 width on desktop) */}
        <div className="hidden md:block w-2/3 h-full relative z-0">
          <MapComponent properties={filteredProperties} />
        </div>

        {/* List Section (1/3 width on desktop) */}
        <div className="w-full md:w-1/3 bg-offwhite overflow-y-auto border-l border-gray-200">
          <div className="p-6">
            <h2 className="font-display font-bold text-xl md:text-2xl mb-2 text-charcoal">
              {CATEGORIES.find(c => c.id === activeCategory)?.label}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {filteredProperties.length} Properties found
            </p>
            
            {loading ? (
               <div className="space-y-6">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
                 ))}
               </div>
            ) : (
              <div className="space-y-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
                {filteredProperties.length === 0 && (
                   <div className="text-center py-12 text-gray-500">
                     No properties found in this category.
                   </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};