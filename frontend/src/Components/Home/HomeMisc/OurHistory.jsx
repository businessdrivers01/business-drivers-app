import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from '../../../assets/OurHistory/slide1.jpg';
import slide2 from '../../../assets/OurHistory/slide2.jpg';
import slide3 from '../../../assets/OurHistory/slide3.jpg';
import slide4 from '../../../assets/OurHistory/slide4.jpg';
import slide5 from '../../../assets/OurHistory/slide5.jpg';

function OurHistory() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        
        
    };

    const slides = [
        {
            image: slide1,
            alt: 'Slide 1',
        },
        {
            image: slide2,
            alt: 'Slide 2',
        },
        {
            image: slide3,
            alt: 'Slide 3',
        },
        {
            image: slide4,
            alt: 'Slide 4',
        },
        {
            image: slide5,
            alt: 'Slide 5',
        },
    ];

    return (
        <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="md:flex md:items-center md:space-x-8 lg:space-x-16">
                {/* Text Section */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h2 className="text-darkBlue text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-center md:text-left">
                        Our History
                    </h2>
                    <div className="space-y-4 text-lightBlue text-lg md:text-xl">
                        <p>
                            Founded in 2024, Business Drivers01 emerged from a vision to revolutionize the way businesses and talented professionals connect in the digital age.
                        </p>
                        <p>
                            Our journey began with a small team of passionate entrepreneurs who recognized the growing need for a platform that could bridge the gap between companies seeking specialized skills and freelancers looking for meaningful projects.
                        </p>
                    </div>
                </div>

                {/* Slider Section */}
                <div className="md:w-1/2">
                    <div className="rounded-xl">
                        <Slider {...settings}>
                            {slides.map((slide, index) => (
                                <div key={index} className="w-full">
                                    <img
                                        loading='lazy'
                                        src={slide.image}
                                        alt={slide.alt}
                                        className="w-full h-auto object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default OurHistory;
