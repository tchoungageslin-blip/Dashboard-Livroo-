import React, { useState } from 'react';
import { X, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { Rider } from '../types';

interface AddRiderModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Updated signature to include 'id'
  onAdd: (rider: Omit<Rider, 'avatar' | 'metrics' | 'history'>) => void;
}

const AddRiderModal: React.FC<AddRiderModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'Available' | 'Offline'>('Available');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    // Automatically generate a unique rider ID
    const generatedId = `RID-${Math.floor(1000 + Math.random() * 9000)}`;

    onAdd({
      id: generatedId,
      name,
      phone,
      email,
      status,
      currentTask: status === 'Available' ? 'Waiting for assignment' : 'Offline'
    });
    
    // Reset form
    setName('');
    setPhone('');
    setEmail('');
    setStatus('Available');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add New Driver</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Driver Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 000-0000"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. driver@motoflow.com"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Initial Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={() => setStatus('Available')}
                className={`py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${status === 'Available' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                Available
                {status === 'Available' && <CheckCircle size={14} />}
              </button>
              <button 
                type="button"
                onClick={() => setStatus('Offline')}
                className={`py-3 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${status === 'Offline' ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                Offline
                {status === 'Offline' && <CheckCircle size={14} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-[#0f392b] hover:bg-emerald-900 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
          >
            <User size={18} />
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRiderModal;