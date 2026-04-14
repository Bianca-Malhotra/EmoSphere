import React from 'react';

interface TermsModalProps {
  onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-[95%] max-w-3xl max-h-[85vh] rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">Terms of Service</h2>
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
            By using EmoSphere, you agree to the following terms and conditions.
          </p>

          <h3 className="font-semibold">1. Use of Service</h3>
          <p>
            EmoSphere provides emotional wellness tools and insights. It is not
            a substitute for professional medical advice.
          </p>

          <h3 className="font-semibold">2. User Responsibility</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and data.
          </p>

          <h3 className="font-semibold">3. Limitation of Liability</h3>
          <p>
            EmoSphere is not liable for decisions made based on AI-generated
            suggestions.
          </p>

          <h3 className="font-semibold">4. Modifications</h3>
          <p>
            We reserve the right to update these terms at any time.
          </p>

          <p className="text-xs text-gray-500 pt-4">
            Last Updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;