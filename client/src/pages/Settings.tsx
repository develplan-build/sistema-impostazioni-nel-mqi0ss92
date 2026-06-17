import React, { useState } from 'react';
import { User, Building2, Bell, Lock, Save, Camera } from 'lucide-react';

interface SettingsProps {
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const Settings: React.FC<SettingsProps> = ({ addToast }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({ name: 'Marco Rossi', email: 'marco.rossi@casapro.demo', phone: '+39 333 1234567', role: 'Amministratore' });
  const [companyData, setCompanyData] = useState({ name: 'Agenzia Immobiliare Rossi', address: 'Via Roma 1, Milano', vat: 'IT12345678901' });
  const [notifications, setNotifications] = useState({ email: true, sms: false, browser: true });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Impostazioni salvate con successo');
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Impostazioni</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Impostazioni */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'profile' ? 'bg-accent-light text-accent' : 'text-muted hover:bg-bg-surface-hover hover:text-main'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} /> Profilo
          </button>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'company' ? 'bg-accent-light text-accent' : 'text-muted hover:bg-bg-surface-hover hover:text-main'}`}
            onClick={() => setActiveTab('company')}
          >
            <Building2 size={18} /> Azienda
          </button>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'notifications' ? 'bg-accent-light text-accent' : 'text-muted hover:bg-bg-surface-hover hover:text-main'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notifiche
          </button>
          <button 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'security' ? 'bg-accent-light text-accent' : 'text-muted hover:bg-bg-surface-hover hover:text-main'}`}
            onClick={() => setActiveTab('security')}
          >
            <Lock size={18} /> Sicurezza
          </button>
        </div>

        {/* Contenuto Impostazioni */}
        <div className="flex-1">
          <div className="card">
            <form onSubmit={handleSave}>
              {/* PROFILO */}
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-6 border-b border-border-color pb-4">Informazioni Profilo</h3>
                  
                  <div className="flex flex-col sm:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          {profileData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <button type="button" className="absolute bottom-0 right-0 w-8 h-8 bg-bg-surface border border-border-color rounded-full flex items-center justify-center text-muted hover:text-accent transition-colors shadow-sm">
                          <Camera size={14} />
                        </button>
                      </div>
                      <span className="text-sm text-muted">JPG, GIF o PNG. Max 1MB.</span>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">Nome Completo</label>
                        <input type="text" className="form-input" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Ruolo</label>
                        <input type="text" className="form-input bg-bg-surface-hover" value={profileData.role} readOnly />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Telefono</label>
                        <input type="tel" className="form-input" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AZIENDA */}
              {activeTab === 'company' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-6 border-b border-border-color pb-4">Dati Aziendali</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-group md:col-span-2">
                      <label className="form-label">Nome Azienda</label>
                      <input type="text" className="form-input" value={companyData.name} onChange={e => setCompanyData({...companyData, name: e.target.value})} />
                    </div>
                    <div className="form-group md:col-span-2">
                      <label className="form-label">Indirizzo Sede Legale</label>
                      <input type="text" className="form-input" value={companyData.address} onChange={e => setCompanyData({...companyData, address: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Partita IVA</label>
                      <input type="text" className="form-input" value={companyData.vat} onChange={e => setCompanyData({...companyData, vat: e.target.value})} />
                    </div>
                  </div>
                </div>
              )}

              {/* NOTIFICHE */}
              {activeTab === 'notifications' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-6 border-b border-border-color pb-4">Preferenze Notifiche</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                      <div>
                        <h4 className="font-medium">Notifiche Email</h4>
                        <p className="text-sm text-muted">Ricevi aggiornamenti via email per nuovi appuntamenti e messaggi.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={e => setNotifications({...notifications, email: e.target.checked})} />
                        <div className="w-11 h-6 bg-border-color peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                      <div>
                        <h4 className="font-medium">Notifiche SMS</h4>
                        <p className="text-sm text-muted">Ricevi promemoria via SMS per gli appuntamenti imminenti.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifications.sms} onChange={e => setNotifications({...notifications, sms: e.target.checked})} />
                        <div className="w-11 h-6 bg-border-color peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border-color rounded-lg">
                      <div>
                        <h4 className="font-medium">Notifiche Browser</h4>
                        <p className="text-sm text-muted">Mostra notifiche push nel browser quando l'app è aperta.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifications.browser} onChange={e => setNotifications({...notifications, browser: e.target.checked})} />
                        <div className="w-11 h-6 bg-border-color peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SICUREZZA */}
              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold mb-6 border-b border-border-color pb-4">Sicurezza Account</h3>
                  <div className="space-y-6">
                    <div className="form-group">
                      <label className="form-label">Password Attuale</label>
                      <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-group">
                        <label className="form-label">Nuova Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Conferma Nuova Password</label>
                        <input type="password" className="form-input" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border-color flex justify-end">
                <button type="submit" className="btn btn-primary">
                  <Save size={18} /> Salva Modifiche
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
