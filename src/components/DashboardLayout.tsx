import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Scissors,
} from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Agendamentos', path: '/dashboard/appointments' },
    { icon: Scissors, label: 'Serviços', path: '/dashboard/services' },
    { icon: Users, label: 'Clientes', path: '/dashboard/clients' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">BeautyFolio</h1>
        </div>
        <Separator />
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
          <Separator className="my-4" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
} 