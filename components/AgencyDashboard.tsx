import React, { useState } from 'react';
import StatCard from './StatCard';
import DeliveryAnalytics from './DeliveryAnalytics';
import RecentDeliveries from './RecentDeliveries';
import RiderList from './RiderList';
import FleetProgress from './FleetProgress';
import TimeTracker from './TimeTracker';
import AddDeliveryModal from './AddDeliveryModal';
import RiderDetailsModal from './RiderDetailsModal';
import AddRiderModal from './AddRiderModal';
import LiveMap from './LiveMap';
import { Search, Bell, Mail, Plus, Menu, UserPlus } from 'lucide-react';
import { Rider, DeliveryProject } from '../types';

const INITIAL_DELIVERIES: DeliveryProject[] = [
  { id: '1', title: 'Route: Central to North', dueDate: 'Due: 26 Nov, 2024', iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  { id: '2', title: 'Express: Medical Supplies', dueDate: 'Due: 28 Nov, 2024', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { id: '3', title: 'Route: South District', dueDate: 'Due: 30 Nov, 2024', iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  { id: '4', title: 'Priority: Food Chain', dueDate: 'Due: 5 Dec, 2024', iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
];

interface AgencyDashboardProps {
  activeTab: string;
  onOpenSidebar: () => void;
  agencyName?: string;
  riders: Rider[]; // Receive Riders from Parent
  onAddRider: (rider: Omit<Rider, 'avatar' | 'metrics' | 'history' | 'agencyId'>) => void;
}

const AgencyDashboard: React.FC<AgencyDashboardProps> = ({ 
  activeTab, 
  onOpenSidebar, 
  agencyName, 
  riders,
  onAddRider
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals State
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isAddRiderModalOpen, setIsAddRiderModalOpen] = useState(false);
  const [selectedRiderId, setSelectedRiderId] = useState<string | null>(null);
  
  // Deliveries remain local for now as per scope
  const [deliveries, setDeliveries] = useState<DeliveryProject[]>(INITIAL_DELIVERIES);

  const selectedRider = riders.find(r => r.id === selectedRiderId) || null;

  const filteredRiders = riders.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDeliveries = deliveries.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddDelivery = (newDelivery: Omit<DeliveryProject, 'id'>) => {
    const delivery: DeliveryProject = { ...newDelivery, id: Math.random().toString(36).substr(2, 9) };
    setDeliveries([delivery, ...deliveries]);
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto h-screen relative">
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
                placeholder="Search delivery, rider, or task..." 
                className="w-full pl-12 pr-12 py-3 bg-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-100 shadow-sm text-sm text-gray-700 placeholder-gray-400"
              />
              <div className="hidden md:block absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500 border border-gray-200">
                ⌘ F
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 self-end md:self-auto">
            <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-emerald-600 shadow-sm transition-colors">
              <Mail size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            <button className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-emerald-600 shadow-sm transition-colors">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center gap-3 pl-2">
              <img 
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div className="hidden md:block">
                <h3 className="text-sm font-bold text-gray-800">{agencyName || "Agency Manager"}</h3>
                <p className="text-xs text-gray-400">Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{activeTab}</h1>
            <p className="text-gray-500 text-sm">
              {agencyName ? `Managing fleet for ${agencyName}` : "Plan, prioritize, and track your fleet deliveries with ease."}
            </p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsDeliveryModalOpen(true)}
              className="px-6 py-3 bg-[#0f392b] hover:bg-emerald-900 text-white rounded-2xl font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Plus size={18} />
              Add Delivery
            </button>
            <button 
              onClick={() => setIsAddRiderModalOpen(true)}
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <UserPlus size={18} />
              Add Driver
            </button>
          </div>
        </div>

        {activeTab === 'Dashboard' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Deliveries" value={142} trend="5%" trendUp={true} isPrimary={true} subtitle="This week" />
              <StatCard title="Completed" value={118} trend="92%" trendUp={true} subtitle="Completion rate" />
              <StatCard title="Active Riders" value={riders.filter(r => r.status !== 'Offline').length} trend={riders.length.toString()} trendUp={true} subtitle="Total Fleet" />
              <StatCard title="Pending Orders" value={4} trend="High" trendUp={false} subtitle="Require attention" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-auto xl:h-[320px] mb-6">
              <div className="xl:col-span-2 h-full">
                <LiveMap 
                  riders={riders} 
                  selectedRiderId={selectedRiderId} 
                  onRiderSelect={setSelectedRiderId}
                />
              </div>
              <div className="h-full">
                <RiderList riders={riders} onRiderClick={setSelectedRiderId} />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-auto xl:h-[300px]">
              <div className="h-full">
                <FleetProgress />
              </div>
              <div className="h-full">
                <TimeTracker />
              </div>
               <div className="h-full">
                <DeliveryAnalytics />
              </div>
            </div>
            
             <div className="grid grid-cols-1 mt-6">
                 <RecentDeliveries deliveries={filteredDeliveries} />
             </div>
          </>
        ) : activeTab === 'Fleet Status' || activeTab === 'Riders' ? (
            <div className="h-full">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-800">Fleet Overview</h2>
               </div>
               <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[500px]">
                 <div className="xl:col-span-2 h-full">
                   <LiveMap 
                    riders={riders} 
                    selectedRiderId={selectedRiderId} 
                    onRiderSelect={setSelectedRiderId}
                   />
                 </div>
                 <div className="h-full">
                   <RiderList riders={riders} onRiderClick={setSelectedRiderId} />
                 </div>
               </div>
            </div>
        ) : (
           <div className="flex items-center justify-center h-[50vh] text-gray-400">
             <div className="text-center">
               <h2 className="text-xl font-semibold text-gray-600">Module Under Construction</h2>
               <p className="text-sm mt-2">The {activeTab} view is coming soon.</p>
             </div>
           </div>
        )}

        {/* Modals */}
        <AddDeliveryModal 
          isOpen={isDeliveryModalOpen}
          onClose={() => setIsDeliveryModalOpen(false)}
          onAdd={handleAddDelivery}
        />

        <AddRiderModal 
          isOpen={isAddRiderModalOpen}
          onClose={() => setIsAddRiderModalOpen(false)}
          onAdd={onAddRider}
        />

        <RiderDetailsModal 
          rider={selectedRider}
          onClose={() => setSelectedRiderId(null)}
        />
    </div>
  );
};

export default AgencyDashboard;