import React, { useState } from 'react';
import { X, Building2, MapPin, User, Image as ImageIcon } from 'lucide-react';
import { Agency } from '../types';

interface RegisterAgencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (agency: Omit<Agency, 'id' | 'totalRiders' | 'activeRiders' | 'revenue'>) => void;
}

const RegisterAgencyModal: React.FC<RegisterAgencyModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [adminName, setAdminName] = useState('');
  const [plan, setPlan] = useState<'Basic' | 'Pro' | 'Enterprise'>('Basic');
  const [logoPreview, setLogoPreview] = useState<string>('');

  if (!isOpen) return null;

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onRegister({
      name,
      location,
      adminName,
      subscriptionPlan: plan,
      status: 'Active',
      logo: logoPreview || '', // Pass empty string if no logo to let parent handle fallback or display default
    });
    
    // Reset form
    setName('');
    setLocation('');
    setAdminName('');
    setPlan('Basic');
    setLogoPreview('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl transform transition-all">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Register New Agency</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Logo Upload Section */}
          <div className="flex justify-center mb-2">
            <div className="relative group cursor-pointer">
              <div className={`w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors ${logoPreview ? 'border-emerald-500' : 'border-gray-300 hover:border-emerald-400 bg-gray-50'}`}>
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="mx-auto text-gray-400 mb-1" size={20} />
                    <span className="text-[10px] text-gray-400 font-medium">Upload Logo</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleLogoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {logoPreview && (
                 <button 
                   type="button" 
                   onClick={(e) => { e.preventDefault(); setLogoPreview(''); }}
                   className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 z-10"
                 >
                   <X size={12} />
                 </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Agency Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. FastTrack Logistics"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Location / Zone</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. North District"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                    required
                  />
                </div>
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="e.g. Alice Doe"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm font-medium"
                    required
                  />
                </div>
             </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subscription Plan</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Basic', 'Pro', 'Enterprise'] as const).map((p) => (
                <button 
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    plan === p 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                    : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-xl shadow-blue-600/20"
          >
            <Building2 size={18} />
            Register Agency
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAgencyModal;