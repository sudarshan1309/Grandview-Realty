import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listingService } from '../services/listingService.js';
import { Save, ArrowLeft } from 'lucide-react';

const InputLabel = ({ children }) => (
  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
    {children}
  </label>
);

export const AdminEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== 'new';

  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    address: '',
    city: '',
    beds: 1,
    baths: 1,
    sqft: 0,
    latitude: 0,
    longitude: 0,
    imageUrl: 'https://picsum.photos/800/600',
    category: 'sales',
    featured: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && id) {
      const fetchProperty = async () => {
        const data = await listingService.getById(id);
        if (data) setFormData(data);
      };
      fetchProperty();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleCheckbox = (e) => {
    setFormData(prev => ({ ...prev, featured: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing && id) {
        await listingService.update(id, formData);
      } else {
        await listingService.create(formData);
      }
      navigate('/admin/listings');
    } catch (error) {
      console.error(error);
      alert('Error saving. Did you update the database schema?');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:bg-white focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all duration-200";

  return (
    <div className="min-h-screen bg-offwhite p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
           <button onClick={() => navigate('/admin/listings')} className="p-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-full shadow-sm transition-colors">
             <ArrowLeft className="w-5 h-5 text-gray-600" />
           </button>
           <h1 className="text-3xl font-display font-bold text-charcoal">
             {isEditing ? 'Edit Listing' : 'Create New Listing'}
           </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 space-y-12">
            
            {/* Basic Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-gray-900 border-b border-gray-100 pb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <InputLabel>Property Title</InputLabel>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="e.g. Grand Estate on the Hills"
                  />
                </div>
                
                <div>
                  <InputLabel>Listing Type</InputLabel>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="sales">Residential Sales</option>
                      <option value="rent">Residential Rent</option>
                      <option value="land">Land / Lots</option>
                      <option value="commercial">Commercial</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div>
                  <InputLabel>Price ($)</InputLabel>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="col-span-2 flex items-center pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleCheckbox}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-brand checked:bg-brand"
                      />
                      <svg className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-charcoal transition-colors">Mark as Featured Listing</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-gray-900 border-b border-gray-100 pb-4">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <InputLabel>Bedrooms</InputLabel>
                  <input
                    type="number"
                    name="beds"
                    required
                    min="0"
                    disabled={formData.category === 'land' || formData.category === 'commercial'}
                    value={formData.beds}
                    onChange={handleChange}
                    className={`${inputClasses} disabled:opacity-50 disabled:bg-gray-100`}
                  />
                </div>
                <div>
                  <InputLabel>Bathrooms</InputLabel>
                  <input
                    type="number"
                    name="baths"
                    required
                    min="0"
                    step="0.5"
                    disabled={formData.category === 'land'}
                    value={formData.baths}
                    onChange={handleChange}
                    className={`${inputClasses} disabled:opacity-50 disabled:bg-gray-100`}
                  />
                </div>
                <div>
                  <InputLabel>Square Footage</InputLabel>
                  <input
                    type="number"
                    name="sqft"
                    required
                    min="0"
                    value={formData.sqft}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="col-span-3">
                  <InputLabel>Description</InputLabel>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-bold text-gray-900 border-b border-gray-100 pb-4">Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <InputLabel>Street Address</InputLabel>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <InputLabel>City</InputLabel>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  {/* Spacer */}
                </div>
                <div>
                  <InputLabel>Latitude</InputLabel>
                  <input
                    type="number"
                    name="latitude"
                    step="any"
                    required
                    value={formData.latitude}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <InputLabel>Longitude</InputLabel>
                  <input
                    type="number"
                    name="longitude"
                    step="any"
                    required
                    value={formData.longitude}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-6">
               <h3 className="text-xl font-display font-bold text-gray-900 border-b border-gray-100 pb-4">Media</h3>
               <div>
                  <InputLabel>Image URL</InputLabel>
                  <input
                    type="text"
                    name="imageUrl"
                    required
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <p className="text-xs text-gray-400 mt-2">Enter a valid direct image URL.</p>
               </div>
               {formData.imageUrl && (
                 <div className="w-full h-80 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                   <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                 </div>
               )}
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-4">
             <button
               type="button"
               onClick={() => navigate('/admin/listings')}
               className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 hover:text-charcoal transition-all shadow-sm"
             >
               Cancel
             </button>
             <button
               type="submit"
               disabled={loading}
               className="flex items-center gap-2 px-8 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand-light transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
             >
               <Save className="w-4 h-4" />
               {loading ? 'Saving...' : 'Save Listing'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};