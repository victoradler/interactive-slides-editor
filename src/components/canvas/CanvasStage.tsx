import { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { useSlidesStore } from "../../store/useSlidesStore";
import { TextElement } from "./TextElement";
import { ImageElement } from "./ImageElement";


const CANVAS_WIDTH = 960;
const CANVAS_HEIGHT = 540;

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
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
