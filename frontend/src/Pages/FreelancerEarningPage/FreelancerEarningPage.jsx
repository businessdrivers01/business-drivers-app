import React from 'react';
import { FreelancerEarning } from '../../Components';
import { freelancers } from './freelancers';
import { Star } from 'lucide-react';

const FiveStarRating = () => {
    return (
        <div className="flex text-orange justify-center my-4">
            {/* Display 5 Star icons */}
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
        </div>
    );
};

const FreelancerEarningPage = () => {

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-darkBlue text-center mx-4">Top Earning Freelancers
                </h1>
                <FiveStarRating />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {freelancers.map((freelancer) => (
                        <FreelancerEarning key={freelancer.id} {...freelancer} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FreelancerEarningPage;