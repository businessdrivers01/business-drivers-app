import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerSections = [
  {
    title: 'BusinessDrivers01',
    content: (
      <div>
        <p className="text-sm text-gray-300 mb-4">
          Connecting talented freelancers with innovative businesses worldwide.
        </p>
        <div className="flex space-x-4">
          <NavLink to="https://www.instagram.com/businessdrivers01" target='_blank' className="text-gray-300 hover:text-orange transition-colors">
            <Instagram size={20} />
          </NavLink>
          <NavLink to="https://www.linkedin.com/company/businessdrivers/" target='_blank' className="text-gray-300 hover:text-orange transition-colors">
            <Linkedin size={20} />
          </NavLink>
        </div>
      </div>
    )
  },
  {
    title: 'Quick Links',
    links: [
      { id: 1, title: "Find Work", route: "/signup" },
      { id: 2, title: "Find Talent", route: "/signup" },
      { id: 3, title: "Free Courses", route: "/free-courses" },
      { id: 4, title: "Blogs", route: "/blogs" },
      { id: 5, title: "Contact Us", route: "/contact-us" }
    ]
  },
  {
    title: 'Resources',
    links: [
      { id: 1, title: "Help Center", route: "/contact-us" },
      { id: 2, title: "Terms of Service", route: "/terms-of-service" },
      { id: 3, title: "Privacy Policy", route: "/privacy-policy" },
    ]
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className={`text-lg font-semibold mb-4 ${index === 0 ? 'text-2xl text-orange' : ''}`}>
                {section.title}
              </h4>
              {section.links ? (
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.id}>
                      <NavLink to={link.route} className="text-gray-300 hover:text-orange transition-colors">
                        {link.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              ) : (
                section.content
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} BusinessDrivers01. All rights reserved.
          </p>
          <p className="text-sm text-gray-300 mt-4 sm:mt-0">
            Photos provided by <NavLink to="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">Pexels</NavLink>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
