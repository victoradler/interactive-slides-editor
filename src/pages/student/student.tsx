import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./student.scss";

type ActiveSlide = {
  slideId: string;
  type: 'MULTIPLE_CHOICE' | 'WORD_CLOUD';
  question: string;
  options?: string[];
};

function getActiveKey(sessionId: string) {
  return `teachy:session:${sessionId}:active`;
}

function getVotesKey(sessionId: string) {
  return `teachy:session:${sessionId}:votes`;
}

function getVotedKey(sessionId: string, slideId: string) {
  return `teachy:session:${sessionId}:slide:${slideId}:voted`;
}

function useActiveSlide(sessionId: string | undefined) {
  const [activeSlide, setActiveSlide] = useState<ActiveSlide | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const readActive = () => {
      const raw = localStorage.getItem(getActiveKey(sessionId));
      setActiveSlide(raw ? JSON.parse(raw) : null);
    };

    readActive();

    const onStorage = (e: StorageEvent) => {
      if (e.key === getActiveKey(sessionId)) readActive();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [sessionId]);

  return activeSlide;
}

function vote(sessionId: string, slideId: string, optionIndex: number) {
  const votesKey = getVotesKey(sessionId);
  const raw = localStorage.getItem(votesKey);
  const votes = raw ? JSON.parse(raw) : {};
  votes[String(optionIndex)] = (votes[String(optionIndex)] || 0) + 1;
  localStorage.setItem(votesKey, JSON.stringify(votes));
  
  // Marcar que o aluno já votou neste slide
  localStorage.setItem(getVotedKey(sessionId, slideId), String(optionIndex));
}

function submitWord(sessionId: string, slideId: string, word: string) {
  const votesKey = getVotesKey(sessionId);
  const raw = localStorage.getItem(votesKey);
  const words = raw ? JSON.parse(raw) : {};
  words[word] = (words[word] || 0) + 1;
  localStorage.setItem(votesKey, JSON.stringify(words));
  
  // Marcar que o aluno já enviou palavra neste slide
  localStorage.setItem(getVotedKey(sessionId, slideId), word);
}

function getVotedOption(sessionId: string, slideId: string): number | null {
  const voted = localStorage.getItem(getVotedKey(sessionId, slideId));
  return voted !== null ? parseInt(voted, 10) : null;
}

function getSubmittedWord(sessionId: string, slideId: string): string | null {
  return localStorage.getItem(getVotedKey(sessionId, slideId));
}

export default function StudentPage() {
    const { sessionId } = useParams<{ sessionId: string }>();
    const activeSlide = useActiveSlide(sessionId);
    const [votedOption, setVotedOption] = useState<number | null>(null);
    const [submittedWord, setSubmittedWord] = useState<string>("");
    const [wordInput, setWordInput] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState(false);

    // Verificar se já votou quando o slide muda
    useEffect(() => {
      if (sessionId && activeSlide) {
        if (activeSlide.type === 'MULTIPLE_CHOICE') {
          const voted = getVotedOption(sessionId, activeSlide.slideId);
          setVotedOption(voted);
          setSubmittedWord("");
        } else if (activeSlide.type === 'WORD_CLOUD') {
          const word = getSubmittedWord(sessionId, activeSlide.slideId);
          setSubmittedWord(word || "");
          setVotedOption(null);
        }
      } else {
        setVotedOption(null);
        setSubmittedWord("");
      }
    }, [sessionId, activeSlide]);

    const handleVote = (optionIndex: number) => {
      if (!sessionId || !activeSlide || votedOption !== null) return;
      
      vote(sessionId, activeSlide.slideId, optionIndex);
      setVotedOption(optionIndex);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleSubmitWord = () => {
      if (!sessionId || !activeSlide || !wordInput.trim() || submittedWord) return;
      
      submitWord(sessionId, activeSlide.slideId, wordInput.trim());
      setSubmittedWord(wordInput.trim());
      setWordInput("");
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="student-page">
            <header className="student-header">
                <h1>Área do Aluno</h1>
                <p className="student-session-info">
                    Sessão: <strong>{sessionId}</strong>
                </p>
            </header>

            <main className="student-content">
                {activeSlide ? (
                    <div className="question-container">
                        <h2 className="question-title">{activeSlide.question}</h2>
                        
                        {showSuccess && (
                          <div className="success-message">
                            ✅ Resposta enviada com sucesso!
                          </div>
                        )}

                        {activeSlide.type === 'MULTIPLE_CHOICE' && (
                          <>
                            {votedOption !== null && (
                              <div className="voted-message">
                                ℹ️ Você já votou nesta questão
                              </div>
                            )}

                            <div className="options-container">
                                {activeSlide.options?.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleVote(idx)}
                                        className={`option-button ${votedOption === idx ? 'option-button--selected' : ''} ${votedOption !== null && votedOption !== idx ? 'option-button--disabled' : ''}`}
                                        disabled={votedOption !== null}
                                    >
                                        <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                                        <span className="option-text">{option}</span>
                                        {votedOption === idx && (
                                          <span className="option-check">✓</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                          </>
                        )}

                        {activeSlide.type === 'WORD_CLOUD' && (
                          <>
                            {submittedWord && (
                              <div className="voted-message">
                                ℹ️ Você já enviou uma palavra: <strong>{submittedWord}</strong>
                              </div>
                            )}

                            {!submittedWord && (
                              <div className="word-input-container">
                                <input
                                  type="text"
                                  value={wordInput}
                                  onChange={(e) => setWordInput(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSubmitWord()}
                                  placeholder="Digite uma palavra..."
                                  className="word-input"
                                  maxLength={50}
                                />
                                <button
                                  onClick={handleSubmitWord}
                                  className="word-submit-button"
                                  disabled={!wordInput.trim()}
                                >
                                  Enviar
                                </button>
                              </div>
                            )}
                          </>
                        )}
                    </div>
                ) : (
                    <div className="waiting-container">
                        <div className="waiting-icon">⏳</div>
                        <h2>Aguardando a pergunta do professor…</h2>
                        <p>Quando o professor iniciar um slide interativo, ele vai aparecer aqui.</p>

                        <div className="session-info">
                            Você está conectado à sessão <strong>{sessionId}</strong>.
                        </div>
                    </div>
                )}

                <Link to="/" className="student-back">
                    ← Voltar para a Home
                </Link>
            </main>
        </div>
    );
}
