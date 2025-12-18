import { supabase } from '../lib/supabase.js';

export const authService = {
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('No user returned');

    return {
      id: data.user.id,
      email: data.user.email,
      role: 'admin', // In a real app, you'd fetch roles from a profile table
    };
  },

  logout: async () => {
    await supabase.auth.signOut();
    window.location.href = '#/login';
  },

  getCurrentUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return null;

    return {
      id: session.user.id,
      email: session.user.email,
      role: 'admin',
    };
  },

  isAuthenticated: () => {
    // Note: checking localStorage directly for supabase token is an approximation
    // Better to use supabase.auth.getSession() async, but for sync checking in standard routing:
    const key = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
    return !!key;
  }
};