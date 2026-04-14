import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { upgradeToPremium } from '../services/wellnessService';

interface PaymentFormData {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, userId }) => {
  const [step, setStep] = useState<'selection' | 'checkout'>('selection');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Controller setup
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<PaymentFormData>({
    defaultValues: { name: '', number: '', expiry: '', cvv: '' }
  });

  const watchedValues = watch();

  const handleFinalPayment = async (data?: PaymentFormData) => {
    setIsProcessing(true);
    // userId is required to persist the premium status in wellnessService
    const success = await upgradeToPremium(userId);
    if (success) {
      alert(data ? `Welcome to Premium, ${data.name}!` : "Payment Verified! Welcome to Premium.");
      onClose();
    }
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-lg bg-[#0a0a0e] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-fade-in">
        
        {/* Top Controls */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
          {step === 'checkout' && (
            <button onClick={() => setStep('selection')} className="text-purple-400 text-[10px] font-black uppercase tracking-widest hover:text-purple-300 transition-colors">
              ← Back
            </button>
          )}
          <button onClick={onClose} className="ml-auto text-white/20 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {step === 'selection' ? (
          /* --- PLAN SELECTION --- */
          <div className="p-12 pt-24 flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-6 rounded-full bg-purple-600/20 flex items-center justify-center border border-purple-500/30">
              <span className="text-2xl italic font-serif text-purple-400">M</span>
            </div>
            <p className="text-purple-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">The Next Level</p>
            <h2 className="text-4xl font-bold text-white mb-8 tracking-tighter">Maia Premium</h2>
            
            <div className="w-full bg-white/5 border border-white/10 rounded-[32px] p-8 mb-10 text-left">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Subscription</span>
                <span className="text-white text-3xl font-bold">$49<span className="text-sm opacity-30">.90</span></span>
              </div>
              <ul className="space-y-4 text-xs text-white/60 font-medium">
                <li className="flex items-center gap-3"><span className="text-purple-500">✦</span> Unlimited AI Wellness Checks</li>
                <li className="flex items-center gap-3"><span className="text-purple-500">✦</span> Pro Visual Mood Analysis</li>
                <li className="flex items-center gap-3"><span className="text-purple-500">✦</span> Advanced Personal Insights</li>
              </ul>
            </div>

            <button 
              onClick={() => setStep('checkout')}
              className="w-full py-6 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
              Unlock Access
            </button>
          </div>
        ) : (
          /* --- CHECKOUT VIEW --- */
          <div className="p-10 pt-24 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Checkout</h2>
            
            {/* Payment Method Switcher */}
            <div className="flex bg-white/5 p-1 rounded-2xl mb-10 border border-white/10">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                Card
              </button>
              <button 
                onClick={() => setPaymentMethod('qr')}
                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'qr' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                GPay / UPI
              </button>
            </div>

            {paymentMethod === 'card' ? (
              /* CREDIT CARD FORM */
              <form onSubmit={handleSubmit(handleFinalPayment)} className="animate-slide-up">
                {/* Premium Canvas Card Preview */}
                <div className="w-full aspect-[1.6/1] bg-gradient-to-br from-zinc-800 to-black rounded-3xl p-8 mb-10 border border-white/10 relative overflow-hidden">
                   <div className="flex justify-between items-start mb-12 relative z-10">
                      <div className="w-12 h-10 bg-yellow-600/30 rounded-lg border border-yellow-600/20 shadow-inner"></div>
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Premium Canvas</p>
                   </div>
                   <p className="text-xl text-white font-mono tracking-[0.25em] mb-10 relative z-10">
                     {watchedValues.number || "••••  ••••  ••••  ••••"}
                   </p>
                   <div className="flex justify-between text-white/40 text-[9px] font-black uppercase tracking-widest relative z-10">
                     <div>
                       <p className="mb-1 opacity-50 font-bold">Holder</p>
                       <p className="text-xs text-white tracking-normal uppercase">{watchedValues.name || "YOUR NAME"}</p>
                     </div>
                     <div className="text-right">
                       <p className="mb-1 opacity-50 font-bold">Expires</p>
                       <p className="text-xs text-white tracking-normal">{watchedValues.expiry || "MM/YY"}</p>
                     </div>
                   </div>
                   <div className="absolute top-[-50%] right-[-20%] w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full"></div>
                </div>

                {/* Form Controls */}
                <div className="space-y-4">
                  <div>
                    <Controller name="name" control={control} rules={{ required: "Name is required" }} render={({ field }) => (
                      <input {...field} placeholder="Name on Card" className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} p-4 rounded-xl text-white text-sm focus:border-purple-500 outline-none`} />
                    )} />
                    {errors.name && <p className="text-red-400 text-[9px] font-bold mt-1 uppercase ml-2">{errors.name.message}</p>}
                  </div>

                  <div>
                    <Controller name="number" control={control} rules={{ required: "Valid card required", minLength: 19 }} render={({ field }) => (
                      <input {...field} placeholder="Card Number" maxLength={19} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
                          setValue('number', val.slice(0, 19));
                        }}
                        className={`w-full bg-white/5 border ${errors.number ? 'border-red-500/50' : 'border-white/10'} p-4 rounded-xl text-white text-sm font-mono focus:border-purple-500 outline-none`} />
                    )} />
                    {errors.number && <p className="text-red-400 text-[9px] font-bold mt-1 uppercase ml-2">{errors.number.message}</p>}
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Controller name="expiry" control={control} rules={{ required: "Required", pattern: /^(0[1-9]|1[0-2])\/\d{2}$/ }} render={({ field }) => (
                        <input {...field} placeholder="MM/YY" maxLength={5} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm focus:border-purple-500 outline-none" />
                      )} />
                    </div>
                    <div className="w-1/3">
                      <Controller name="cvv" control={control} rules={{ required: "Required", minLength: 3 }} render={({ field }) => (
                        <input {...field} type="password" placeholder="CVV" maxLength={3} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white text-sm focus:border-purple-500 outline-none" />
                      )} />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={isProcessing} className="w-full py-6 mt-10 bg-purple-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-purple-500 shadow-xl shadow-purple-900/20 active:scale-95 transition-all">
                  {isProcessing ? "Verifying..." : "Pay $49.90"}
                </button>
              </form>
            ) : (
              /* GPAY QR VIEW */
              /* --- RELIABLE GPAY QR VIEW --- */
              <div className="flex flex-col items-center animate-fade-in text-center pb-6">
                {/* QR Container with forced dimensions and background */}
                <div className="bg-white p-4 rounded-[30px] mb-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] flex items-center justify-center min-w-[200px] min-h-[200px]">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=bianca@upi&pn=EmoSphere&am=49.90&cu=INR" 
                    alt="Scan to Pay"
                    className="w-48 h-48 block"
                    onLoad={() => console.log("QR Loaded")}
                    onError={(e) => {
                      // Fallback if the API fails
                      e.currentTarget.src = "https://placehold.co/200x200/FFFFFF/000000?text=Scan+UPI+bianca@upi";
                    }}
                  />
                </div>
                
                <div className="flex items-center gap-3 mb-10 px-6 py-2 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white/60 font-mono text-xs tracking-wider font-bold">UPI ID: bianca@upi</span>
                </div>

                <p className="text-white/30 text-[10px] uppercase font-black tracking-[0.2em] mb-10 leading-relaxed">
                  Open GPay, PhonePe, or any UPI App <br/> and scan to activate Premium
                </p>

                <button 
                  onClick={() => handleFinalPayment()}
                  disabled={isProcessing}
                  className="w-full py-6 bg-green-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-green-500 shadow-[0_10px_30px_rgba(22,163,74,0.3)] active:scale-95 transition-all"
                >
                  {isProcessing ? "Verifying Transaction..." : "I've Completed Payment"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;