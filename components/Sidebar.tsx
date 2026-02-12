import React from 'react';
import { 
  LayoutDashboard, 
  Bike, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  HelpCircle, 
  LogOut,
  Download,
  X,
  Building2,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { SidebarProps } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeTab, onTabChange, role, onLogout, onBackToAdmin }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white h-screen flex flex-col border-r border-gray-100 
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        {/* Logo */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center ${role === 'superadmin' ? 'border-blue-600' : 'border-emerald-600'}`}>
              <div className={`w-2 h-2 rounded-full ${role === 'superadmin' ? 'bg-blue-800' : 'bg-emerald-800'}`}></div>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800 tracking-tight block leading-none">MotoFlow</span>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                {role === 'superadmin' ? 'Admin Panel' : 'Agency'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        {/* Back to Admin Button (Only when impersonating) */}
        {onBackToAdmin && (
           <div className="px-6 mb-4">
             <button 
               onClick={onBackToAdmin}
               className="w-full flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
             >
               <ArrowLeft size={16} />
               Back to Admin
             </button>
           </div>
        )}

        {/* Menu */}
        <div className="flex-1 px-6 space-y-8 overflow-y-auto">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</h3>
            <nav className="space-y-2">
              {role === 'superadmin' ? (
                // Super Admin Menu
                <>
                  <NavItem 
                    icon={<LayoutDashboard size={20} />} 
                    label="Overview" 
                    active={activeTab === 'Dashboard'} 
                    onClick={() => { onTabChange('Dashboard'); onClose(); }}
                  />
                  <NavItem 
                    icon={<Building2 size={20} />} 
                    label="Agencies" 
                    active={activeTab === 'Agencies'}
                    onClick={() => { onTabChange('Agencies'); onClose(); }}
                  />
                   <NavItem 
                    icon={<ShieldCheck size={20} />} 
                    label="Global Fleet" 
                    active={activeTab === 'Fleet'}
                    onClick={() => { onTabChange('Fleet'); onClose(); }}
                  />
                  <NavItem 
                    icon={<BarChart3 size={20} />} 
                    label="Revenue" 
                    active={activeTab === 'Revenue'}
                    onClick={() => { onTabChange('Revenue'); onClose(); }}
                  />
                </>
              ) : (
                // Agency Menu
                <>
                  <NavItem 
                    icon={<LayoutDashboard size={20} />} 
                    label="Dashboard" 
                    active={activeTab === 'Dashboard'} 
                    onClick={() => { onTabChange('Dashboard'); onClose(); }}
                  />
                  <NavItem 
                    icon={<Bike size={20} />} 
                    label="Fleet Status" 
                    badge="12+" 
                    active={activeTab === 'Fleet Status'}
                    onClick={() => { onTabChange('Fleet Status'); onClose(); }}
                  />
                  <NavItem 
                    icon={<Calendar size={20} />} 
                    label="Schedule" 
                    active={activeTab === 'Schedule'}
                    onClick={() => { onTabChange('Schedule'); onClose(); }}
                  />
                  <NavItem 
                    icon={<BarChart3 size={20} />} 
                    label="Analytics" 
                    active={activeTab === 'Analytics'}
                    onClick={() => { onTabChange('Analytics'); onClose(); }}
                  />
                  <NavItem 
                    icon={<Users size={20} />} 
                    label="Riders" 
                    active={activeTab === 'Riders'}
                    onClick={() => { onTabChange('Riders'); onClose(); }}
                  />
                </>
              )}
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">General</h3>
            <nav className="space-y-2">
              <NavItem icon={<Settings size={20} />} label="Settings" />
              <NavItem icon={<HelpCircle size={20} />} label="Help Center" />
              <NavItem icon={<LogOut size={20} />} label="Logout" onClick={onLogout} />
            </nav>
          </div>
        </div>

        {/* Promo Card - Only for Agencies */}
        {role === 'agency' && (
          <div className="p-6">
            <div className="bg-emerald-950 rounded-3xl p-5 relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-800 rounded-full blur-2xl opacity-50 -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-600 rounded-full blur-xl opacity-30 -ml-5 -mb-5"></div>
              
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Bike className="text-emerald-400" size={20} />
                </div>
                <h4 className="text-white font-semibold mb-1">Rider App</h4>
                <p className="text-emerald-400/80 text-xs mb-4">Track orders in real-time</p>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Download <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, badge, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${active ? 'bg-emerald-50 text-emerald-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
    >
      <div className="flex items-center gap-3">
        <span className={`${active ? 'text-emerald-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
          {icon}
        </span>
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && (
        <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      {active && (
         <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 ml-2"></div>
      )}
    </div>
  );
};

export default Sidebar;