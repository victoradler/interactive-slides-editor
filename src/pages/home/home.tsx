import { useNavigate } from "react-router-dom";
import "./home.scss";

export const Home = () => {
  const navigate = useNavigate();

  const handleStartCreating = () => {
    navigate("/teacher");
  };

  return (
    <div className="home-page">
      <div className="hero-section">
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
      </div>
    </div>
  );
};