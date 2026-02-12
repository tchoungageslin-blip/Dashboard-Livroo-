import React from 'react';
import { Plus, Package, MapPin, Navigation, Clock } from 'lucide-react';
import { RecentDeliveriesProps } from '../types';

const RecentDeliveries: React.FC<RecentDeliveriesProps> = ({ deliveries }) => {
  return (
    <div className="bg-white rounded-[32px] p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg text-gray-800">Recent Orders</h3>
        <button className="flex items-center gap-1 text-xs font-semibold border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors">
          <Plus size={14} />
          New
        </button>
      </div>

      <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[250px]">
        {deliveries.length > 0 ? (
          deliveries.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors -mx-2">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.iconBg} ${item.iconColor}`}>
                {index === 0 ? <Navigation size={18} /> : 
                 index === 1 ? <Package size={18} /> :
                 index === 2 ? <MapPin size={18} /> : <Clock size={18} />}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{item.title}</h4>
                <p className="text-xs text-gray-400 font-medium">{item.dueDate}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No deliveries found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentDeliveries;