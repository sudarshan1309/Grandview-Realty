import { supabase } from '../lib/supabase.js';

export const listingService = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*');
    
    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
    return data;
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      return undefined;
    }
    return data;
  },

  create: async (property) => {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  update: async (id, updates) => {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating property:', error);
      return null;
    }
    return data;
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting property:', error);
      return false;
    }
    return true;
  }
};