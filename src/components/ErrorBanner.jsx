// src/components/ErrorBanner.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const ErrorBanner = ({ message }) => (
    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 mb-6 animate-in slide-in-from-top-2">
        <AlertCircle size={20} />
        <p className="font-medium">{message}</p>
    </div>
);

ErrorBanner.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorBanner;
