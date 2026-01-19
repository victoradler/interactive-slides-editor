import { useState, useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import { useSlidesStore } from '../../store/useSlidesStore';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants/canvas';
import { TextElementProps } from '../../types/canvas';

export const TextElement = ({ element, isSelected, onSelect }: TextElementProps) => {
  const { updateElement, activeSlideId } = useSlidesStore();
  const [isEditing, setIsEditing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformerRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastClickTime = useRef<number>(0);

  const handleDragEnd = (e: { target: { x: () => number; y: () => number } }) => {
    if (!activeSlideId || isEditing) return;
    
    updateElement(activeSlideId, element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = () => {
    if (!activeSlideId || !textRef.current) return;
    
    const node = textRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    node.scaleX(1);
    node.scaleY(1);
    
    updateElement(activeSlideId, element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
      fontSize: Math.max(8, element.fontSize * scaleX),
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    if (isEditing) return;
    
    e.cancelBubble = true;
    
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    lastClickTime.current = now;
    
    if (timeSinceLastClick < 400 && isSelected) {
      setIsEditing(true);
    } else {
      onSelect?.();
    }
  };

  const handleDoubleClick = () => {
    if (isEditing) return;
    setIsEditing(true);
  };

  useEffect(() => {
    if (isSelected && !isEditing && transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isEditing]);

  useEffect(() => {
    if (!isEditing) {
      if (inputRef.current) {
        inputRef.current.remove();
        inputRef.current = null;
      }
      return;
    }

    if (!inputRef.current && textRef.current) {
      const textNode = textRef.current;
      const stage = textNode.getStage();
      
      if (!stage) return;

      const input = document.createElement('input');
      input.type = 'text';
      input.value = element.text;
      input.style.position = 'fixed';
      input.style.zIndex = '9999';
      input.style.border = '2px solid #3b82f6';
      input.style.padding = '4px';
      input.style.margin = '0';
      input.style.outline = 'none';
      input.style.background = 'white';
      input.style.fontFamily = 'Arial, sans-serif';

      const updatePosition = () => {
        if (!textNode || !stage) return;
        
        const stageBox = stage.container().getBoundingClientRect();
        const textPosition = textNode.absolutePosition();
        const scaleX = stage.scaleX();
        const scaleY = stage.scaleY();

        const x = stageBox.left + textPosition.x * scaleX;
        const y = stageBox.top + textPosition.y * scaleY;
        const width = Math.max(textNode.width() * scaleX, 100);

        input.style.left = `${x}px`;
        input.style.top = `${y}px`;
        input.style.width = `${width}px`;
        input.style.fontSize = `${element.fontSize * scaleY}px`;
      };

      updatePosition();
      
      const handleBlur = () => {
        if (!activeSlideId) return;     
        updateElement(activeSlideId, element.id, {
          text: input.value,
        });
        setIsEditing(false);
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
          e.preventDefault();
          if (!activeSlideId) return;
          
          updateElement(activeSlideId, element.id, {
            text: input.value,
          });
          setIsEditing(false);
        }
      };

      input.addEventListener('blur', handleBlur);
      input.addEventListener('keydown', handleKeyDown);
      
      document.body.appendChild(input);
      inputRef.current = input;
      
      setTimeout(() => {
        input.focus();
        input.select();
      }, 0);
    }
  }, [isEditing, activeSlideId, element.id, updateElement, element.fontSize, element.text]);

  useEffect(() => {
    if (!isEditing || !inputRef.current || !textRef.current) return;
    
    const textNode = textRef.current;
    const stage = textNode.getStage();
    
    if (!stage) return;
    
    const stageBox = stage.container().getBoundingClientRect();
    const textPosition = textNode.absolutePosition();
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    const x = stageBox.left + textPosition.x * scaleX;
    const y = stageBox.top + textPosition.y * scaleY;
    const width = Math.max(textNode.width() * scaleX, 100);

    inputRef.current.style.left = `${x}px`;
    inputRef.current.style.top = `${y}px`;
    inputRef.current.style.width = `${width}px`;
    inputRef.current.style.fontSize = `${element.fontSize * scaleY}px`;
  }, [isEditing, element.fontSize]);

  return (
    <>
      <Text
        ref={textRef}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        rotation={element.rotation || 0}
        text={element.text}
        fontSize={element.fontSize}
        draggable={!isEditing}
        dragBoundFunc={(pos) => {
          const width = element.width || 100;
          const height = element.height || 50;
          const newX = Math.max(0, Math.min(pos.x, CANVAS_WIDTH - width));
          const newY = Math.max(0, Math.min(pos.y, CANVAS_HEIGHT - height));
          return { x: newX, y: newY };
        }}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        fill="#000"
        shadowEnabled={isSelected}
        shadowColor="rgba(59, 130, 246, 0.5)"
        shadowBlur={8}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.3}
      />
      {isSelected && !isEditing && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          borderStroke="#3b82f6"
          borderStrokeWidth={2}
          anchorFill="#ffffff"
          anchorStroke="#3b82f6"
          anchorStrokeWidth={2}
          anchorSize={8}
          anchorCornerRadius={4}
        />
      )}
    </>
  );
};
