import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react';

const getCategoryLabel = (cat) => {
  switch(cat) {
    case 'sales': return 'For Sale';
    case 'rent': return 'For Rent';
    case 'land': return 'Land / Lots';
    case 'commercial': return 'Commercial';
    default: return 'For Sale';
  }
};

export const PropertyCard = ({ property, compact = false }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <Link to={`/properties/${property.id}`} className="group block bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`relative ${compact ? 'h-40' : 'h-64'} overflow-hidden`}>
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-brand text-white text-xs font-bold px-3 py-1 rounded-sm shadow-lg">
          {formatter.format(property.price)} {property.category === 'rent' && '/mo'}
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-charcoal text-xs font-bold px-3 py-1 rounded-sm shadow-sm uppercase tracking-wider">
          {getCategoryLabel(property.category)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-charcoal mb-1 truncate group-hover:text-brand transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-xs mb-4">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          {property.category === 'land' ? (
             <div className="flex items-center gap-1 text-gray-600 text-sm w-full">
               <Maximize2 className="w-3 h-3 text-brand" />
               <span className="font-medium">{property.sqft.toLocaleString()}</span> <span className="text-xs">sqft Lot</span>
             </div>
          ) : (
            <>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Bed className="w-4 h-4 text-brand" />
                <span className="font-medium">{property.beds}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Bath className="w-4 h-4 text-brand" />
                <span className="font-medium">{property.baths}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Maximize2 className="w-3 h-3 text-brand" />
                <span className="font-medium">{property.sqft.toLocaleString()}</span> <span className="text-xs">sqft</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};