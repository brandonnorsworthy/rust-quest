import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: { [key: string]: unknown }[];
  }
}

const GoogleAd: React.FC = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <ins className="block"
      data-ad-client="ca-pub-5847064233473326"
      data-ad-slot="2487818800"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  );
};

export default GoogleAd;