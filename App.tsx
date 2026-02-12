import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import AgencyDashboard from './components/AgencyDashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import LoginPage from './components/LoginPage';
import { UserRole, Agency, Rider } from './types';

// --- MOCK DATA GENERATION ---

const NAMES = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Riley', 'Morgan', 'Quinn', 'Avery', 'Peyton'];
const SURNAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const TASKS = ['Delivering to Downtown', 'Pickup at Station', 'Resting', 'Maintenance Check', 'En route to Client', 'Waiting for Order'];

const generateRiders = (agencyId: string, count: number, startId: number): Rider[] => {
  return Array.from({ length: count }).map((_, i) => {
    const statusRandom = Math.random();
    const status = statusRandom > 0.6 ? 'On Delivery' : statusRandom > 0.3 ? 'Available' : 'Offline';
    
    return {
      id: `RID-${startId + i}`,
      agencyId: agencyId,
      name: `${NAMES[Math.floor(Math.random() * NAMES.length)]} ${SURNAMES[Math.floor(Math.random() * SURNAMES.length)]}`,
      avatar: `https://i.pravatar.cc/150?u=${startId + i}`,
      status: status as any,
      currentTask: status === 'On Delivery' ? TASKS[Math.floor(Math.random() * TASKS.length)] : (status === 'Available' ? 'Waiting for assignment' : 'Offline'),
      phone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
      email: `rider${startId + i}@motoflow.com`,
      position: {
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      },
      metrics: {
        rating: 4.0 + Math.random(),
        totalDeliveries: Math.floor(Math.random() * 500),
        efficiency: `${Math.floor(80 + Math.random() * 20)}%`,
        onlineHours: Math.floor(Math.random() * 200)
      },
      history: []
    };
  });
};

const INITIAL_AGENCIES: Agency[] = [
  { 
    id: 'AG-001', name: 'RapidMoto Express', location: 'Downtown District', status: 'Active', 
    totalRiders: 15, activeRiders: 0, subscriptionPlan: 'Enterprise', revenue: '$12,450', 
    adminName: 'John Smith', logo: 'https://i.pravatar.cc/150?u=agency1' 
  },
  { 
    id: 'AG-002', name: 'GreenLeaf Delivery', location: 'Westside Zone', status: 'Active', 
    totalRiders: 10, activeRiders: 0, subscriptionPlan: 'Pro', revenue: '$8,200', 
    adminName: 'Sarah Johnson', logo: 'https://i.pravatar.cc/150?u=agency2' 
  },
  { 
    id: 'AG-003', name: 'Urban Couriers', location: 'North Hills', status: 'Inactive', 
    totalRiders: 5, activeRiders: 0, subscriptionPlan: 'Basic', revenue: '$1,200', 
    adminName: 'Mike Ross', logo: 'https://i.pravatar.cc/150?u=agency3' 
  },
  { 
    id: 'AG-004', name: 'Flash Logistics', location: 'Airport Sector', status: 'Pending', 
    totalRiders: 0, activeRiders: 0, subscriptionPlan: 'Pro', revenue: '$0', 
    adminName: 'Emily Clark', logo: 'https://i.pravatar.cc/150?u=agency4' 
  },
  { 
    id: 'AG-005', name: 'Midnight Runners', location: 'Eastside Industrial', status: 'Active', 
    totalRiders: 20, activeRiders: 0, subscriptionPlan: 'Enterprise', revenue: '$18,900', 
    adminName: 'Bruce Wayne', logo: 'https://i.pravatar.cc/150?u=agency5' 
  },
  { 
    id: 'AG-006', name: 'EcoBike', location: 'Central Park', status: 'Active', 
    totalRiders: 8, activeRiders: 0, subscriptionPlan: 'Basic', revenue: '$4,300', 
    adminName: 'Pamela Isley', logo: 'https://i.pravatar.cc/150?u=agency6' 
  },
  { 
    id: 'AG-007', name: 'Speedy Box', location: 'South Harbor', status: 'Active', 
    totalRiders: 12, activeRiders: 0, subscriptionPlan: 'Pro', revenue: '$9,100', 
    adminName: 'Barry Allen', logo: 'https://i.pravatar.cc/150?u=agency7' 
  },
  { 
    id: 'AG-008', name: 'Iron Horse Delivery', location: 'Old Town', status: 'Active', 
    totalRiders: 6, activeRiders: 0, subscriptionPlan: 'Basic', revenue: '$3,100', 
    adminName: 'Tony Stark', logo: 'https://i.pravatar.cc/150?u=agency8' 
  },
];

// Generate riders for existing agencies
let ALL_GENERATED_RIDERS: Rider[] = [];
let riderIdCounter = 1000;
INITIAL_AGENCIES.forEach(agency => {
  const riders = generateRiders(agency.id, agency.totalRiders || 5, riderIdCounter);
  ALL_GENERATED_RIDERS = [...ALL_GENERATED_RIDERS, ...riders];
  riderIdCounter += riders.length;
});

// --- APP COMPONENT ---

export default function App() {
  // Global State
  const [view, setView] = useState<'login' | 'dashboard'>('login');
  const [userRole, setUserRole] = useState<UserRole>('agency');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Impersonation State (When Admin views an Agency)
  const [viewingAgency, setViewingAgency] = useState<Agency | null>(null);

  // Data State (Single Source of Truth)
  const [agencies, setAgencies] = useState<Agency[]>(INITIAL_AGENCIES);
  const [riders, setRiders] = useState<Rider[]>(ALL_GENERATED_RIDERS);

  // --- GLOBAL SIMULATION EFFECT ---
  // This simulates movement and status changes for ALL riders in the system
  useEffect(() => {
    const interval = setInterval(() => {
      setRiders(currentRiders => 
        currentRiders.map(rider => {
          let updatedRider = { ...rider };
          
          // Move riders
          if (rider.status !== 'Offline' && rider.position) {
             const moveAmount = 3; 
             const newX = Math.max(5, Math.min(95, rider.position.x + (Math.random() - 0.5) * moveAmount));
             const newY = Math.max(5, Math.min(95, rider.position.y + (Math.random() - 0.5) * moveAmount));
             updatedRider.position = { x: newX, y: newY };
          }

          // Randomly change tasks/status (Low probability)
          if (Math.random() < 0.05) {
            if (rider.status === 'Available') {
               updatedRider.status = 'On Delivery';
               updatedRider.currentTask = TASKS[Math.floor(Math.random() * TASKS.length)];
            } else if (rider.status === 'On Delivery') {
               updatedRider.status = 'Available';
               updatedRider.currentTask = 'Waiting for assignment';
               if (updatedRider.metrics) {
                 updatedRider.metrics.totalDeliveries += 1;
               }
            }
          }

          return updatedRider;
        })
      );
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  // --- DATA SYNC HELPERS ---
  
  // Update Agency Stats based on Rider Data
  useEffect(() => {
    setAgencies(prevAgencies => prevAgencies.map(agency => {
      const agencyRiders = riders.filter(r => r.agencyId === agency.id);
      const activeCount = agencyRiders.filter(r => r.status !== 'Offline').length;
      return {
        ...agency,
        totalRiders: agencyRiders.length,
        activeRiders: activeCount
      };
    }));
  }, [riders.length, riders]); // Recalculate when riders change

  // --- HANDLERS ---

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setView('dashboard');
    setActiveTab('Dashboard');
    
    // If agency login, for demo purposes, assume we log in as the first active agency
    if (role === 'agency') {
       // In a real app, this would come from auth response
       setViewingAgency(agencies[0]);
    } else {
       setViewingAgency(null);
    }
  };

  const handleLogout = () => {
    setView('login');
    setViewingAgency(null);
    setActiveTab('Dashboard');
  };

  const handleViewAgency = (agency: Agency) => {
    setViewingAgency(agency);
  };

  const handleBackToAdmin = () => {
    setViewingAgency(null);
  };

  const handleRegisterAgency = (agencyData: Omit<Agency, 'id' | 'totalRiders' | 'activeRiders' | 'revenue'>) => {
    const newAgency: Agency = {
      id: `AG-${Math.floor(Math.random() * 10000)}`,
      ...agencyData,
      totalRiders: 0,
      activeRiders: 0,
      revenue: '$0',
    };
    setAgencies([newAgency, ...agencies]);
  };

  const handleAddRider = (newRiderData: Omit<Rider, 'avatar' | 'metrics' | 'history' | 'agencyId'>) => {
    // Determine which agency to add to.
    // If superadmin is viewing an agency, add to that agency.
    // If agency user, add to their agency.
    const targetAgencyId = viewingAgency?.id;
    
    if (!targetAgencyId) return;

    const newRider: Rider = {
      avatar: `https://i.pravatar.cc/150?u=${Math.random().toString(36)}`,
      agencyId: targetAgencyId,
      ...newRiderData,
      position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
      metrics: { rating: 5.0, totalDeliveries: 0, efficiency: '100%', onlineHours: 0 },
      history: []
    };
    setRiders([newRider, ...riders]);
  };

  if (view === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Determine role for sidebar
  const effectiveRole = viewingAgency && userRole === 'superadmin' ? 'agency' : userRole;

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-['Plus_Jakarta_Sans']">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        role={effectiveRole}
        onLogout={handleLogout}
        onBackToAdmin={viewingAgency && userRole === 'superadmin' ? handleBackToAdmin : undefined}
      />
      
      {/* Main Content Router */}
      <main className="flex-1 h-screen relative flex flex-col">
         {userRole === 'superadmin' && !viewingAgency ? (
            <SuperAdminDashboard 
              activeTab={activeTab}
              onOpenSidebar={() => setSidebarOpen(true)}
              onViewAgency={handleViewAgency}
              agencies={agencies}
              allRiders={riders} // Pass ALL riders for global view
              onRegisterAgency={handleRegisterAgency}
            />
         ) : (
            <AgencyDashboard 
              activeTab={activeTab}
              onOpenSidebar={() => setSidebarOpen(true)}
              agencyName={viewingAgency?.name}
              // Filter riders for the specific agency being viewed
              riders={viewingAgency ? riders.filter(r => r.agencyId === viewingAgency.id) : []}
              onAddRider={handleAddRider}
            />
         )}
      </main>
    </div>
  );
}