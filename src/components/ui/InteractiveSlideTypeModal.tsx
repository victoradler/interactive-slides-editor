import { Modal } from "./Modal";
import "./InteractiveSlideTypeModal.scss";
import { InteractiveSlideTypeModalProps } from "../../types/modal";

export function InteractiveSlideTypeModal({
  isOpen,
  onClose,
  onSelectType,
}: InteractiveSlideTypeModalProps) {
  const handleSelect = (type: 'MULTIPLE_CHOICE' | 'WORD_CLOUD') => {
    onSelectType(type);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="interactive-type-modal">
        <h3 className="interactive-type-modal__title">
          Escolha o Tipo de Slide Interativo
        </h3>
        <p className="interactive-type-modal__description">
          Selecione o tipo de interação que deseja criar:
        </p>
        
        <div className="interactive-type-modal__options">
          <button
            className="interactive-type-modal__option"
            onClick={() => handleSelect('MULTIPLE_CHOICE')}
          >
            <div className="interactive-type-modal__icon">📊</div>
            <h4>Sessão de perguntas e respostas</h4>
            <p>Pergunta com opções múltiplas e visualização de votos em tempo real com gráficos de respostas.</p>
          </button>

          <button
            className="interactive-type-modal__option"
            onClick={() => handleSelect('WORD_CLOUD')}
          >
            <div className="interactive-type-modal__icon">☁️</div>
            <h4>Word Cloud</h4>
            <p>Nuvem de palavras onde alunos enviam termos livres</p>
          </button>
        </div>
      </div>
    </Modal>
  );
}