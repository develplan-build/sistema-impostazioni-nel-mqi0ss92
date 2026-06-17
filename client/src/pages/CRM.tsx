import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { Modal } from '../components/Modal';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Attivo' | 'Inattivo' | 'Lead';
}

interface CRMProps {
  clients: Client[];
  onAddClient: (client: Omit<Client, 'id'>) => void;
  onUpdateClient: (id: string, client: Partial<Client>) => void;
  onDeleteClient: (id: string) => void;
}

export const CRM: React.FC<CRMProps> = ({ clients, onAddClient, onUpdateClient, onDeleteClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'Lead' as Client['status'] });

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClient) {
      onUpdateClient(editingClient.id, formData);
    } else {
      onAddClient(formData);
    }
    setIsModalOpen(false);
    setEditingClient(null);
    setFormData({ name: '', email: '', phone: '', status: 'Lead' });
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    setFormData({ name: client.name, email: client.email, phone: client.phone, status: client.status });
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Cerca cliente..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="btn btn-primary w-full md:w-auto"
          onClick={() => { setEditingClient(null); setFormData({ name: '', email: '', phone: '', status: 'Lead' }); setIsModalOpen(true); }}
        >
          <Plus size={18} /> Nuovo Cliente
        </button>
      </div>

      {clients.length === 0 ? (
        <EmptyState 
          icon={Users}
          title="Nessun cliente"
          description="Inizia ad aggiungere i tuoi clienti per gestire i loro contatti e le richieste."
          action={<button className="btn btn-primary mt-4" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Aggiungi Cliente</button>}
        />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Contatti</th>
                <th>Stato</th>
                <th className="text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td className="font-medium">{client.name}</td>
                  <td>
                    <div className="flex flex-col gap-1 text-sm text-muted">
                      <span className="flex items-center gap-1"><Mail size={14}/> {client.email}</span>
                      <span className="flex items-center gap-1"><Phone size={14}/> {client.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${client.status === 'Attivo' ? 'badge-success' : client.status === 'Lead' ? 'badge-warning' : 'badge-danger'}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="btn-ghost btn-icon" onClick={() => openEditModal(client)}><Edit size={18} /></button>
                      <button className="btn-ghost btn-icon text-danger" onClick={() => onDeleteClient(client.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">{editingClient ? 'Modifica Cliente' : 'Nuovo Cliente'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input required type="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Telefono</label>
                  <input required type="tel" className="form-input" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Stato</label>
                  <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Client['status']})}>
                    <option value="Lead">Lead</option>
                    <option value="Attivo">Attivo</option>
                    <option value="Inattivo">Inattivo</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Salva</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
