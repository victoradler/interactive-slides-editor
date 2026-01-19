import { useEffect, useMemo, useState } from "react";
import { useSlidesStore } from "../store/useSlidesStore";
import { useSessionStore } from "../store/useSessionStore";
import { CanvasStage } from "../components/canvas/CanvasStage";
import { MultipleChoiceModal } from "../components/ui/MultipleChoiceModal";
import { WordCloudModal } from "../components/ui/WordCloudModal";
import { InteractiveSlideTypeModal } from "../components/ui/InteractiveSlideTypeModal";
import { SessionModal } from "../components/ui/SessionModal";
import "./teacher.scss";

// ===== localStorage helpers (sem backend) =====
function getActiveKey(sessionId: string) {
  return `teachy:session:${sessionId}:active`;
}

function getVotesKey(sessionId: string) {
  return `teachy:session:${sessionId}:votes`;
}

function publishMultipleChoice(
  sessionId: string,
  slide: { id: string; question?: string; options?: string[] },
) {
  const payload = {
    slideId: slide.id,
    type: 'MULTIPLE_CHOICE',
    question: slide.question ?? "",
    options: slide.options ?? [],
  };

  localStorage.setItem(getActiveKey(sessionId), JSON.stringify(payload));
  localStorage.setItem(getVotesKey(sessionId), JSON.stringify({}));
}

function publishWordCloud(
  sessionId: string,
  slide: { id: string; question?: string },
) {
  const payload = {
    slideId: slide.id,
    type: 'WORD_CLOUD',
    question: slide.question ?? "",
  };

  localStorage.setItem(getActiveKey(sessionId), JSON.stringify(payload));
  localStorage.setItem(getVotesKey(sessionId), JSON.stringify({}));
}

// ===== hook para votos ao vivo (entre abas) =====
function useLiveVotes(sessionId: string | null) {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const votesKey = useMemo(() => {
    if (!sessionId) return "";
    return getVotesKey(sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;

    const readVotes = () => {
      const raw = localStorage.getItem(votesKey);
      setVotes(raw ? JSON.parse(raw) : {});
    };

    readVotes();

    const onStorage = (e: StorageEvent) => {
      if (e.key === votesKey) readVotes();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [sessionId, votesKey]);

  return votes;
}

export default function TeacherPage() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const removeSlide = useSlidesStore((s) => s.removeSlide);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addTextElement = useSlidesStore((s) => s.addTextElement);
  const addImageElement = useSlidesStore((s) => s.addImageElement);

  const addMultipleChoiceSlide = useSlidesStore(
    (s) => s.addMultipleChoiceSlide,
  );
  const addWordCloudSlide = useSlidesStore((s) => s.addWordCloudSlide);
  const updateSlideMeta = useSlidesStore((s) => s.updateSlideMeta);

  const { sessionId, startSession, resetSession } = useSessionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWordCloudModalOpen, setIsWordCloudModalOpen] = useState(false);
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeSlide = slides.find((s) => s.id === activeSlideId) ?? null;
  const votes = useLiveVotes(sessionId);

  const handleSelectInteractiveType = (type: 'MULTIPLE_CHOICE' | 'WORD_CLOUD') => {
    if (type === 'MULTIPLE_CHOICE') {
      addMultipleChoiceSlide?.();
    } else {
      addWordCloudSlide?.();
    }
    setIsSidebarOpen(false);
  };

  const handleStartSession = () => {
    if (!sessionId) {
      startSession();
    }
    setIsSessionModalOpen(true);
  };

  const handleAddImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        addImageElement(reader.result as string);
        setIsSidebarOpen(false);
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  const handleSlideClick = (slideId: string) => {
    setActiveSlide(slideId);
    setIsSidebarOpen(false);
  };

  const handleAddSlide = () => {
    addSlide();
    setIsSidebarOpen(false);
  };

  const handleAddText = () => {
    addTextElement();
    setIsSidebarOpen(false);
  };

  return (
    <div className="teacher-page">
      <button 
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Editor de Slides</h2>
        </div>

        <div className="sidebar-controls">
          <button onClick={handleAddSlide} className="btn-add-slide">
            Adicionar Slide
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </button>

          <div className="element-buttons-row">
            <button onClick={handleAddText} className="btn-add-text">
              + Texto
            </button>
            <button onClick={handleAddImage} className="btn-add-image">
              + Imagem
            </button>
          </div>

          <button
            onClick={() => {
              setIsTypeModalOpen(true);
              setIsSidebarOpen(false);
            }}
            className="btn-addslide-interactive"
            title="Cria um slide e interaja com seus alunos"
          >
            Slide interativo
          </button>

          {activeSlide?.type === "MULTIPLE_CHOICE" && (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsSidebarOpen(false);
              }}
              className="btn-configure-mc"
            >
              ⚙️ Configurar Pergunta
            </button>
          )}

          {activeSlide?.type === "WORD_CLOUD" && (
            <button
              onClick={() => {
                setIsWordCloudModalOpen(true);
                setIsSidebarOpen(false);
              }}
              className="btn-configure-mc"
            >
              ⚙️ Configurar Word Cloud
            </button>
          )}

          {slides.some((slide) => slide.type === "MULTIPLE_CHOICE" || slide.type === "WORD_CLOUD") && (
            <div style={{ marginTop: 12 }}>
              <button onClick={handleStartSession} className="btn">
                {sessionId ? "Gerenciar sessão" : "Iniciar sessão"}
              </button>
            </div>
          )}
        </div>

        <div className="slides-container">
          <h3 className="slides-title">Slides</h3>
          <ul className="slides-list">
            {slides.map((slide, index) => (
              <li
                key={slide.id}
                className={`slide-item ${slide.id === activeSlideId ? "active" : ""}`}
              >
                <span onClick={() => handleSlideClick(slide.id)}>
                  Slide {index + 1}{" "}
                  {slide.type === "MULTIPLE_CHOICE" ? "• (MC)" : ""}
                  {slide.type === "WORD_CLOUD" ? "• (WC)" : ""}
                </span>
                <button
                  className="slide-delete-btn"
                  onClick={() => removeSlide(slide.id)}
                  title="Excluir slide"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="canvas-area">
        <CanvasStage />
      </main>

      <MultipleChoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeSlide={activeSlide}
        updateSlideMeta={updateSlideMeta}
        sessionId={sessionId}
        publishMultipleChoice={publishMultipleChoice}
        votes={votes}
      />

      <WordCloudModal
        isOpen={isWordCloudModalOpen}
        onClose={() => setIsWordCloudModalOpen(false)}
        activeSlide={activeSlide}
        updateSlideMeta={updateSlideMeta}
        sessionId={sessionId}
        publishWordCloud={publishWordCloud}
        words={votes}
      />

      <InteractiveSlideTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSelectType={handleSelectInteractiveType}
      />

      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        sessionId={sessionId}
        startSession={startSession}
        resetSession={resetSession}
      />
    </div>
  );
}