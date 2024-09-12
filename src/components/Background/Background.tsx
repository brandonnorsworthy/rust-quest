import React from 'react';

import backgroundImg from '@/assets/background.png'

const Background: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[-1]">
      {/* Image Background */}
      <img src={backgroundImg} alt="background" className="absolute top-0 left-0 object-cover w-full h-full" />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle, rgba(36, 34, 28, 0), rgba(36, 34, 28, 0.5))" }}>
      </div>
    </div>
  );
};

export default Background;