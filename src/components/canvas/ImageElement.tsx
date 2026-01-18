import { useState, useEffect, useRef } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import { useSlidesStore } from '../../store/useSlidesStore';
import { ImageElement as ImageElementType } from '../../types/slide';

interface ImageElementProps {
  element: ImageElementType;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ImageElement = ({ element, isSelected, onSelect }: ImageElementProps) => {
  const { updateElement, activeSlideId } = useSlidesStore();
  const [image, setImage] = useState<HTMLImageElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = element.src;
    img.onload = () => {
      setImage(img);
    };
    img.onerror = () => {
      console.error('Erro ao carregar imagem:', element.src);
    };
  }, [element.src]);

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    } else if (transformerRef.current) {
      transformerRef.current.nodes([]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDragEnd = (e: { target: { x: () => number; y: () => number } }) => {
    if (!activeSlideId) return;
    
    updateElement(activeSlideId, element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleTransformEnd = () => {
    if (!activeSlideId || !imageRef.current) return;
    
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    node.scaleX(1);
    node.scaleY(1);
    
    updateElement(activeSlideId, element.id, {
      x: node.x(),
      y: node.y(),
      width: Math.max(10, node.width() * scaleX),
      height: Math.max(10, node.height() * scaleY),
      rotation: node.rotation(),
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    e.cancelBubble = true;
    onSelect?.();
  };

  if (!image) {
    return null;
  }

  return (
    <>
      <KonvaImage
        ref={imageRef}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        rotation={element.rotation || 0}
        image={image}
        draggable
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        onClick={handleClick}
        shadowEnabled={isSelected}
        shadowColor="rgba(59, 130, 246, 0.5)"
        shadowBlur={12}
        shadowOffset={{ x: 3, y: 3 }}
        shadowOpacity={0.4}
        cornerRadius={isSelected ? 4 : 0}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }
            return newBox;
          }}
          borderStroke="#3b82f6"
          borderStrokeWidth={2}
          anchorFill="#ffffff"
          anchorStroke="#3b82f6"
          anchorStrokeWidth={2}
          anchorSize={10}
          anchorCornerRadius={5}
        />
      )}
    </>
  );
};
