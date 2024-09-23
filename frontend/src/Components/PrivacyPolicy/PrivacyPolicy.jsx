import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white border-2 border-orange text-darkBlue min-h-screen rounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-orange mb-8">Privacy Policy</h1>
        <p className="text-darkBlue mb-4">
          At BusinessDrivers01, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">1. Information We Collect</h2>
        <p className="text-darkBlue mb-4">
          We may collect personal information such as your name, email address, and payment details when you sign up for our services or contact us. Additionally, we collect non-personal data like browser type, device information, and browsing activity.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">2. How We Use Your Information</h2>
        <p className="text-darkBlue mb-4">
          The information we collect is used to provide and improve our services, process transactions, and communicate with you about your account or our services. We may also use your data for marketing and promotional purposes, with your consent.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">3. Sharing Your Information</h2>
        <p className="text-darkBlue mb-4">
          We do not sell or rent your personal information to third parties. However, we may share your information with trusted partners who assist us in operating our website and providing our services, as long as those parties agree to keep this information confidential.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">4. Security</h2>
        <p className="text-darkBlue mb-4">
          We take the security of your personal information seriously. We use various security measures, such as encryption and firewalls, to protect your data. However, please note that no method of data transmission over the Internet or electronic storage is completely secure.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">5. Your Rights</h2>
        <p className="text-darkBlue mb-4">
          You have the right to access, modify, or delete your personal information. If you would like to exercise any of these rights, please contact us at <a href="mailto:info@businessdrivers01.com" className="text-orange hover:underline">info@businessdrivers01.com</a>.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">6. Changes to This Policy</h2>
        <p className="text-darkBlue mb-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review this page periodically for updates.
        </p>

        <h2 className="text-2xl font-semibold text-orange mb-4">7. Contact Us</h2>
        <p className="text-darkBlue mb-4">
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@businessdrivers01.com" className="text-orange hover:underline">info@businessdrivers01.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
