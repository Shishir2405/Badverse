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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.081344285658!2d75.8876307!3d22.7623623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630323df89187d%3A0xd6f4c705fba9bf1c!2sBeyond%20Coworking%20at%20Spacetime!5e0!3m2!1sen!2sin!4v1735321950657!5m2!1sen!2sin" 
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