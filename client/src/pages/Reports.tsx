import React from 'react';
import { BarChart3, Download, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ReportsProps {
  revenue: number;
  propertiesCount: number;
}

export const Reports: React.FC<ReportsProps> = ({ revenue, propertiesCount }) => {
  const salesData = [
    { name: 'Gen', vendite: 4, affitti: 2 },
    { name: 'Feb', vendite: 3, affitti: 4 },
    { name: 'Mar', vendite: 5, affitti: 3 },
    { name: 'Apr', vendite: 7, affitti: 5 },
    { name: 'Mag', vendite: 6, affitti: 4 },
    { name: 'Giu', vendite: 8, affitti: 6 }
  ];

  const sourceData = [
    { name: 'Sito Web', value: 45 },
    { name: 'Passaparola', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Altro', value: 10 }
  ];

  const COLORS = ['var(--accent)', '#10b981', '#f59e0b', '#64748b'];

  const exportCSV = () => {
    const headers = ['Mese', 'Vendite', 'Affitti'];
    const csvContent = [
      headers.join(','),
      ...salesData.map(row => `${row.name},${row.vendite},${row.affitti}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'report_vendite.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Report Avanzati</h2>
        <button className="btn btn-secondary" onClick={exportCSV}>
          <Download size={18} /> Esporta CSV
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-accent" />
            Andamento Transazioni
          </h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                />
                <Bar dataKey="vendite" fill="var(--accent)" name="Vendite" />
                <Bar dataKey="affitti" fill="var(--success)" name="Affitti" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChartIcon size={20} className="text-accent" />
            Sorgente Acquisizione Clienti
          </h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
