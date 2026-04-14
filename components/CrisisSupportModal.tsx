import React from 'react';

interface CrisisSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrisisSupportModal: React.FC<CrisisSupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resources = [
    {
      name: "988 Suicide & Crisis Lifeline",
      desc: "Available 24/7 in English and Spanish (USA & Canada)",
      action: "Call or Text 988",
      link: "tel:988",
      primary: true
    },
    {
      name: "Crisis Text Line",
      desc: "Text HOME to 741741 to connect with a Crisis Counselor",
      action: "Text 741741",
      link: "sms:741741",
      primary: false
    },
    {
      name: "International Resources",
      desc: "Find help outside of the USA through Befrienders Worldwide",
      action: "Visit Site",
      link: "https://www.befrienders.org/",
      primary: false
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white w-full max-w-xl shape-premium p-10 shadow-2xl border border-rose-100 transform animate-scale-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">You are not alone.</h2>
            <p className="text-gray-500 font-medium">Please reach out to these professional services for immediate support.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-100 shape-premium text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-rose-50 border border-rose-100 shape-premium">
            <h3 className="text-rose-800 font-bold flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              Immediate Danger?
            </h3>
            <p className="text-rose-700 text-sm mb-4">If you or someone else is in immediate physical danger, please call your local emergency services (e.g., 911) right away.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {resources.map((res, i) => (
              <a 
                key={i}
                href={res.link}
                target={res.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className={`p-6 shape-premium border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  res.primary 
                    ? 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-white border-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="text-center sm:text-left">
                  <h4 className={`font-bold ${res.primary ? 'text-white' : 'text-gray-800'}`}>{res.name}</h4>
                  <p className={`text-xs ${res.primary ? 'text-gray-400' : 'text-gray-500'}`}>{res.desc}</p>
                </div>
                <div className={`px-6 py-2 shape-premium text-sm font-bold whitespace-nowrap ${
                  res.primary ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-700'
                }`}>
                  {res.action}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            Remember, reaching out is a sign of immense strength. 🤍
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisSupportModal;