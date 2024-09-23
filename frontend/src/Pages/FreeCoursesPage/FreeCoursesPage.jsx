import React from 'react';
import { FreeCourse } from '../../Components';
import { freeCourses } from './freeCourses';
import { motion } from 'framer-motion';
const FreeCoursesPage = () => {
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-darkBlue mb-8 text-center">Free Technology Courses</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {freeCourses.map((course) => (
                        <FreeCourse key={course.id} {...course} />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FreeCoursesPage;