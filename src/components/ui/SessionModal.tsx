import { Modal } from "./Modal";
import "./SessionModal.scss";
import { SessionModalProps } from "../../types/modal";

export function SessionModal({
  isOpen,
  onClose,
  sessionId,
  startSession,
  resetSession,
}: SessionModalProps) {
  const handleCopyLink = () => {
    if (sessionId) {
      navigator.clipboard.writeText(`${window.location.origin}/student/${sessionId}`);
    }
  };

  const handleEndSession = () => {
    resetSession();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="session-modal">
        <h3 className="session-modal__title">
          {sessionId ? "Sessão Ativa" : "Iniciar Nova Sessão"}
        </h3>

        {!sessionId ? (
          <div className="session-modal__start-section">
            <p className="session-modal__description">
              Crie uma nova sessão para compartilhar seus slides com os alunos.
            </p>
            <button
              onClick={startSession}
              className="session-modal__start-btn"
            >
              🚀 Iniciar Sessão
            </button>
          </div>
        ) : (
          <>
            <div className="session-modal__info-section">
              <div className="session-modal__info-item">
                <div className="session-modal__label">Código da Sala</div>
                <div className="session-modal__code">{sessionId}</div>
              </div>

              <div className="session-modal__info-item">
                <div className="session-modal__label">Link para Alunos</div>
                <div className="session-modal__link">
                  {window.location.origin}/student/{sessionId}
                </div>
              </div>
            </div>

            <div className="session-modal__actions">
              <button
                onClick={handleCopyLink}
                className="session-modal__copy-btn"
              >
                📋 Copiar Link
              </button>

              <button
                onClick={handleEndSession}
                className="session-modal__end-btn"
              >
                🚪 Encerrar Sessão
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}