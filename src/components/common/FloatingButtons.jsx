import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiX, FiUserPlus } from 'react-icons/fi';
import RegisterForm from './RegisterForm';

const FloatingButtons = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  
  // Show buttons when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowButtons(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    // WhatsApp API URL with predefined message
    const whatsappNumber = '+201123928909'; // Replace with your actual WhatsApp number with country code
    const message = encodeURIComponent('Hi, I\'m interested in your real estate properties!');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <div className="fixed right-0 bottom-0 z-30 flex flex-col gap-3 mr-4 mb-16">
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className={`grid w-9 h-9 place-items-center rounded-full bg-green-500 text-white shadow shadow-green-500/60 transition-all duration-300 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp />
      </button>

      {/* Register Button */}
      <button
        onClick={toggleRegisterForm}
        className={`grid w-9 h-9 place-items-center rounded-full bg-primary text-white shadow shadow-primary/60 transition-all duration-300 ${showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Register Form"
      >
        {showRegisterForm ? <FiX /> : <FiUserPlus />}
      </button>

      {/* Register Form Modal */}
      {showRegisterForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-card-dark rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative">
            <button
              onClick={toggleRegisterForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Register Your Interest</h2>
            <RegisterForm onClose={toggleRegisterForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingButtons;