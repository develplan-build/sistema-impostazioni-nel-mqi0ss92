import React from 'react';
import { Users, Building2, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DashboardProps {
  clientsCount: number;
  propertiesCount: number;
  appointmentsCount: number;
  revenue: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ clientsCount, propertiesCount, appointmentsCount, revenue }) => {
  // Dati finti per i grafici (solo per visualizzazione trend)
  const revenueData = [
    { name: 'Gen', value: revenue * 0.4 },
    { name: 'Feb', value: revenue * 0.6 },
    { name: 'Mar', value: revenue * 0.8 },
    { name: 'Apr', value: revenue * 0.9 },
    { name: 'Mag', value: revenue * 1.1 },
    { name: 'Giu', value: revenue }
  ];

  const propertiesData = [
    { name: 'Vendita', value: propertiesCount * 0.7 },
    { name: 'Affitto', value: propertiesCount * 0.3 }
  ];

  return (
    <div className="animate-fade-in">
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Totale Clienti</span>
            <Users size={20} className="text-accent" />
          </div>
          <div className="kpi-value">{clientsCount}</div>
          <div className="kpi-trend positive">
            <ArrowUpRight size={16} />
            <span>+12% questo mese</span>
          </div>
        </div>
        
        <div className="kpi-card">
          <div className="kpi-header">
            <span>Immobili Attivi</span>
            <Building2 size={20} className="text-accent" />
          </div>
          <div className="kpi-value">{propertiesCount}</div>
          <div className="kpi-trend positive">
            <ArrowUpRight size={16} />
            <span>+5% questo mese</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Appuntamenti</span>
            <Calendar size={20} className="text-accent" />
          </div>
          <div className="kpi-value">{appointmentsCount}</div>
          <div className="kpi-trend negative">
            <ArrowDownRight size={16} />
            <span>-2% questo mese</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span>Fatturato Stimato</span>
            <TrendingUp size={20} className="text-accent" />
          </div>
          <div className="kpi-value">€{revenue.toLocaleString()}</div>
          <div className="kpi-trend positive">
            <ArrowUpRight size={16} />
            <span>+18% questo mese</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Andamento Fatturato</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                  itemStyle={{ color: 'var(--accent)' }}
                />
                <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Immobili per Tipo</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertiesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                  cursor={{ fill: 'var(--bg-surface-hover)' }}
                />
                <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
