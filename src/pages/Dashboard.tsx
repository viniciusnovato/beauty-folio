import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Calendar, Clock, Users, Scissors } from 'lucide-react';

interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  totalClients: number;
  totalServices: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    todayAppointments: 0,
    totalClients: 0,
    totalServices: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        // Buscar total de agendamentos
        const { count: totalAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact' });

        // Buscar agendamentos de hoje
        const today = new Date().toISOString().split('T')[0];
        const { count: todayAppointments } = await supabase
          .from('appointments')
          .select('*', { count: 'exact' })
          .eq('date', today);

        // Buscar total de clientes únicos
        const { count: totalClients } = await supabase
          .from('appointments')
          .select('client_email', { count: 'exact', head: true })
          .not('client_email', 'is', null);

        // Buscar total de serviços
        const { count: totalServices } = await supabase
          .from('services')
          .select('*', { count: 'exact' });

        setStats({
          totalAppointments: totalAppointments || 0,
          todayAppointments: todayAppointments || 0,
          totalClients: totalClients || 0,
          totalServices: totalServices || 0,
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      title: 'Total de Agendamentos',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'text-blue-600',
    },
    {
      title: 'Agendamentos Hoje',
      value: stats.todayAppointments,
      icon: Clock,
      color: 'text-green-600',
    },
    {
      title: 'Total de Clientes',
      value: stats.totalClients,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Serviços Oferecidos',
      value: stats.totalServices,
      icon: Scissors,
      color: 'text-orange-600',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 