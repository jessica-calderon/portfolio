import React, { ReactNode } from 'react';
import { useResizableModal } from '../../hooks/useResizableModal';

interface ResizableModalProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  titleBarActions?: ReactNode;
  darkMode?: boolean;
}

const ResizableModal: React.FC<ResizableModalProps> = ({
  children,
  title,
  onClose,
  initialWidth = 600,
  initialHeight = 400,
  minWidth = 300,
  minHeight = 200,
  titleBarActions,
  darkMode = false,
}) => {
  const {
    position,
    size,
    modalRef,
    handleDragStart,
    handleResizeStart,
    isDragging,
  } = useResizableModal({
    initialWidth,
    initialHeight,
    minWidth,
    minHeight,
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      style={{ fontFamily: "'Tahoma', 'Segoe UI', sans-serif" }}
    >
      <div 
        ref={modalRef}
        className={`${darkMode ? 'bg-gray-700 text-white' : 'bg-[#ece9d8] text-black'} rounded-md shadow-md border-2 border-gray-500 overflow-hidden animate-modalAppear flex flex-col relative`}
        style={{ 
          position: 'fixed',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          cursor: isDragging ? 'move' : 'default',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Windows XP-style title bar - draggable */}
        <div 
          className={`${darkMode ? 'bg-gradient-to-b from-[#1a3a85] to-[#0f2a65]' : 'bg-gradient-to-b from-[#245edb] to-[#1a4aa5]'} text-white font-bold px-4 py-2 flex items-center justify-between select-none`}
          onMouseDown={handleDragStart}
          style={{ cursor: 'move' }}
        >
          <span className="text-sm">{title}</span>
          <div className="flex items-center gap-2">
            {titleBarActions}
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white w-6 h-6 flex items-center justify-center text-xs font-bold border border-red-800 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Windows XP-style resize handles */}
        {/* Corner handles */}
        <div
          className="absolute top-0 left-0 w-3 h-3 bg-gray-400 border-r border-b border-gray-600 cursor-nwse-resize hover:bg-gray-500"
          onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 bg-gray-400 border-l border-b border-gray-600 cursor-nesw-resize hover:bg-gray-500"
          onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 bg-gray-400 border-r border-t border-gray-600 cursor-nesw-resize hover:bg-gray-500"
          onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-l border-t border-gray-600 cursor-nwse-resize hover:bg-gray-500"
          onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          style={{ zIndex: 10 }}
        />
        
        {/* Edge handles */}
        <div
          className="absolute top-0 left-3 right-3 h-1 cursor-ns-resize hover:bg-gray-400"
          onMouseDown={(e) => handleResizeStart(e, 'top')}
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize hover:bg-gray-400"
          onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize hover:bg-gray-400"
          onMouseDown={(e) => handleResizeStart(e, 'left')}
          style={{ zIndex: 10 }}
        />
        <div
          className="absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize hover:bg-gray-400"
          onMouseDown={(e) => handleResizeStart(e, 'right')}
          style={{ zIndex: 10 }}
        />
      </div>
    </div>
  );
};

export default ResizableModal;

