import React from 'react';
import logo from './logo.png'; // Make sure the path matches your folder

interface LogoProps {
  className?: string;       // Optional Tailwind / CSS classes
  altText?: string;         // Optional alt text for accessibility
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10", altText = "EmoSphere Logo" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src={logo}
        alt={altText}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;