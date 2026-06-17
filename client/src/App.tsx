import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { CRM, Client } from './pages/CRM';
import { Properties, Property } from './pages/Properties';
import { CalendarPage, Appointment } from './pages/Calendar';
import { Documents, Document } from './pages/Documents';
import { Billing, Invoice } from './pages/Billing';
import { Reports } from './pages/Reports';
import { Notifications, Notification } from './pages/Notifications';
import { Settings } from './pages/Settings';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // App State
  const [clients, setClients] = useState<Client[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const loadDemoData = () => {
    setClients([
      { id: '1', name: 'Mario Rossi', email: 'mario@example.com', phone: '+39 333 1234567', status: 'Attivo' },
      { id: '2', name: 'Laura Bianchi', email: 'laura@example.com', phone: '+39 333 9876543', status: 'Lead' },
      { id: '3', name: 'Giuseppe Verdi', email: 'giuseppe@example.com', phone: '+39 333 4567890', status: 'Inattivo' }
    ]);
    setProperties([
      { id: '1', title: 'Attico in Centro Storico', address: 'Via Roma 10, Milano', price: 450000, type: 'Vendita', status: 'Disponibile' },
      { id: '2', title: 'Bilocale Arredato', address: 'Via Verdi 5, Roma', price: 850, type: 'Affitto', status: 'In Trattativa' },
      { id: '3', title: 'Villa con Piscina', address: 'Via dei Colli 12, Firenze', price: 1200000, type: 'Vendita', status: 'Venduto' }
    ]);
    setAppointments([
      { id: '1', title: 'Visita Attico', date: new Date().toISOString().split('T')[0], time: '10:00', clientName: 'Mario Rossi', location: 'Via Roma 10, Milano' },
      { id: '2', title: 'Firma Contratto', date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '15:30', clientName: 'Laura Bianchi', location: 'Ufficio Centrale' }
    ]);
    setDocuments([
      { id: '1', name: 'Planimetria_Attico.pdf', type: 'application/pdf', size: '2.5 MB', date: new Date().toISOString().split('T')[0] },
      { id: '2', name: 'Contratto_Affitto_Bozza.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: '1.2 MB', date: new Date().toISOString().split('T')[0] }
    ]);
    setInvoices([
      { id: '1', number: 'FATT-2023-001', client: 'Mario Rossi', amount: 1500, date: new Date().toISOString().split('T')[0], status: 'Pagata' },
      { id: '2', number: 'FATT-2023-002', client: 'Giuseppe Verdi', amount: 850, date: new Date().toISOString().split('T')[0], status: 'In Attesa' }
    ]);
    setNotifications([
      { id: '1', title: 'Nuovo Lead', message: 'Laura Bianchi ha richiesto informazioni per Bilocale Arredato.', date: 'Oggi, 09:30', read: false, type: 'email' },
      { id: '2', title: 'Fattura Pagata', message: 'La fattura FATT-2023-001 è stata saldata.', date: 'Ieri, 14:20', read: true, type: 'billing' }
    ]);
    addToast('success', 'Dati demo caricati con successo');
  };

  const clearData = () => {
    setClients([]);
    setProperties([]);
    setAppointments([]);
    setDocuments([]);
    setInvoices([]);
    setNotifications([]);
    addToast('info', 'Tutti i dati sono stati azzerati');
  };

  // Handlers
  const handleAddClient = (client: Omit<Client, 'id'>) => {
    setClients(prev => [...prev, { ...client, id: Math.random().toString() }]);
    addToast('success', 'Cliente aggiunto');
  };
  const handleUpdateClient = (id: string, data: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    addToast('success', 'Cliente aggiornato');
  };
  const handleDeleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
    addToast('info', 'Cliente eliminato');
  };

  const handleAddProperty = (property: Omit<Property, 'id'>) => {
    setProperties(prev => [...prev, { ...property, id: Math.random().toString() }]);
    addToast('success', 'Immobile aggiunto');
  };
  const handleUpdateProperty = (id: string, data: Partial<Property>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    addToast('success', 'Immobile aggiornato');
  };
  const handleDeleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
    addToast('info', 'Immobile eliminato');
  };

  const handleAddAppointment = (appointment: Omit<Appointment, 'id'>) => {
    setAppointments(prev => [...prev, { ...appointment, id: Math.random().toString() }]);
    addToast('success', 'Appuntamento aggiunto');
  };
  const handleDeleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    addToast('info', 'Appuntamento eliminato');
  };

  const handleAddDocument = (doc: Omit<Document, 'id'>) => {
    setDocuments(prev => [...prev, { ...doc, id: Math.random().toString() }]);
    addToast('success', 'Documento caricato');
  };
  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
    addToast('info', 'Documento eliminato');
  };

  const handleAddInvoice = (invoice: Omit<Invoice, 'id'>) => {
    setInvoices(prev => [...prev, { ...invoice, id: Math.random().toString() }]);
    addToast('success', 'Fattura creata');
  };
  const handleUpdateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    addToast('success', 'Stato fattura aggiornato');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Derived stats for Dashboard
  const revenue = invoices.filter(i => i.status === 'Pagata').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app/*" element={
            <Layout 
              theme={theme} 
              toggleTheme={toggleTheme} 
              loadDemoData={loadDemoData}
              clearData={clearData}
            >
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard clientsCount={clients.length} propertiesCount={properties.length} appointmentsCount={appointments.length} revenue={revenue} />} />
                  <Route path="/crm" element={<CRM clients={clients} onAddClient={handleAddClient} onUpdateClient={handleUpdateClient} onDeleteClient={handleDeleteClient} />} />
                  <Route path="/properties" element={<Properties properties={properties} onAddProperty={handleAddProperty} onUpdateProperty={handleUpdateProperty} onDeleteProperty={handleDeleteProperty} />} />
                  <Route path="/calendar" element={<CalendarPage appointments={appointments} onAddAppointment={handleAddAppointment} onDeleteAppointment={handleDeleteAppointment} />} />
                  <Route path="/documents" element={<Documents documents={documents} onAddDocument={handleAddDocument} onDeleteDocument={handleDeleteDocument} />} />
                  <Route path="/billing" element={<Billing invoices={invoices} onAddInvoice={handleAddInvoice} onUpdateStatus={handleUpdateInvoiceStatus} />} />
                  <Route path="/reports" element={<Reports revenue={revenue} propertiesCount={properties.length} />} />
                  <Route path="/notifications" element={<Notifications notifications={notifications} onMarkAsRead={handleMarkNotificationRead} onDelete={handleDeleteNotification} />} />
                  <Route path="/settings" element={<Settings addToast={addToast} />} />
                </Routes>
              </ErrorBoundary>
            </Layout>
          } />
        </Routes>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
