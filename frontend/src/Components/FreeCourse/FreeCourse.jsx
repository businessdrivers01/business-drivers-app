import React from 'react';

const FreeCourse = ({ title, description, videoUrl, youtubeUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe 
          src={videoUrl} 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-darkBlue mb-2">{title}</h2>
        <p className="text-lightBlue mb-4">{description}</p>
        <a 
          href={youtubeUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block bg-orange text-white font-semibold py-2 px-4 rounded hover:bg-darkBlue transition-colors duration-300"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default FreeCourse;