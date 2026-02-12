import React from 'react';
import { Wrench, Video } from 'lucide-react';

const Reminder: React.FC = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-6">Reminders</h3>
        <h4 className="text-xl font-semibold text-emerald-900 leading-tight mb-2">
          Monthly Fleet Maintenance Check
        </h4>
        <p className="text-gray-400 text-sm">Today: 02.00 pm - 04.00 pm</p>
      </div>

      <button className="w-full mt-6 bg-[#0f392b] hover:bg-emerald-900 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors">
        <Wrench size={18} />
        Start Inspection
      </button>
    </div>
  );
};

export default Reminder;