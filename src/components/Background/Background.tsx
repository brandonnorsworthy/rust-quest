import React from 'react';

import backgroundImg from '@/assets/background.png'
import background2Img from '@/assets/background-2.jpg'

const Background: React.FC = () => {
  const randomBackground = Math.random() > 0.5 ? backgroundImg : background2Img;

  return (
    <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-black">
      {/* Image Background */}
      <img src={randomBackground} alt="background" className="absolute top-0 left-0 object-cover w-full h-full opacity-75" />
    </div>
  );
};

export default Background;