import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'S', value: 35 },
  { name: 'M', value: 55 },
  { name: 'T', value: 45, active: true },
  { name: 'W', value: 70 },
  { name: 'T', value: 40 },
  { name: 'F', value: 50 },
  { name: 'S', value: 55 },
];

const DeliveryAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-[32px] p-8 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-gray-800">Delivery Analytics</h3>
        <p className="text-gray-400 text-sm">Weekly performance breakdown</p>
      </div>
      
      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Bar dataKey="value" radius={[20, 20, 20, 20]} barSize={40}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.active ? '#10b981' : (index % 2 === 0 ? '#0f392b' : '#e5e7eb')} 
                  // Visual trick: alternate slightly to mimic pattern/texture differentiation from image
                  fillOpacity={entry.active ? 1 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeliveryAnalytics;