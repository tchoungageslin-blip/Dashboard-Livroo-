import React, { useState } from 'react';
import { X, Package, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { DeliveryProject } from '../types';

interface AddDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (delivery: Omit<DeliveryProject, 'id'>) => void;
}

const AddDeliveryModal: React.FC<AddDeliveryModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('standard');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;

    let iconBg = 'bg-blue-50';
    let iconColor = 'text-blue-500';

    if (type === 'express') {
      iconBg = 'bg-emerald-50';
      iconColor = 'text-emerald-500';
    } else if (type === 'priority') {
      iconBg = 'bg-amber-50';
      iconColor = 'text-amber-500';
    }

    onAdd({
      title,
      dueDate: `Due: ${new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      iconBg,
      iconColor
    });
    
    // Reset form
    setTitle('');
    setDate('');
    setType('standard');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl transform transition-all scale-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add New Delivery</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Delivery Title / Route</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Route: Downtown to Airport"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Due Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm font-medium text-gray-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Priority Type</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button"
                onClick={() => setType('standard')}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${type === 'standard' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                Standard
              </button>
              <button 
                type="button"
                onClick={() => setType('express')}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${type === 'express' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                Express
              </button>
              <button 
                type="button"
                onClick={() => setType('priority')}
                className={`py-2 rounded-xl text-sm font-medium border transition-all ${type === 'priority' ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
              >
                Priority
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 bg-[#0f392b] hover:bg-emerald-900 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
          >
            <Package size={18} />
            Create Delivery
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDeliveryModal;