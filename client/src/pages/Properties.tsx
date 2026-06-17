import React, { useState } from 'react';
import { Building2, Plus, Search, Edit, Trash2, MapPin, Euro } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  type: 'Vendita' | 'Affitto';
  status: 'Disponibile' | 'In Trattativa' | 'Venduto' | 'Affittato';
}

interface PropertiesProps {
  properties: Property[];
  onAddProperty: (property: Omit<Property, 'id'>) => void;
  onUpdateProperty: (id: string, property: Partial<Property>) => void;
  onDeleteProperty: (id: string) => void;
}

export const Properties: React.FC<PropertiesProps> = ({ properties, onAddProperty, onUpdateProperty, onDeleteProperty }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({ title: '', address: '', price: 0, type: 'Vendita' as Property['type'], status: 'Disponibile' as Property['status'] });

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      onUpdateProperty(editingProperty.id, formData);
    } else {
      onAddProperty(formData);
    }
    setIsModalOpen(false);
    setEditingProperty(null);
    setFormData({ title: '', address: '', price: 0, type: 'Vendita', status: 'Disponibile' });
  };

  const openEditModal = (property: Property) => {
    setEditingProperty(property);
    setFormData({ title: property.title, address: property.address, price: property.price, type: property.type, status: property.status });
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Cerca immobile..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="btn btn-primary w-full md:w-auto"
          onClick={() => { setEditingProperty(null); setFormData({ title: '', address: '', price: 0, type: 'Vendita', status: 'Disponibile' }); setIsModalOpen(true); }}
        >
          <Plus size={18} /> Nuovo Immobile
        </button>
      </div>

      {properties.length === 0 ? (
        <EmptyState 
          icon={Building2}
          title="Nessun immobile"
          description="Aggiungi il tuo primo immobile al catalogo per iniziare a gestirlo."
          action={<button className="btn btn-primary mt-4" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Aggiungi Immobile</button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <div key={property.id} className="card card-hover flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg line-clamp-1" title={property.title}>{property.title}</h3>
                <span className={`badge ${property.status === 'Disponibile' ? 'badge-success' : property.status === 'In Trattativa' ? 'badge-warning' : 'badge-info'}`}>
                  {property.status}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-muted mb-4 flex-1">
                <span className="flex items-center gap-2"><MapPin size={16}/> {property.address}</span>
                <span className="flex items-center gap-2 text-accent font-semibold text-lg">
                  <Euro size={18}/> {property.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted ml-1">{property.type === 'Affitto' ? '/ mese' : ''}</span>
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border-color">
                <span className="badge badge-accent">{property.type}</span>
                <div className="flex gap-2">
                  <button className="btn-ghost btn-icon" onClick={() => openEditModal(property)}><Edit size={18} /></button>
                  <button className="btn-ghost btn-icon text-danger" onClick={() => onDeleteProperty(property.id)}><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">{editingProperty ? 'Modifica Immobile' : 'Nuovo Immobile'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Titolo</label>
                  <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Indirizzo</label>
                  <input required type="text" className="form-input" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Prezzo (€)</label>
                    <input required type="number" min="0" className="form-input" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as Property['type']})}>
                      <option value="Vendita">Vendita</option>
                      <option value="Affitto">Affitto</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Stato</label>
                  <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as Property['status']})}>
                    <option value="Disponibile">Disponibile</option>
                    <option value="In Trattativa">In Trattativa</option>
                    <option value="Venduto">Venduto</option>
                    <option value="Affittato">Affittato</option>
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
