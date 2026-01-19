import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import "./WordCloudModal.scss";
import { WordCloudModalProps } from "../../types/modal";

export function WordCloudModal({
  isOpen,
  onClose,
  activeSlide,
  updateSlideMeta,
  sessionId,
  publishWordCloud,
  words,
}: WordCloudModalProps) {
  const [isPublished, setIsPublished] = useState(false);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    const newTotal = Object.values(words).reduce((a, b) => a + b, 0);
    setTotalWords(newTotal);
  }, [words]);

  const handlePublish = () => {
    if (!sessionId || !activeSlide) return;
    publishWordCloud(sessionId, activeSlide);
    setIsPublished(true);
    
    setTimeout(() => setIsPublished(false), 3000);
  };

  if (!activeSlide) return null;

  const sortedWords = Object.entries(words)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="wc-modal">
        <h3 className="wc-modal__title">☁️ Configurar Word Cloud</h3>

        <div className="wc-modal__section">
          <label className="wc-modal__label">Prompt / Pergunta:</label>
          <input
            type="text"
            value={activeSlide.question || ""}
            onChange={(e) =>
              updateSlideMeta?.(activeSlide.id, { question: e.target.value })
            }
            className="wc-modal__input"
            placeholder="Ex: Digite uma palavra relacionada ao tema..."
          />
        </div>

        <div className="wc-modal__section">
          <button
            onClick={handlePublish}
            className="wc-modal__publish-btn"
            disabled={!sessionId}
          >
            {isPublished ? "✅ Publicado!" : "📢 Publicar para alunos"}
          </button>
          {!sessionId && (
            <p className="wc-modal__warning">
              ⚠️ Você precisa iniciar uma sessão primeiro
            </p>
          )}
        </div>

        {totalWords > 0 && (
          <div className="wc-modal__results">
            <h4 className="wc-modal__results-title">
              📊 Palavras recebidas: {totalWords}
            </h4>
            <div className="wc-modal__words-list">
              {sortedWords.map(([word, count]) => (
                <div key={word} className="wc-modal__word-item">
                  <span className="wc-modal__word-text">{word}</span>
                  <span className="wc-modal__word-count">{count}x</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {totalWords === 0 && sessionId && (
          <div className="wc-modal__empty">
            <p>Aguardando palavras dos alunos...</p>
          </div>
        )}
      </div>
    </Modal>
  );
}