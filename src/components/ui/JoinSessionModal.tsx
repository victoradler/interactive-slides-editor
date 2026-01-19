import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import "./JoinSessionModal.scss";
import { JoinSessionModalProps } from "../../types/modal";

export function JoinSessionModal({ isOpen, onClose }: JoinSessionModalProps) {
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();

  const handleJoinSession = () => {
    if (sessionId.trim()) {
      navigate(`/student/${sessionId.trim()}`);
      onClose();
      setSessionId("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJoinSession();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="join-session-modal">
        <h3 className="join-session-modal__title">Entrar em Sessão</h3>
        <p className="join-session-modal__description">
          Digite o número da sessão para participar.
        </p>
        <input
          type="text"
          placeholder="Número da sessão"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          onKeyPress={handleKeyPress}
          className="join-session-modal__input"
        />
        <button
          onClick={handleJoinSession}
          className="join-session-modal__join-btn"
          disabled={!sessionId.trim()}
        >
          Entrar na Sessão
        </button>
      </div>
    </Modal>
  );
}