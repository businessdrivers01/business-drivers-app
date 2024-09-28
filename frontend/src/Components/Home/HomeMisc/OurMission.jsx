import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import the images for OurMission
import slide1 from '../../../assets/OurMission/slide1.jpg';
import slide2 from '../../../assets/OurMission/slide2.jpg';
import slide3 from '../../../assets/OurMission/slide3.jpg';
import slide4 from '../../../assets/OurMission/slide4.jpg';
import slide5 from '../../../assets/OurMission/slide5.jpg';

function OurMission() {
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
            alt: 'Mission Slide 1',
        },
        {
            image: slide2,
            alt: 'Mission Slide 2',
        },
        {
            image: slide3,
            alt: 'Mission Slide 3',
        },
        {
            image: slide4,
            alt: 'Mission Slide 4',
        },
        {
            image: slide5,
            alt: 'Mission Slide 5',
        },
    ];

    return (
        <div className="bg-white py-12 md:py-20">
            <div className="px-4 md:px-0">
                <div className="md:flex md:items-center">
                    {/* Text Section */}
                    <div className="md:w-1/2 mb-8 md:mb-0 md:order-2">
                        <h2 className="text-darkBlue text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-center md:text-left">
                            Our Mission
                        </h2>
                        <div className="space-y-4 text-lightBlue text-lg md:text-xl">
                            <p>
                                At BusinessDrivers01, our mission is to empower businesses and freelancers by creating a dynamic, transparent, and efficient marketplace for talent and opportunity.
                            </p>
                            <p>
                                We strive to break down geographical barriers, enabling seamless collaboration between skilled professionals and innovative companies worldwide.
                            </p>
                            <p>
                                Our goal is to foster a community where creativity thrives, skills are valued, and mutual growth is achieved through meaningful projects and partnerships.
                            </p>
                        </div>
                    </div>

                    {/* Slider Section */}
                    <div className="md:w-1/2 md:order-1">
                        <div className="rounded-xl md:mr-8">
                            <Slider {...settings}>
                                {slides.map((slide, index) => (
                                    <div key={index} className="w-full">
                                        <img
                                            loading='lazy'
                                            src={slide.image}
                                            alt={slide.alt}
                                            className="w-full h-auto object-cover rounded-lg"
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

export default OurMission;