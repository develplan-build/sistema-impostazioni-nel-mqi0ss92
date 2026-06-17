import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, User, Trash2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  clientName: string;
  location: string;
}

interface CalendarProps {
  appointments: Appointment[];
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  onDeleteAppointment: (id: string) => void;
}

export const CalendarPage: React.FC<CalendarProps> = ({ appointments, onAddAppointment, onDeleteAppointment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', clientName: '', location: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAppointment(formData);
    setIsModalOpen(false);
    setFormData({ title: '', date: '', time: '', clientName: '', location: '' });
  };

  // Sort appointments by date and time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Prossimi Appuntamenti</h2>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuovo Appuntamento
        </button>
      </div>

      {appointments.length === 0 ? (
        <EmptyState 
          icon={CalendarIcon}
          title="Nessun appuntamento"
          description="Non hai appuntamenti in programma. Aggiungine uno per iniziare."
          action={<button className="btn btn-primary mt-4" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Aggiungi</button>}
        />
      ) : (
        <div className="grid gap-4">
          {sortedAppointments.map(apt => (
            <div key={apt.id} className="card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent-light text-accent p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                  <span className="text-sm font-semibold uppercase">{new Date(apt.date).toLocaleDateString('it-IT', { month: 'short' })}</span>
                  <span className="text-xl font-bold">{new Date(apt.date).getDate()}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{apt.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted">
                    <span className="flex items-center gap-1"><Clock size={14}/> {apt.time}</span>
                    <span className="flex items-center gap-1"><User size={14}/> {apt.clientName}</span>
                    <span className="flex items-center gap-1"><MapPin size={14}/> {apt.location}</span>
                  </div>
                </div>
              </div>
              <button className="btn-ghost btn-icon text-danger" onClick={() => onDeleteAppointment(apt.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-lg font-semibold">Nuovo Appuntamento</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Titolo</label>
                  <input required type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="es. Visita Appartamento Centro" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Data</label>
                    <input required type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ora</label>
                    <input required type="time" className="form-input" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Cliente</label>
                  <input required type="text" className="form-input" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Luogo</label>
                  <input required type="text" className="form-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
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
