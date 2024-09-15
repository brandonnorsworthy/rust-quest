import React, { useEffect, useRef } from 'react';

interface ModalProps {
  onClose: () => void;
  isOpen?: boolean;
  children: React.ReactNode;
}

const QuestModal: React.FC<ModalProps> = ({ onClose, isOpen = true, children }) => {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modal.current && !modal.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modal} className="p-2 bg-secondary max-h-[90dvh] shadow-lg">
        <div className="max-w-full m-0 h-full max-h-[85dvh] overflow-y-auto sm:m-2 md:m-0  md:max-w-[42rem] text-text scrollbar-modern">
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
