import { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text, Group } from "react-konva";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../constants/canvas";
import { MultipleChoiceCanvasProps } from "../../types/canvas";

export function MultipleChoiceCanvas({ question, options, votes }: MultipleChoiceCanvasProps) {
  const [animatedVotes, setAnimatedVotes] = useState<Record<string, number>>({});

  // Animar as barras do gráfico
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedVotes(votes);
    }, 300);
    return () => clearTimeout(timer);
  }, [votes]);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
  const maxBarWidth = CANVAS_WIDTH - 400 - 80; // 800 - 400 - 80 = 320

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

          {/* Título "Multiple Choice" */}
          <Text
            x={40}
            y={30}
            text="📊 Slide Interativo"
            fontSize={24}
            fontFamily="Inter, Arial"
            fontStyle="bold"
            fill="#667eea"
          />

          {/* Pergunta */}
          <Rect
            x={40}
            y={80}
            width={CANVAS_WIDTH - 80}
            height={80}
            fill="white"
            cornerRadius={12}
            shadowColor="rgba(0,0,0,0.1)"
            shadowBlur={10}
            shadowOffsetY={2}
          />

          <Text
            x={60}
            y={100}
            width={CANVAS_WIDTH - 120}
            text={question || "Configure a pergunta no modal ⚙️"}
            fontSize={20}
            fontFamily="Inter, Arial"
            fontStyle="bold"
            fill="#2d3748"
            align="left"
            wrap="word"
          />

          {/* Área dos Resultados */}
          <Text
            x={40}
            y={190}
            text="Resultados"
            fontSize={18}
            fontFamily="Inter, Arial"
            fontStyle="bold"
            fill="#4a5568"
          />

          {/* Total de votos */}
          {totalVotes > 0 && (
            <Group>
              <Rect
                x={CANVAS_WIDTH - 180}
                y={185}
                width={140}
                height={30}
                fill="#667eea"
                cornerRadius={15}
              />
              <Text
                x={CANVAS_WIDTH - 180}
                y={192}
                width={140}
                text={`${totalVotes} ${totalVotes === 1 ? 'voto' : 'votos'}`}
                fontSize={14}
                fontFamily="Inter, Arial"
                fontStyle="bold"
                fill="white"
                align="center"
              />
            </Group>
          )}

          {/* Gráfico de Barras */}
          {options.map((option, idx) => {
            const count = animatedVotes[String(idx)] || 0;
            const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
            const barWidth = totalVotes > 0 ? (count / totalVotes) * maxBarWidth : 0;
            const yPos = 240 + idx * 65;

            // Cores diferentes para cada opção
            const colors = [
              { bg: '#667eea', fill: '#764ba2' },
              { bg: '#48bb78', fill: '#38a169' },
              { bg: '#f6ad55', fill: '#ed8936' },
              { bg: '#fc8181', fill: '#f56565' },
              { bg: '#9f7aea', fill: '#805ad5' },
            ];
            const color = colors[idx % colors.length];

            return (
              <Group key={idx}>
                {/* Letra da opção */}
                <Rect
                  x={40}
                  y={yPos}
                  width={35}
                  height={35}
                  fill={color.bg}
                  cornerRadius={17.5}
                />
                <Text
                  x={40}
                  y={yPos + 8}
                  width={35}
                  text={String.fromCharCode(65 + idx)}
                  fontSize={16}
                  fontFamily="Courier New, monospace"
                  fontStyle="bold"
                  fill="white"
                  align="center"
                />

                {/* Texto da opção */}
                <Text
                  x={90}
                  y={yPos + 8}
                  width={300}
                  text={option}
                  fontSize={14}
                  fontFamily="Inter, Arial"
                  fill="#2d3748"
                  ellipsis={true}
                />

                {/* Barra de fundo */}
                <Rect
                  x={400}
                  y={yPos + 5}
                  width={maxBarWidth}
                  height={25}
                  fill="#e2e8f0"
                  cornerRadius={12.5}
                />

                {/* Barra de progresso animada */}
                <Rect
                  x={400}
                  y={yPos + 5}
                  width={barWidth}
                  height={25}
                  fill={color.bg}
                  cornerRadius={12.5}
                  shadowColor={color.fill}
                  shadowBlur={10}
                />

                {/* Porcentagem e votos */}
                <Text
                  x={400 + maxBarWidth + 10}
                  y={yPos + 8}
                  width={60}
                  text={`${Math.round(percentage)}%`}
                  fontSize={14}
                  fontFamily="Inter, Arial"
                  fontStyle="bold"
                  fill={color.bg}
                  align="left"
                />

                {/* Número de votos */}
                {count > 0 && (
                  <Text
                    x={410 + barWidth}
                    y={yPos + 8}
                    text={`${count}`}
                    fontSize={12}
                    fontFamily="Inter, Arial"
                    fontStyle="bold"
                    fill="white"
                    offsetX={barWidth > 30 ? 20 : -25}
                  />
                )}
              </Group>
            );
          })}

          {/* Mensagem quando não há votos */}
          {totalVotes === 0 && (
            <Group>
              <Rect
                x={180}
                y={260}
                width={600}
                height={60}
                fill="white"
                cornerRadius={10}
                shadowColor="rgba(0,0,0,0.05)"
                shadowBlur={5}
              />
              <Text
                x={180}
                y={275}
                width={600}
                text="⏳ Aguardando votos dos alunos..."
                fontSize={16}
                fontFamily="Inter, Arial"
                fontStyle="italic"
                fill="#a0aec0"
                align="center"
              />
            </Group>
          )}
        </Layer>
      </Stage>
    </div>
  );
}
