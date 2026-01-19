import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text as KonvaText } from "react-konva";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/canvas";
import { WordCloudCanvasProps, WordPosition } from "../../types/canvas";

export function WordCloudCanvas({ question, words }: WordCloudCanvasProps) {
  const [wordPositions, setWordPositions] = useState<WordPosition[]>([]);

  useEffect(() => {
    if (Object.keys(words).length === 0) {
      setWordPositions([]);
      return;
    }

    // Calcular frequências e ordenar
    const sortedWords = Object.entries(words).sort(([, a], [, b]) => b - a);
    const maxCount = sortedWords[0]?.[1] || 1;

    // Cores para as palavras
    const colors = [
      '#667eea', '#764ba2', '#48bb78', '#f6ad55', 
      '#fc8181', '#9f7aea', '#4299e1', '#ed8936'
    ];

    // Gerar posições aleatórias para as palavras
    const positions: WordPosition[] = sortedWords.map(([word, count], idx) => {
      // Tamanho da fonte proporcional à frequência (min 16, max 64)
      const fontSize = Math.max(16, Math.min(64, (count / maxCount) * 48 + 16));
      
      // Estimar largura aproximada da palavra (caracteres * fontSize * 0.6)
      const estimatedWidth = word.length * fontSize * 0.6;
      const estimatedHeight = fontSize * 1.2;
      
      // Área disponível para palavras (deixando margem superior para título)
      const availableTop = 110;
      const availableLeft = 40;
      const availableRight = CANVAS_WIDTH - 40;
      const availableBottom = CANVAS_HEIGHT - 40;
      
      const availableWidth = availableRight - availableLeft - estimatedWidth;
      const availableHeight = availableBottom - availableTop - estimatedHeight;
      
      // Posição aleatória, tentando centralizar palavras maiores
      const centerBias = count / maxCount; // 0 a 1
      const xRange = availableWidth * (1 - centerBias * 0.3);
      const yRange = availableHeight * (1 - centerBias * 0.3);
      
      const xOffset = (availableWidth - xRange) / 2;
      const yOffset = (availableHeight - yRange) / 2;
      
      const x = availableLeft + xOffset + Math.random() * xRange;
      const y = availableTop + yOffset + Math.random() * yRange;

      return {
        word,
        count,
        x,
        y,
        fontSize,
        color: colors[idx % colors.length],
      };
    });

    setWordPositions(positions);
  }, [words]);

  const totalWords = Object.values(words).reduce((a, b) => a + b, 0);

  return (
    <div className="canvas-container">
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          {/* Fundo */}
          <Rect
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill="#f7fafc"
          />

          {/* Título "Word Cloud" */}
          <KonvaText
            x={40}
            y={30}
            text="☁️ Word Cloud"
            fontSize={24}
            fontFamily="Inter, Arial"
            fontStyle="bold"
            fill="#667eea"
          />

          {/* Pergunta/Prompt */}
          {question && (
            <KonvaText
              x={40}
              y={65}
              width={CANVAS_WIDTH - 80}
              text={question}
              fontSize={16}
              fontFamily="Inter, Arial"
              fill="#4a5568"
              wrap="word"
            />
          )}

          {/* Badge com total de palavras */}
          {totalWords > 0 && (
            <>
              <Rect
                x={CANVAS_WIDTH - 180}
                y={25}
                width={140}
                height={35}
                fill="#667eea"
                cornerRadius={17.5}
                shadowColor="rgba(102, 126, 234, 0.3)"
                shadowBlur={8}
                shadowOffset={{ x: 0, y: 4 }}
              />
              <KonvaText
                x={CANVAS_WIDTH - 180}
                y={32}
                width={140}
                text={`${totalWords} ${totalWords === 1 ? 'palavra' : 'palavras'}`}
                fontSize={14}
                fontFamily="Inter, Arial"
                fontStyle="bold"
                fill="white"
                align="center"
              />
            </>
          )}

          {/* Nuvem de Palavras */}
          {wordPositions.length > 0 ? (
            wordPositions.map((wp, idx) => (
              <KonvaText
                key={idx}
                x={wp.x}
                y={wp.y}
                text={wp.word}
                fontSize={wp.fontSize}
                fontFamily="Inter, Arial"
                fontStyle="bold"
                fill={wp.color}
                opacity={0.85}
                rotation={0}
                width={CANVAS_WIDTH - wp.x - 40}
                ellipsis={true}
              />
            ))
          ) : (
            <KonvaText
              x={CANVAS_WIDTH / 2}
              y={CANVAS_HEIGHT / 2}
              text="Aguardando palavras dos alunos..."
              fontSize={18}
              fontFamily="Inter, Arial"
              fill="#a0aec0"
              align="center"
              offsetX={150}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}