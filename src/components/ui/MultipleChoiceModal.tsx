import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import "./MultipleChoiceModal.scss";
import { MultipleChoiceModalProps } from "../../types/modal";

export function MultipleChoiceModal({
  isOpen,
  onClose,
  activeSlide,
  updateSlideMeta,
  sessionId,
  publishMultipleChoice,
  votes,
}: MultipleChoiceModalProps) {
  const [isPublished, setIsPublished] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const newTotal = Object.values(votes).reduce((a, b) => a + b, 0);
    setTotalVotes(newTotal);
  }, [votes]);

  const handlePublish = () => {
    if (!sessionId || !activeSlide) return;
    publishMultipleChoice(sessionId, activeSlide);
    setIsPublished(true);
    
    setTimeout(() => setIsPublished(false), 3000);
  };

  if (!activeSlide) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mc-modal">
        <h3 className="mc-modal__title">⚙️ Multipla Escolha</h3>

        <div className="mc-modal__section">
          <label className="mc-modal__label">
            <span className="mc-modal__label-text">Pergunta</span>
            <input
              className="mc-modal__input"
              value={activeSlide.question ?? ""}
              onChange={(e) => updateSlideMeta?.(activeSlide.id, { question: e.target.value })}
              placeholder="Digite a pergunta..."
            />
          </label>
        </div>

        <div className="mc-modal__section">
          <span className="mc-modal__label-text">Opções de Resposta</span>

          <div className="mc-modal__options">
            {(activeSlide.options ?? []).map((opt: string, idx: number) => (
              <div key={idx} className="mc-modal__option">
                <span className="mc-modal__option-number">{String.fromCharCode(65 + idx)}</span>
                <input
                  className="mc-modal__input mc-modal__input--option"
                  value={opt}
                  onChange={(e) => {
                    const next = [...(activeSlide.options ?? [])];
                    next[idx] = e.target.value;
                    updateSlideMeta?.(activeSlide.id, { options: next });
                  }}
                  placeholder={`Opção ${idx + 1}`}
                />
                <button
                  className="mc-modal__remove-btn"
                  onClick={() => {
                    const next = (activeSlide.options ?? []).filter((_: string, i: number) => i !== idx);
                    updateSlideMeta?.(activeSlide.id, { options: next });
                  }}
                  title="Remover opção"
                  disabled={(activeSlide.options ?? []).length <= 2}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            className="mc-modal__add-option-btn"
            onClick={() => {
              const next = [...(activeSlide.options ?? []), `Opção ${(activeSlide.options?.length ?? 0) + 1}`];
              updateSlideMeta?.(activeSlide.id, { options: next });
            }}
          >
            + Adicionar opção
          </button>
        </div>

        <div className="mc-modal__divider" />

        <div className="mc-modal__section">
          {isPublished && (
            <div className="mc-modal__success">
              ✅ Pergunta publicada! Os alunos já podem responder.
            </div>
          )}

          <button
            className={`mc-modal__publish-btn ${!sessionId ? 'mc-modal__publish-btn--disabled' : ''}`}
            disabled={!sessionId}
            onClick={handlePublish}
          >
            📤 Publicar para alunos
          </button>

          {!sessionId && (
            <p className="mc-modal__warning">
              ⚠️ Inicie uma sessão para publicar para alunos.
            </p>
          )}

          {sessionId && (
            <div className="mc-modal__results">
              <div className="mc-modal__results-header">
                <h4 className="mc-modal__results-title">📊 Resultados ao Vivo</h4>
                <span className="mc-modal__total-votes">
                  {totalVotes} {totalVotes === 1 ? 'voto' : 'votos'}
                </span>
              </div>

              {(activeSlide.options ?? []).map((opt: string, idx: number) => {
                const count = votes[String(idx)] ?? 0;
                const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

                return (
                  <div key={idx} className="mc-modal__result-item">
                    <div className="mc-modal__result-header">
                      <span className="mc-modal__result-option">
                        <span className="mc-modal__result-letter">{String.fromCharCode(65 + idx)}</span>
                        {opt}
                      </span>
                      <strong className="mc-modal__result-stats">
                        {count} ({pct}%)
                      </strong>
                    </div>

                    <div className="mc-modal__result-bar">
                      <div
                        className="mc-modal__result-bar-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {totalVotes === 0 && (
                <p className="mc-modal__no-votes">
                  Ainda não há votos. Aguardando respostas dos alunos...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
