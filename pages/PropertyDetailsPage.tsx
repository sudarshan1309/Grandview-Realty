import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { listingService } from '../services/listingService.js';
import { ArrowLeft, Bed, Bath, Maximize2, MapPin, Share2, Heart, Tag, ExternalLink } from 'lucide-react';
import { MapComponent } from '../components/MapComponent.jsx';

export const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const data = await listingService.getById(id);
        setProperty(data || null);
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!property) return <div className="h-screen flex items-center justify-center">Property not found</div>;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  // Logic to handle Zillow Link (Database link OR search fallback)
  const zillowLink = property.zillow_url || `https://www.zillow.com/homes/${(property.address + ' ' + property.city).replace(/\s+/g, '-')}_rb/`;

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'sales': return 'For Sale';
      case 'rent': return 'For Rent';
      case 'land': return 'Land / Lots';
      case 'commercial': return 'Commercial';
      default: return 'For Sale';
    }
  };

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="h-[50vh] relative">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute top-6 left-6 z-10">
          <Link to="/properties" className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold text-charcoal hover:bg-white transition-all shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Listings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <span className="flex items-center gap-1.5 bg-brand text-white px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wide">
                  <Tag className="w-3 h-3" />
                  {getCategoryLabel(property.category)}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-brand" />
                  {property.address}, {property.city}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-6 leading-tight">{property.title}</h1>

              <div className="flex flex-wrap gap-6 md:gap-8">
                {property.category !== 'land' && property.category !== 'commercial' && (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-2.5 rounded-full"><Bed className="w-6 h-6 text-brand" /></div>
                      <div>
                        <span className="block font-bold text-xl text-charcoal">{property.beds}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Bedrooms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-2.5 rounded-full"><Bath className="w-6 h-6 text-brand" /></div>
                      <div>
                        <span className="block font-bold text-xl text-charcoal">{property.baths}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Bathrooms</span>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2.5 rounded-full"><Maximize2 className="w-6 h-6 text-brand" /></div>
                  <div>
                    <span className="block font-bold text-xl text-charcoal">{property.sqft.toLocaleString()}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Square Feet</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right w-full md:w-auto">
              <div className="text-3xl md:text-4xl font-display font-bold text-brand mb-6">
                {formatter.format(property.price)}
                {property.category === 'rent' && <span className="text-lg text-gray-400 font-medium">/mo</span>}
              </div>
              <div className="flex gap-3 justify-end">
                <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 text-gray-600 transition-colors"><Heart className="w-5 h-5" /></button>

                {/* REPLACED SCHEDULE TOUR WITH ZILLOW BUTTON */}
                <a
                  href={zillowLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3 bg-[#006aff] text-white font-bold rounded-full hover:bg-[#0055cc] transition-all shadow-lg"
                >
                  <ExternalLink className="w-4 h-4" /> View on Zillow
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10">
            <div className="max-w-4xl space-y-10">
              <div>
                <h2 className="text-2xl font-display font-bold text-charcoal mb-4">About this property</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-light">{property.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold text-charcoal mb-4">Location</h2>
                <div className="h-96 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                  <MapComponent properties={[property]} center={[property.latitude, property.longitude]} zoom={15} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};