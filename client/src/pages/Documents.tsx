import React, { useState } from 'react';
import { FolderOpen, Upload, FileText, Download, Trash2, Search } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

interface DocumentsProps {
  documents: Document[];
  onAddDocument: (doc: Omit<Document, 'id'>) => void;
  onDeleteDocument: (id: string) => void;
}

export const Documents: React.FC<DocumentsProps> = ({ documents, onAddDocument, onDeleteDocument }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onAddDocument({
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const filteredDocs = documents.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Cerca documento..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload" className="btn btn-primary cursor-pointer">
            <Upload size={18} /> Carica Documento
          </label>
        </div>
      </div>

      {documents.length === 0 ? (
        <EmptyState 
          icon={FolderOpen}
          title="Nessun documento"
          description="Carica contratti, planimetrie e altri documenti per averli sempre a portata di mano."
        />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nome File</th>
                <th>Data</th>
                <th>Dimensione</th>
                <th className="text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map(doc => (
                <tr key={doc.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <FileText className="text-accent" size={18} />
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </td>
                  <td className="text-muted">{doc.date}</td>
                  <td className="text-muted">{doc.size}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button className="btn-ghost btn-icon" title="Scarica"><Download size={18} /></button>
                      <button className="btn-ghost btn-icon text-danger" onClick={() => onDeleteDocument(doc.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
