import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { RiderListProps } from '../types';

const RiderList: React.FC<RiderListProps> = ({ riders, onRiderClick }) => {
  const [filter, setFilter] = useState('All');

  const filteredRiders = riders.filter(rider => 
    filter === 'All' || rider.status === filter
  );

  return (
    <div className="bg-white rounded-[32px] p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Top Riders</h3>
        <div className="flex gap-2 items-center">
            <div className="relative group">
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-emerald-100 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <option value="All">All Status</option>
                    <option value="On Delivery">On Delivery</option>
                    <option value="Available">Available</option>
                    <option value="Offline">Offline</option>
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-gray-600" />
            </div>
            <button className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600 sm:gap-1" title="Ajouter livreur">
                <Plus size={14} />
                <span className="hidden sm:inline text-xs font-semibold">Ajouter livreur</span>
            </button>
        </div>
      </div>

      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[250px]">
        {filteredRiders.length > 0 ? (
          filteredRiders.map((rider) => (
            <div 
              key={rider.id} 
              onClick={() => onRiderClick && onRiderClick(rider)}
              className="flex items-start gap-4 p-2 -mx-2 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors group"
            >
              <img src={rider.avatar} alt={rider.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-emerald-700 transition-colors">{rider.name}</h4>
                  <StatusBadge status={rider.status} />
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {rider.currentTask.replace('Working on ', '')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No riders found {filter !== 'All' && 'with this status'}.
          </div>
        )}
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let styles = '';
  switch (status) {
    case 'Available':
      styles = 'bg-emerald-50 text-emerald-600 border-emerald-100';
      break;
    case 'On Delivery':
      styles = 'bg-amber-50 text-amber-600 border-amber-100';
      break;
    case 'Offline':
      styles = 'bg-red-50 text-red-600 border-red-100';
      break;
    default:
      styles = 'bg-gray-50 text-gray-600';
  }

  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded-md border ${styles}`}>
      {status}
    </span>
  );
};

export default RiderList;