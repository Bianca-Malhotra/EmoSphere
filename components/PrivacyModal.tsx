import React from 'react';

interface PrivacyModalProps {
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[95%] max-w-3xl max-h-[85vh] rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Privacy Policy</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh] text-sm text-gray-700 space-y-4">
          <p>
            At EmoSphere, your privacy is important to us. We collect only the
            information necessary to improve your emotional wellness experience.
          </p>

          <h3 className="font-semibold">1. Information We Collect</h3>
          <p>
            Mood entries, journal content, usage analytics, and optional
            account details.
          </p>

          <h3 className="font-semibold">2. How We Use Your Data</h3>
          <p>
            To personalize insights, improve features, and enhance emotional
            support recommendations.
          </p>

          <h3 className="font-semibold">3. Data Security</h3>
          <p>
            We implement industry-standard safeguards to protect your data.
          </p>

          <h3 className="font-semibold">4. Third-Party Services</h3>
          <p>
            We may use secure third-party APIs for AI features and analytics.
          </p>

          <p className="text-xs text-gray-500 pt-4">
            Last Updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;