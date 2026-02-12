import React from 'react';
import { X, Phone, Mail, Star, Package, Zap, MapPin, Clock } from 'lucide-react';
import { Rider } from '../types';

interface RiderDetailsModalProps {
  rider: Rider | null;
  onClose: () => void;
}

const RiderDetailsModal: React.FC<RiderDetailsModalProps> = ({ rider, onClose }) => {
  if (!rider) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white rounded-[32px] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-[#0f392b] to-emerald-800 relative">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 bg-black/20 text-white rounded-full hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-8 pb-8 -mt-12 flex-1 overflow-y-auto custom-scrollbar">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-8">
            <img 
              src={rider.avatar} 
              alt={rider.name} 
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-white" 
            />
            <div className="flex-1 mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{rider.name}</h2>
                  <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-mono text-xs">ID: {rider.id}</span>
                    <span>• Joined Oct 2023</span>
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  rider.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  rider.status === 'On Delivery' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {rider.status}
                </span>
              </div>
            </div>
          </div>

          {/* Contact & Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <a href={`tel:${rider.phone}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Phone</p>
                <p className="text-sm font-semibold text-gray-800">{rider.phone || "+1 (555) 000-0000"}</p>
              </div>
            </a>
            <a href={`mailto:${rider.email}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Email</p>
                <p className="text-sm font-semibold text-gray-800">{rider.email || "rider@motoflow.com"}</p>
              </div>
            </a>
          </div>

          {/* Live Location Coordinates (New Section) */}
          {rider.position && rider.status !== 'Offline' && (
            <div className="mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-gray-100 text-emerald-600 rounded-full flex items-center justify-center shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Live Coordinates</p>
                  <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    GPS Signal Active
                  </p>
                </div>
              </div>
              <div className="flex gap-6 text-right">
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Latitude</p>
                   <p className="text-sm font-mono font-bold text-gray-700">
                     {(40.7128 + ((rider.position.y - 50) * 0.001)).toFixed(6)}° N
                   </p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Longitude</p>
                   <p className="text-sm font-mono font-bold text-gray-700">
                     {(-74.0060 + ((rider.position.x - 50) * 0.001)).toFixed(6)}° W
                   </p>
                </div>
              </div>
            </div>
          )}

          {/* Metrics */}
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="text-amber-400 mb-2"><Star size={24} fill="currentColor" /></div>
              <span className="text-2xl font-bold text-gray-800">{rider.metrics?.rating || 4.8}</span>
              <span className="text-xs text-gray-400">Rating</span>
            </div>
            <div className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="text-emerald-500 mb-2"><Package size={24} /></div>
              <span className="text-2xl font-bold text-gray-800">{rider.metrics?.totalDeliveries || 124}</span>
              <span className="text-xs text-gray-400">Deliveries</span>
            </div>
            <div className="p-4 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="text-blue-500 mb-2"><Zap size={24} /></div>
              <span className="text-2xl font-bold text-gray-800">{rider.metrics?.efficiency || "94%"}</span>
              <span className="text-xs text-gray-400">Efficiency</span>
            </div>
          </div>

          {/* Current Task */}
          {rider.status === 'On Delivery' && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Current Task</h3>
              <div className="bg-[#0f392b] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                   <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                     Live Tracking
                   </div>
                   <h4 className="text-lg font-bold mb-4">{rider.currentTask}</h4>
                   <div className="flex items-center gap-4 text-emerald-100/80 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Est. 15 mins</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>3.2 km left</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {/* History */}
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">Recent History</h3>
          <div className="space-y-3">
            {rider.history && rider.history.length > 0 ? (
              rider.history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                    }`}>
                      <Package size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{item.location}</p>
                      <p className="text-xs text-gray-500">{item.date} • {item.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-800">{item.amount}</p>
                    <p className={`text-xs font-semibold ${item.status === 'Completed' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {item.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
               <div className="text-center py-4 text-gray-400 text-sm">No recent history available.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default RiderDetailsModal;