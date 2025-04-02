import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Create appropriate sub-navigation based on current section
  const renderSubNavigation = () => {
    // Don't show sub-navigation on home page
    if (location.pathname === '/') {
      return null;
    }
    
    // For Assessment section
    if (location.pathname.startsWith('/assessment')) {
      return (
        <div className="border-b bg-white">
          <div className="container">
            <nav className="flex h-10 items-center space-x-4 text-sm">
              <Link 
                to="/assessment" 
                className={`flex items-center px-2 ${location.pathname === '/assessment' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-muted-foreground hover:text-blue-600'}`}
              >
                Assessment
              </Link>
              <Link 
                to="/assessment/view" 
                className={`flex items-center px-2 ${location.pathname === '/assessment/view' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-muted-foreground hover:text-blue-600'}`}
              >
                View Results
              </Link>
              <Link 
                to="/assessment/export" 
                className={`flex items-center px-2 ${location.pathname === '/assessment/export' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-muted-foreground hover:text-blue-600'}`}
              >
                Export Results
              </Link>
            </nav>
          </div>
        </div>
      );
    }
    
    // For Results section
    if (location.pathname.startsWith('/results')) {
      return (
        <div className="border-b bg-white">
          <div className="container">
            <nav className="flex h-10 items-center space-x-4 text-sm">
              <Link 
                to="/results" 
                className={`flex items-center px-2 ${location.pathname === '/results' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-muted-foreground hover:text-blue-600'}`}
              >
                Summary
              </Link>
              <Link 
                to="/results/detailed" 
                className={`flex items-center px-2 ${location.pathname === '/results/detailed' ? 'border-b-2 border-blue-600 text-blue-600 font-medium' : 'text-muted-foreground hover:text-blue-600'}`}
              >
                Detailed View
              </Link>
            </nav>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Header */}
      <header className={`main-header bg-white ${scrolled ? 'scrolled' : ''}`}>
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="header-logo">
              <Link to="/" className="flex items-center">
                <span className="font-semibold text-lg">SimpleGRC</span>
                <span className="ml-2 text-sm text-muted-foreground">Assessment Tool</span>
              </Link>
            </div>
            
            <nav className="main-nav">
              <Link 
                to="/assessment"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname.startsWith('/assessment') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Assessment
              </Link>
              <Link 
                to="/results"
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname.startsWith('/results') ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Results
              </Link>
              <a 
                href="https://foxxcyber.com/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-100"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Sub Navigation */}
      {renderSubNavigation()}
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container text-center text-sm text-muted-foreground">
          <p>SimpleGRC Assessment Tool &copy; 2023-2024 | Powered by <a href="https://foxxcyber.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FoxxCyber</a></p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout; 