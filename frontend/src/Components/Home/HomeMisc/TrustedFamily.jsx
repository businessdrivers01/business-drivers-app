import React from 'react';
import Marquee from 'react-fast-marquee';

import client1 from "../../../assets/TrustedFamily/client1.png";
import client2 from "../../../assets/TrustedFamily/client2.webp";
import client3 from "../../../assets/TrustedFamily/client3.png";
import client4 from "../../../assets/TrustedFamily/client4.png";
import client5 from "../../../assets/TrustedFamily/client5.png";
import client6 from "../../../assets/TrustedFamily/client6.webp";
import client7 from "../../../assets/TrustedFamily/client7.png";
import client8 from "../../../assets/TrustedFamily/client8.png";
import client9 from "../../../assets/TrustedFamily/client9.png";
import client10 from "../../../assets/TrustedFamily/client10.png";
import client11 from "../../../assets/TrustedFamily/client11.png";
import client12 from "../../../assets/TrustedFamily/client12.png";

// Array of logos
const logos = [
    client1,
    client2,
    client3,
    client4,
    client5,
    client6,
    client7,
    client8,
    client9,
    client10,
    client11,
    client12,
];

function TrustedFamily() {
    return (
        <div className="bg-white py-10 md:my-16">
            <h2 className="text-darkBlue text-3xl md:text-6xl font-bold text-center">
                Our Trusted Family
            </h2>
            <div className="overflow-hidden w-full mt-12">
                <Marquee gradient={false} speed={80}>
                    {logos.map((logo, index) => (
                        <div key={index} className="px-4">
                            <img src={logo} alt="Company Logo" className="h-20 md:h-28 object-contain" />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
}

export default TrustedFamily;
