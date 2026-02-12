import React, { useState } from 'react';
import { Rider } from '../types';
import { Maximize2, Plus, Minus } from 'lucide-react';

interface LiveMapProps {
  riders: Rider[];
  selectedRiderId?: string | null;
  onRiderSelect?: (id: string) => void;
}

const LiveMap: React.FC<LiveMapProps> = ({ riders, selectedRiderId, onRiderSelect }) => {
  // State for filtering based on status
  const [activeFilters, setActiveFilters] = useState<string[]>(['On Delivery', 'Available', 'Offline']);
  const [zoom, setZoom] = useState(1);

  const toggleFilter = (status: string) => {
    setActiveFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status]
    );
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));

  const filteredRiders = riders.filter(rider => activeFilters.includes(rider.status));
  const selectedRider = riders.find(r => r.id === selectedRiderId);

  // Helper to get color based on status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'On Delivery': return 'bg-amber-500 shadow-amber-500/50';
      case 'Available': return 'bg-emerald-500 shadow-emerald-500/50';
      case 'Offline': return 'bg-gray-400 shadow-gray-400/50';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-6 h-full flex flex-col relative overflow-hidden group">
      <div className="flex justify-between items-center mb-4 z-10 relative">
        <div>
          <h3 className="font-bold text-lg text-gray-800">Live Map</h3>
          <p className="text-gray-400 text-xs">Real-time rider tracking</p>
        </div>
        <button className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-600 shadow-sm transition-colors">
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Map Container */}
      <div className="flex-1 bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-200 shadow-inner group/map">
        
        {/* Zoom Controls */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-2 z-30">
          <button 
            onClick={handleZoomIn}
            className="w-8 h-8 bg-white rounded-xl shadow-md text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center"
            title="Zoom In"
          >
            <Plus size={16} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-8 h-8 bg-white rounded-xl shadow-md text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center"
            title="Zoom Out"
          >
            <Minus size={16} />
          </button>
        </div>

        {/* Scalable Map Area */}
        <div 
          className="w-full h-full relative transition-transform duration-500 ease-out origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Decorative Map Background (Abstract Streets) */}
          <div className="absolute inset-0 opacity-40">
            {/* Vertical Roads */}
            <div className="absolute left-[20%] top-0 bottom-0 w-3 bg-white"></div>
            <div className="absolute left-[45%] top-0 bottom-0 w-2 bg-white"></div>
            <div className="absolute left-[80%] top-0 bottom-0 w-4 bg-white"></div>
            
            {/* Horizontal Roads */}
            <div className="absolute top-[30%] left-0 right-0 h-3 bg-white"></div>
            <div className="absolute top-[60%] left-0 right-0 h-4 bg-white"></div>
            <div className="absolute top-[85%] left-0 right-0 h-2 bg-white"></div>
            
            {/* Diagonal / Shapes */}
            <div className="absolute top-[40%] left-[30%] w-24 h-24 border-2 border-white rounded-full"></div>
          </div>

          {/* Route Preview (SVG Overlay) */}
          {selectedRider && selectedRider.status === 'On Delivery' && selectedRider.position && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              {/* Route Line from Center (Hub) to Rider */}
              <path 
                d={`M 50 50 Q ${50 + (selectedRider.position.x - 50)/2} ${selectedRider.position.y}, ${selectedRider.position.x} ${selectedRider.position.y}`} 
                stroke="url(#routeGradient)" 
                strokeWidth="0.8" 
                fill="none" 
                strokeDasharray="2,1"
                className="animate-pulse"
                filter="url(#glow)"
              />
              {/* Hub Marker */}
              <circle cx="50" cy="50" r="1.5" fill="#0f392b" fillOpacity="0.5" />
            </svg>
          )}

          {/* Riders Dots */}
          {filteredRiders.map((rider) => {
            const isSelected = selectedRiderId === rider.id;
            return (
              <div 
                key={rider.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onRiderSelect?.(rider.id);
                }}
                className={`absolute transition-all duration-[3000ms] ease-linear cursor-pointer group/pin z-10 ${isSelected ? 'z-20' : ''}`}
                style={{ 
                  left: `${rider.position?.x || 50}%`, 
                  top: `${rider.position?.y || 50}%` 
                }}
              >
                {/* Scale inverse to keep pin size constant visually */}
                <div style={{ transform: `scale(${1/zoom})` }} className="relative flex items-center justify-center">
                  
                  {/* Selection Ring */}
                  {isSelected && (
                     <div className="absolute -inset-4 border-2 border-emerald-500 rounded-full animate-ping opacity-20"></div>
                  )}

                  {/* Pulse Effect */}
                  <div className={`absolute -inset-2 rounded-full opacity-30 animate-ping ${getStatusColor(rider.status)}`}></div>
                  
                  {/* The Dot */}
                  <div className={`relative w-4 h-4 rounded-full border-2 border-white shadow-lg ${getStatusColor(rider.status)} ${isSelected ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
                    {isSelected && (
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                        {rider.name}
                      </div>
                    )}
                  </div>

                  {/* Tooltip (Hover) */}
                  {!isSelected && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-xl">
                      {rider.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Legend / Filter */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex justify-center">
        <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg border border-gray-100 flex gap-2">
          
          <button 
            onClick={() => toggleFilter('On Delivery')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilters.includes('On Delivery') 
              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
              : 'hover:bg-gray-50 text-gray-400 opacity-60'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${activeFilters.includes('On Delivery') ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
            On Delivery
          </button>

          <button 
            onClick={() => toggleFilter('Available')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilters.includes('Available') 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'hover:bg-gray-50 text-gray-400 opacity-60'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${activeFilters.includes('Available') ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
            Available
          </button>

          <button 
            onClick={() => toggleFilter('Offline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeFilters.includes('Offline') 
              ? 'bg-gray-100 text-gray-600 border border-gray-200' 
              : 'hover:bg-gray-50 text-gray-400 opacity-60'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${activeFilters.includes('Offline') ? 'bg-gray-500' : 'bg-gray-300'}`}></div>
            Offline
          </button>

        </div>
      </div>
    </div>
  );
};

export default LiveMap;