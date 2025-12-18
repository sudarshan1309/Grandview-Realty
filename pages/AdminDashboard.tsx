import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listingService } from '../services/listingService.js';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

export const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    const data = await listingService.getAll();
    setProperties(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this listing?')) {
      await listingService.delete(id);
      await loadProperties();
    }
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="min-h-screen bg-offwhite p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-charcoal">Property Management</h1>
            <p className="text-gray-500">Manage your listings portfolio</p>
          </div>
          <div className="flex gap-3">
            <Link 
              to="/admin/listings/new" 
              className="flex items-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-sm hover:bg-brand-light transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Listing
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
             <div className="p-12 text-center text-gray-500">Loading listings...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-bold text-xs tracking-wider text-gray-500 uppercase font-display">Property</th>
                    <th className="px-6 py-4 font-bold text-xs tracking-wider text-gray-500 uppercase font-display">Price</th>
                    <th className="px-6 py-4 font-bold text-xs tracking-wider text-gray-500 uppercase font-display">Status</th>
                    <th className="px-6 py-4 font-bold text-xs tracking-wider text-gray-500 uppercase font-display text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties.map(property => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={property.imageUrl} alt="" className="w-12 h-12 object-cover rounded-sm" />
                          <div>
                            <div className="font-bold text-charcoal font-display">{property.title}</div>
                            <div className="flex items-center text-xs text-gray-500">
                              <MapPin className="w-3 h-3 mr-1" />
                              {property.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {formatter.format(property.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.featured ? 'bg-brand/10 text-brand' : 'bg-gray-100 text-gray-600'}`}>
                          {property.featured ? 'Featured' : 'Standard'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link 
                            to={`/admin/listings/${property.id}`}
                            className="p-2 text-gray-400 hover:text-brand transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(property.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {properties.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No properties found. <br/>
                        Click "Add New Listing" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};