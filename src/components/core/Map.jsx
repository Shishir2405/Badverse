import React, { useState } from "react";

const MapScreen = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
  });

  return (
    <div className=" h-[340px] w-full border  mx-auto rounded-xl overflow-hidden max-w-7xl ">

       <div style={{ maxWidth: '100%', listStyle: 'none', transition: 'none', overflow: 'hidden', width: '100%', height: '100%' }}>
            <div id="google-maps-canvas" style={{ height: '100%', width: '100%', maxWidth: '100%' }}>
            <iframe
                loading='lazy'
                style={{ height: '100%', width: '100%', border: '0' }}
                frameBorder="0"
                src="https://www.google.com/maps/embed/v1/place?q=ips+academy,+institute+of+engineering&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
            ></iframe>
            </div>
            <style>{`
            #google-maps-canvas img.text-marker {
                max-width: none !important;
                background: none !important;
            }
            `}</style>
        </div>
    </div>
  );
    }

export default MapScreen;