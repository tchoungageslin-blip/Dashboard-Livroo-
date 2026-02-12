import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Completed', value: 41 },
  { name: 'Remaining', value: 59 },
];

const COLORS = ['#0f392b', '#e2e8f0'];

const FleetProgress: React.FC = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">Fleet Efficiency</h3>
      </div>

      <div className="relative flex-1 min-h-[180px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="text-4xl font-bold text-gray-800">41%</h2>
          <p className="text-xs text-gray-400 font-medium">Efficiency Rate</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-2">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0f392b]"></div>
            <span className="text-xs text-gray-500 font-medium">Active</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            <span className="text-xs text-gray-500 font-medium">Idle</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-100" style={{backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '4px 4px'}}></div>
            <span className="text-xs text-gray-500 font-medium">Maint.</span>
        </div>
      </div>
    </div>
  );
};

export default FleetProgress;