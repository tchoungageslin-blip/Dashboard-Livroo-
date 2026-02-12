import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, isPrimary, trendUp, subtitle }) => {
  return (
    <div className={`rounded-[32px] p-6 relative flex flex-col justify-between h-48 transition-transform hover:-translate-y-1 duration-300 ${isPrimary ? 'bg-[#0f392b] text-white' : 'bg-white text-gray-800'}`}>
      
      <div className="flex justify-between items-start">
        <span className={`font-medium text-sm ${isPrimary ? 'text-emerald-200' : 'text-gray-500'}`}>
          {title}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isPrimary ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'}`}>
          <ArrowUpRight size={16} />
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-bold mb-2">{value}</h2>
        
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 ${
             isPrimary 
               ? 'bg-emerald-800/50 text-emerald-300 border border-emerald-700' 
               : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
          }`}>
             <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-current"></div>
             {trend}
          </div>
          <span className={`text-xs ${isPrimary ? 'text-emerald-400/80' : 'text-gray-400'}`}>
            {subtitle || "Increased from last month"}
          </span>
        </div>
      </div>

    </div>
  );
};

export default StatCard;