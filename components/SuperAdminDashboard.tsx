import React, { useState } from 'react';
import StatCard from './StatCard';
import LiveMap from './LiveMap';
import RegisterAgencyModal from './RegisterAgencyModal';
import { Search, Bell, Plus, Menu, Building2, MoreVertical, Eye, Trash2, Map as MapIcon } from 'lucide-react';
import { Agency, Rider } from '../types';

interface SuperAdminDashboardProps {
  activeTab: string;
  onOpenSidebar: () => void;
  onViewAgency: (agency: Agency) => void;
  agencies: Agency[];
  allRiders: Rider[];
  onRegisterAgency: (agency: Omit<Agency, 'id' | 'totalRiders' | 'activeRiders' | 'revenue'>) => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ 
  activeTab, 
  onOpenSidebar, 
  onViewAgency,
  agencies,
  allRiders,
  onRegisterAgency
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Filter Agencies
  const filteredAgencies = agencies.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate Global Stats
  const totalAgencies = agencies.length;
  const globalActiveRiders = allRiders.filter(r => r.status !== 'Offline').length;
  const totalRiders = allRiders.length;
  
  // Helper to parse revenue string (e.g. "$12,450" -> 12450)
  const parseRevenue = (rev: string) => parseInt(rev.replace(/[^0-9]/g, '')) || 0;
  const totalRevenue = agencies.reduce((sum, agency) => sum + parseRevenue(agency.revenue), 0);
  const formattedRevenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(totalRevenue);

  const pendingRequests = agencies.filter(a => a.status === 'Pending').length;

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto h-screen relative bg-slate-50">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button 
            onClick={onOpenSidebar}
            className="md:hidden p-2 rounded-xl bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-100"
          >
            <Menu size={20} />
          </button>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agencies..." 
              className="w-full pl-12 pr-12 py-3 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100 shadow-sm text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto">
          <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 shadow-sm transition-colors">
            <Bell size={20} />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              SA
            </div>
            <div className="hidden md:block">
              <h3 className="text-sm font-bold text-gray-800">Super Admin</h3>
              <p className="text-xs text-gray-400">System Administrator</p>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agency Overview</h1>
          <p className="text-gray-500 text-sm">Monitor all registered delivery agencies and their performance.</p>
        </div>
        <button 
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
        >
          <Plus size={18} />
          Register New Agency
        </button>
      </div>

      {activeTab === 'Dashboard' ? (
        <>
          {/* Global Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Agencies" 
              value={totalAgencies} 
              trend="12%" 
              trendUp={true} 
              isPrimary={true}
              subtitle="Growth this month"
            />
            <StatCard 
              title="Global Active Riders" 
              value={globalActiveRiders} 
              trend={`${Math.round((globalActiveRiders / (totalRiders || 1)) * 100)}%`}
              trendUp={true}
              subtitle="Of total fleet"
            />
            <StatCard 
              title="Total Revenue" 
              value={formattedRevenue} 
              trend="8%" 
              trendUp={true}
            />
             <StatCard 
              title="Pending Requests" 
              value={pendingRequests} 
              trend={pendingRequests > 0 ? "Action Needed" : "All Clear"} 
              trendUp={pendingRequests === 0}
            />
          </div>

          {/* Global Map Section */}
          <div className="mb-8">
             <div className="flex items-center justify-between mb-4">
               <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                 <MapIcon size={20} className="text-blue-500" />
                 Global Fleet Map
               </h3>
               <span className="text-xs text-gray-400 font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                 Real-time activity across all zones ({totalRiders} riders)
               </span>
             </div>
             <div className="h-[400px] shadow-sm hover:shadow-md transition-shadow duration-300 rounded-[32px]">
               <LiveMap 
                 riders={allRiders} 
                 selectedRiderId={selectedRiderId}
                 onRiderSelect={setSelectedRiderId}
               />
             </div>
          </div>

          {/* Agencies Grid */}
          <h3 className="font-bold text-lg text-gray-800 mb-6">Registered Agencies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <div key={agency.id} className="bg-white rounded-[32px] p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 overflow-hidden border border-gray-100">
                        {agency.logo ? (
                          <img src={agency.logo} alt={agency.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 size={24} />
                        )}
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-800">{agency.name}</h4>
                       <p className="text-xs text-gray-400">{agency.location}</p>
                     </div>
                  </div>
                  <div className="relative">
                    <button className="text-gray-300 hover:text-gray-600 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 bg-gray-50 rounded-2xl">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Riders</p>
                    <p className="text-lg font-bold text-gray-800">{agency.activeRiders} <span className="text-gray-400 text-xs font-normal">/ {agency.totalRiders}</span></p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-2xl">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Revenue</p>
                    <p className="text-lg font-bold text-gray-800">{agency.revenue}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      agency.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      agency.status === 'Inactive' ? 'bg-red-50 text-red-600 border-red-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                   }`}>
                     {agency.status}
                   </span>
                   
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onViewAgency(agency)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="View Dashboard">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>

          <RegisterAgencyModal 
            isOpen={isRegisterModalOpen}
            onClose={() => setIsRegisterModalOpen(false)}
            onRegister={onRegisterAgency}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-[60vh] text-gray-400">
           <div className="text-center">
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
               <Building2 className="text-gray-300" size={32} />
             </div>
             <h2 className="text-xl font-semibold text-gray-600">Module Under Construction</h2>
             <p className="text-sm mt-2">The {activeTab} view is coming soon.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;