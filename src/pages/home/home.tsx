import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { JoinSessionModal } from "../../components/ui";
import "./home.scss";

export const Home = () => {
  const navigate = useNavigate();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleStartCreating = () => {
    navigate("/teacher");
  };

  const handleJoinSession = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="hero-title-main">Crie Apresentações</span>
              <span className="hero-title-accent">Incríveis</span>
            </h1>
            
            <button className="cta-button" onClick={handleStartCreating}>
              <span>Começar a Criar</span>
              <div className="cta-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            <button className="cta-button secondary" onClick={handleJoinSession}>
              <span>Entrar em Sessão</span>
              <div className="cta-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 16L7 12M7 12L11 8M7 12H21M16 16V17C16 18.6569 14.6569 20 13 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H13C14.6569 4 16 5.34315 16 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>

          <div className="hero-visual">
            <div className="mockup-container">
              <div className="mockup-screen">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mockup-title">📚 Editor de Slides</div>
                </div>
                <div className="mockup-content">
                  <div className="mockup-sidebar">
                    <div className="mockup-slide active">
                      <span className="mockup-number">1</span>
                      <span>Slide 1</span>
                    </div>
                    <div className="mockup-slide">
                      <span className="mockup-number">2</span>
                      <span>Slide 2</span>
                    </div>
                    <div className="mockup-slide">
                      <span className="mockup-number">3</span>
                      <span>Slide 3</span>
                    </div>
                  </div>
                  <div className="mockup-canvas">
                    <div className="mockup-element text-element">
                      <h2>Título Principal</h2>
                      <p>Conteúdo da apresentação...</p>
                    </div>
                    <div className="mockup-element image-element">
                      <div className="image-placeholder">🖼️</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Recursos Principais</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-card-icon">🎨</span>
              <h3>Design Intuitivo</h3>
              <p>Interface moderna e fácil de usar, permitindo criar apresentações incríveis em minutos.</p>
            </div>
            <div className="feature-card">
              <span className="feature-card-icon">📊</span>
              <h3>Slides Interativos</h3>
              <p>Crie enquetes, nuvens de palavras e outros elementos interativos para engajar sua audiência.</p>
            </div>
            <div className="feature-card">
              <span className="feature-card-icon">💾</span>
              <h3>Salvamento Automático</h3>
              <p>Suas apresentações são salvas automaticamente, você nunca perde seu trabalho.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Pronto para começar?</h2>
          <p>Crie sua primeira apresentação em minutos e impressione sua audiência.</p>
          <button className="cta-button" onClick={handleStartCreating}>
            <span>Começar Agora</span>
            <div className="cta-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Victor Adler. Todos os direitos reservados.</p>
        </div>
      </footer>

      <JoinSessionModal isOpen={isJoinModalOpen} onClose={handleCloseJoinModal} />
    </div>
  );
};