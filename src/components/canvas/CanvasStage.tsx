import { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useSlidesStore } from "../../store/useSlidesStore";
import { useSessionStore } from "../../store/useSessionStore";
import { TextElement } from "./TextElement";
import { ImageElement } from "./ImageElement";
import { MultipleChoiceCanvas } from "./MultipleChoiceCanvas";
import { WordCloudCanvas } from "./WordCloudCanvas";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/canvas";

function getVotesKey(sessionId: string, slideId?: string) {
  if (slideId) {
    return `teachy:session:${sessionId}:slide:${slideId}:votes`;
  }
  return `teachy:session:${sessionId}:votes`;
}

function useLiveVotes(sessionId: string | null, slideId: string | null) {
  const [votes, setVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!sessionId || !slideId) return;

    const votesKey = getVotesKey(sessionId, slideId);

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
  }, [sessionId, slideId]);

  return votes;
}


// Componente para o grid de fundo
function GridBackground() {
  const gridSize = 20;
  const lines = [];

  // Linhas verticais mais suaves
  for (let x = 0; x <= CANVAS_WIDTH; x += gridSize) {
    lines.push(
      <Rect
        key={`v-${x}`}
        x={x}
        y={0}
        width={0.5}
        height={CANVAS_HEIGHT}
        fill="rgba(0,0,0,0.015)"
      />
    );
  }

  // Linhas horizontais mais suaves
  for (let y = 0; y <= CANVAS_HEIGHT; y += gridSize) {
    lines.push(
      <Rect
        key={`h-${y}`}
        x={0}
        y={y}
        width={CANVAS_WIDTH}
        height={0.5}
        fill="rgba(0,0,0,0.015)"
      />
    );
  }

  return <>{lines}</>;
}

export function CanvasStage() {
  const { slides, activeSlideId, removeElement } = useSlidesStore();
  const { sessionId } = useSessionStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const votes = useLiveVotes(sessionId, activeSlideId);

  const activeSlide = slides.find(slide => slide.id === activeSlideId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStageClick = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
      )) {
        return; 
      }
      
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId && activeSlideId) {
        e.preventDefault();
        removeElement(activeSlideId, selectedId);
        setSelectedId(null);
      }
      
      if (e.key === 'Enter' && selectedId && activeSlideId) {
        const selectedElement = activeSlide?.elements.find(el => el.id === selectedId);
        if (selectedElement?.type === 'TEXT') {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, activeSlideId, removeElement, activeSlide]);

  if (!activeSlide) {
    return (
      <div className="empty-canvas-message scale-in-center ">
        <h3>Bem-vindo ao Editor de Slides!</h3>
        <p>Selecione um slide no painel lateral ou crie um novo para começar a editar.</p>
      </div>
    );
  }

  // Se for Multiple Choice, mostrar preview especial
  if (activeSlide.type === "MULTIPLE_CHOICE") {
    return (
      <MultipleChoiceCanvas
        question={activeSlide.question || ""}
        options={activeSlide.options || []}
        votes={votes}
      />
    );
  }

  // Se for Word Cloud, mostrar preview especial
  if (activeSlide.type === "WORD_CLOUD") {
    return (
      <WordCloudCanvas
        question={activeSlide.question || ""}
        words={votes}
      />
    );
  }

  return (
    <div className="canvas-container ">
      <Stage
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={handleStageClick}
        onTouchStart={handleStageClick}
        className="canvas-stage"
      >
        <Layer>
          {/* Grid de fundo sutil */}
          <GridBackground />

          {activeSlide.elements.map((element) => {
            if (element.type === 'TEXT') {
              return (
                <TextElement
                  key={element.id}
                  element={element}
                  isSelected={selectedId === element.id}
                  onSelect={() => setSelectedId(element.id)}
                />
              );
            }
            if (element.type === 'IMAGE') {
              return (
                <ImageElement
                  key={element.id}
                  element={element}
                  isSelected={selectedId === element.id}
                  onSelect={() => setSelectedId(element.id)}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
}
