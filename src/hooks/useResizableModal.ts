import { useState, useRef, useCallback, useEffect } from 'react';

interface UseResizableModalProps {
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

export const useResizableModal = ({
  initialWidth = 600,
  initialHeight = 400,
  minWidth = 300,
  minHeight = 200,
  maxWidth = window.innerWidth - 40,
  maxHeight = window.innerHeight - 40,
}: UseResizableModalProps = {}) => {
  const [position, setPosition] = useState<Position>(() => {
    // Center the modal initially
    return {
      x: (window.innerWidth - initialWidth) / 2,
      y: (window.innerHeight - initialHeight) / 2,
    };
  });

  const [size, setSize] = useState<Size>({
    width: initialWidth,
    height: initialHeight,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragStartPos = useRef<Position>({ x: 0, y: 0 });
  const resizeStartData = useRef<{ size: Size; position: Position; handle: string }>({
    size: { width: 0, height: 0 },
    position: { x: 0, y: 0 },
    handle: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle dragging
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, textarea, iframe')) {
      return; // Don't drag if clicking on interactive elements
    }
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(handle);
    resizeStartData.current = {
      size: { ...size },
      position: { ...position },
      handle,
    };
  }, [size, position]);

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - size.width;
        const maxY = window.innerHeight - size.height;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      } else if (isResizing) {
        const { size: startSize, position: startPos, handle } = resizeStartData.current;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const startRight = startPos.x + startSize.width;
        const startBottom = startPos.y + startSize.height;
        
        let newWidth = startSize.width;
        let newHeight = startSize.height;
        let newX = startPos.x;
        let newY = startPos.y;

        // Handle different resize handles
        if (handle.includes('right')) {
          newWidth = Math.max(minWidth, Math.min(mouseX - startPos.x, maxWidth));
        }
        if (handle.includes('left')) {
          const newRight = startPos.x + startSize.width;
          newWidth = Math.max(minWidth, Math.min(newRight - mouseX, maxWidth));
          newX = Math.min(startPos.x + startSize.width - minWidth, mouseX);
        }
        if (handle.includes('bottom')) {
          newHeight = Math.max(minHeight, Math.min(mouseY - startPos.y, maxHeight));
        }
        if (handle.includes('top')) {
          const newBottom = startPos.y + startSize.height;
          newHeight = Math.max(minHeight, Math.min(newBottom - mouseY, maxHeight));
          newY = Math.min(startPos.y + startSize.height - minHeight, mouseY);
        }

        // Constrain position to viewport
        const maxX = window.innerWidth - newWidth;
        const maxY = window.innerHeight - newHeight;
        
        // Ensure modal doesn't go off-screen
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));
        
        // Adjust width/height if position was constrained
        if (newX === 0 && handle.includes('left')) {
          newWidth = Math.min(startPos.x + startSize.width, maxWidth);
        }
        if (newY === 0 && handle.includes('top')) {
          newHeight = Math.min(startPos.y + startSize.height, maxHeight);
        }
        
        setSize({
          width: newWidth,
          height: newHeight,
        });
        setPosition({
          x: newX,
          y: newY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, minWidth, minHeight, maxWidth, maxHeight, size]);

  // Update position when window resizes to keep modal in viewport
  useEffect(() => {
    const handleResize = () => {
      const maxX = window.innerWidth - size.width;
      const maxY = window.innerHeight - size.height;
      
      setPosition(prev => ({
        x: Math.max(0, Math.min(prev.x, maxX)),
        y: Math.max(0, Math.min(prev.y, maxY)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  return {
    position,
    size,
    modalRef,
    handleDragStart,
    handleResizeStart,
    isDragging,
    isResizing,
  };
};

