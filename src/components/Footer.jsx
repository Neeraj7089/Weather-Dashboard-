// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
    <footer className="mt-12 py-6 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>© 2025 Weather Dashboard. Powered by Mock Data.</p>
        <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-google-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-google-blue transition-colors">Terms</a>
            <a href="#" className="hover:text-google-blue transition-colors">About</a>
        </div>
    </footer>
);

export default Footer;
