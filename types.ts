export interface Rider {
  id: string;
  agencyId: string; // Linked to Agency ID
  name: string;
  avatar: string;
  email?: string;
  phone?: string;
  status: 'On Delivery' | 'Available' | 'Offline';
  currentTask: string;
  position?: {
    x: number;
    y: number;
  };
  metrics?: {
    rating: number;
    totalDeliveries: number;
    efficiency: string;
    onlineHours: number;
  };
  history?: {
    id: string;
    date: string;
    time: string;
    location: string;
    status: 'Completed' | 'Failed' | 'Canceled';
    amount: string;
  }[];
}

export interface Agency {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Pending';
  totalRiders: number;
  activeRiders: number;
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  revenue: string;
  adminName: string;
  logo: string;
}

export type UserRole = 'superadmin' | 'agency';

export interface DeliveryProject {
  id: string;
  title: string;
  dueDate: string;
  iconBg: string;
  iconColor: string;
}

export interface ChartData {
  name: string;
  value: number;
  active?: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  isPrimary?: boolean;
  trendUp?: boolean;
  subtitle?: string;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: UserRole;
  onLogout: () => void;
  onBackToAdmin?: () => void;
}

export interface RiderListProps {
  riders: Rider[];
  onRiderClick?: (rider: Rider) => void;
}

export interface RecentDeliveriesProps {
  deliveries: DeliveryProject[];
}