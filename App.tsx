import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { RequireAuth } from './components/RequireAuth.jsx';

import { HomePage } from './pages/HomePage.jsx';
import { PropertiesPage } from './pages/PropertiesPage.jsx';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { AdminEditor } from './pages/AdminEditor.jsx';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-charcoal bg-offwhite">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin/listings" 
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              } 
            />
            <Route 
              path="/admin/listings/:id" 
              element={
                <RequireAuth>
                  <AdminEditor />
                </RequireAuth>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;