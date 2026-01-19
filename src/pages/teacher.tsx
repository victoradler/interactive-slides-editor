import { useSlidesStore } from "../store/useSlidesStore";
import { useSessionStore } from "../store/useSessionStore";
import { CanvasStage } from "../components/canvas/CanvasStage";
import "./teacher.scss";

export default function TeacherPage() {
  const slides = useSlidesStore((s) => s.slides);
  const activeSlideId = useSlidesStore((s) => s.activeSlideId);
  const addSlide = useSlidesStore((s) => s.addSlide);
  const removeSlide = useSlidesStore((s) => s.removeSlide);
  const setActiveSlide = useSlidesStore((s) => s.setActiveSlide);
  const addTextElement = useSlidesStore((s) => s.addTextElement);
  const addImageElement = useSlidesStore((s) => s.addImageElement);

  const { sessionId, startSession, resetSession } = useSessionStore();

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
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <div className="teacher-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Editor de Slides</h2>
        </div>
        <div className="sidebar-controls">
          <button onClick={addSlide} className="btn-add-slide">
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

          <button onClick={addTextElement} className="btn-add-text">
            + Texto
          </button>
          <button onClick={handleAddImage} className="btn-add-image">
            + Imagem
          </button>

          <div style={{ marginTop: 12 }}>
            {!sessionId ? (
              <button onClick={startSession} className="btn">
                Iniciar sessão
              </button>
            ) : (
              <div style={{ display: "grid", gap: 8 }}>
                <div>
                  <small>Código da sessão</small>
                  <div style={{ fontWeight: 700 }}>{sessionId}</div>
                </div>

                <a
                  href={`/student/${sessionId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir link do aluno
                </a>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${window.location.origin}/student/${sessionId}`
                    )
                  }
                  className="btn"
                >
                  Copiar link
                </button>

                <button onClick={resetSession} className="btn">
                  Encerrar sessão
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="slides-container">
          <h3 className="slides-title">Slides</h3>
          <ul className="slides-list">
            {slides.map((slide, index) => (
              <li
                key={slide.id}
                className={`slide-item ${
                  slide.id === activeSlideId ? "active" : ""
                }`}
              >
                <span onClick={() => setActiveSlide(slide.id)}>
                  Slide {index + 1}
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
    </div>
  );
}
