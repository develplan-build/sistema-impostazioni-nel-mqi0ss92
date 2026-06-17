import React, { useState } from 'react';
import { CreditCard, Plus, Download, Search, CheckCircle } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { jsPDF } from 'jspdf';

export interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  date: string;
  status: 'Pagata' | 'In Attesa' | 'Scaduta';
}

interface BillingProps {
  invoices: Invoice[];
  onAddInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  onUpdateStatus: (id: string, status: Invoice['status']) => void;
}

export const Billing: React.FC<BillingProps> = ({ invoices, onAddInvoice, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ client: '', amount: 0, date: new Date().toISOString().split('T')[0] });

  const filteredInvoices = invoices.filter(i => 
    i.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNumber = `FATT-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, '0')}`;
    onAddInvoice({
      number: newNumber,
      client: formData.client,
      amount: formData.amount,
      date: formData.date,
      status: 'In Attesa'
    });
    setIsModalOpen(false);
    setFormData({ client: '', amount: 0, date: new Date().toISOString().split('T')[0] });
  };

  const generatePDF = (invoice: Invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Fattura', 20, 20);
    doc.setFontSize(12);
    doc.text(`Numero: ${invoice.number}`, 20, 40);
    doc.text(`Data: ${invoice.date}`, 20, 50);
    doc.text(`Cliente: ${invoice.client}`, 20, 60);
    doc.text(`Importo: €${invoice.amount.toLocaleString()}`, 20, 70);
    doc.text(`Stato: ${invoice.status}`, 20, 80);
    doc.save(`${invoice.number}.pdf`);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Cerca fattura..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-full md:w-auto" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Nuova Fattura
        </button>
      </div>

      {invoices.length === 0 ? (
        <EmptyState 
          icon={CreditCard}
          title="Nessuna fattura"
          description="Crea la tua prima fattura per iniziare a tracciare i pagamenti."
          action={<button className="btn btn-primary mt-4" onClick={() => setIsModalOpen(true)}><Plus size={18} /> Crea Fattura</button>}
        />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Cliente</th>
                <th>Data</th>
                <th>Importo</th>
                <th>Stato</th>
                <th className="text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td className="font-medium">{invoice.number}</td>
                  <td>{invoice.client}</td>
                  <td className="text-muted">{invoice.date}</td>
                  <td className="font-semibold">€{invoice.amount.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${invoice.status === 'Pagata' ? 'badge-success' : invoice.status === 'In Attesa' ? 'badge-warning' : 'badge-danger'}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      {invoice.status !== 'Pagata' && (
                        <button className="btn-ghost btn-icon text-success" title="Segna come pagata" onClick={() => onUpdateStatus(invoice.id, 'Pagata')}>
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="btn-ghost btn-icon" title="Scarica PDF" onClick={() => generatePDF(invoice)}>
                        <Download size={18} />
                      </button>
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
              <h3 className="text-lg font-semibold">Nuova Fattura</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Cliente</label>
                  <input required type="text" className="form-input" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Importo (€)</label>
                  <input required type="number" min="0" step="0.01" className="form-input" value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Data</label>
                  <input required type="date" className="form-input" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Annulla</button>
                <button type="submit" className="btn btn-primary">Crea</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
