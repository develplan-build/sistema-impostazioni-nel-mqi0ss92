import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, CheckCircle2, Users, Calendar, BarChart3, Shield } from 'lucide-react';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="flex items-center gap-2 font-bold text-xl text-accent">
          <Building2 size={28} />
          CasaPro
        </div>
        <div className="landing-links">
          <button onClick={() => scrollToSection('features')} className="landing-link">Funzionalità</button>
          <button onClick={() => scrollToSection('pricing')} className="landing-link">Prezzi</button>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/app')} className="btn btn-secondary hidden md:flex">
            Accedi
          </button>
          <button onClick={() => navigate('/app')} className="btn btn-primary">
            Prova Gratis
          </button>
        </div>
      </nav>

      <section className="hero-section">
        <h1 className="hero-title">
          Il gestionale immobiliare<br />che lavora per te
        </h1>
        <p className="hero-subtitle">
          Gestisci immobili, clienti, appuntamenti e fatturazione in un'unica piattaforma intuitiva. Aumenta le vendite e riduci il tempo perso in amministrazione.
        </p>
        <div className="hero-actions">
          <button onClick={() => navigate('/app')} className="btn btn-primary btn-lg">
            Entra nella Demo <ArrowRight size={20} />
          </button>
          <button onClick={() => scrollToSection('features')} className="btn btn-secondary btn-lg">
            Scopri di più
          </button>
        </div>
      </section>

      <section id="features" className="features-section bg-bg-surface">
        <h2 className="section-title">Tutto ciò che ti serve</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Building2 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Catalogo Immobili</h3>
            <p className="text-muted">Gestisci il tuo portafoglio immobili con foto, dettagli, prezzi e stato delle trattative in tempo reale.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">CRM Integrato</h3>
            <p className="text-muted">Tieni traccia di ogni cliente, dalle prime richieste fino alla firma del contratto. Non perdere mai un lead.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Agenda Intelligente</h3>
            <p className="text-muted">Pianifica le visite e sincronizza gli appuntamenti con il tuo team. Ricevi promemoria automatici.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Report e Statistiche</h3>
            <p className="text-muted">Analizza le performance della tua agenzia con grafici dettagliati su vendite, affitti e acquisizioni.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <h2 className="section-title">Piani semplici e trasparenti</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3 className="text-2xl font-bold">Starter</h3>
            <p className="text-muted mt-2">Per agenti indipendenti</p>
            <div className="pricing-price">€49<span className="text-lg text-muted font-normal">/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle2 className="text-accent" size={20} /> Fino a 50 immobili</li>
              <li><CheckCircle2 className="text-accent" size={20} /> CRM base</li>
              <li><CheckCircle2 className="text-accent" size={20} /> 1 Utente</li>
              <li><CheckCircle2 className="text-accent" size={20} /> Supporto email</li>
            </ul>
            <button onClick={() => navigate('/app')} className="btn btn-secondary w-full justify-center">Inizia Gratis</button>
          </div>
          <div className="pricing-card popular">
            <div className="pricing-badge">PIÙ POPOLARE</div>
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="text-muted mt-2">Per agenzie in crescita</p>
            <div className="pricing-price">€99<span className="text-lg text-muted font-normal">/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle2 className="text-accent" size={20} /> Immobili illimitati</li>
              <li><CheckCircle2 className="text-accent" size={20} /> CRM avanzato + Automazioni</li>
              <li><CheckCircle2 className="text-accent" size={20} /> Fino a 5 Utenti</li>
              <li><CheckCircle2 className="text-accent" size={20} /> Supporto prioritario</li>
            </ul>
            <button onClick={() => navigate('/app')} className="btn btn-primary w-full justify-center">Inizia Gratis</button>
          </div>
          <div className="pricing-card">
            <h3 className="text-2xl font-bold">Enterprise</h3>
            <p className="text-muted mt-2">Per grandi network</p>
            <div className="pricing-price">€249<span className="text-lg text-muted font-normal">/mese</span></div>
            <ul className="pricing-features">
              <li><CheckCircle2 className="text-accent" size={20} /> Multi-agenzia</li>
              <li><CheckCircle2 className="text-accent" size={20} /> API e Integrazioni custom</li>
              <li><CheckCircle2 className="text-accent" size={20} /> Utenti illimitati</li>
              <li><CheckCircle2 className="text-accent" size={20} /> Account manager dedicato</li>
            </ul>
            <button onClick={() => navigate('/app')} className="btn btn-secondary w-full justify-center">Contattaci</button>
          </div>
        </div>
      </section>

      <footer className="bg-bg-surface py-12 border-t border-border-color text-center">
        <div className="flex items-center justify-center gap-2 font-bold text-xl text-accent mb-4">
          <Building2 size={24} />
          CasaPro
        </div>
        <p className="text-muted">© {new Date().getFullYear()} CasaPro. Tutti i diritti riservati.</p>
        <p className="text-sm text-muted mt-2">Questa è una demo. I dati sono salvati localmente nel browser.</p>
      </footer>
    </div>
  );
};
