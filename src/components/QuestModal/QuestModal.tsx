import React, { useEffect, useRef } from 'react';
import Button from '../Button';

interface ModalProps {
  onClose: () => void;
  onSkip: () => void;
  onComplete: () => void;
  isOpen: boolean;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  objectives: string[];
  infoUrl?: string;
}

const QuestModal: React.FC<ModalProps> = (props) => {
  const {
    onClose,
    onSkip,
    onComplete,
    isOpen,
    imageUrl,
    title,
    category,
    description,
    objectives,
    infoUrl
  } = props;
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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modal} className="max-w-full m-0 sm:m-2 md:m-0  md:max-w-[42rem] max-h-[50rem] overflow-hidden p-2 rounded-lg shadow-lg bg-secondary">
        <img
          src={imageUrl}
          alt="logo"
          className='w-full max-h-[16rem] object-cover'
        />

        <div className="flex justify-center w-full mt-2">
          <h2 className="text-3xl font-bold text-text" style={{ lineHeight: '1.2' }}>{title.toUpperCase()}</h2>
        </div>

        <div className="flex justify-center w-full mt-2">
          <p className="text-xl font-bold text-text-secondary">Category: {category.toUpperCase()}</p>
        </div>

        <div className="w-full p-4 mt-2 overflow-x-hidden overflow-y-auto text-lg font-bold max-h-48 text-text-secondary-highlight bg-secondary-highlight scrollbar-modern">
          <p style={{ lineHeight: '1.1' }} className="text-pretty">{description} {description} {description} {description} {description} {description} {description} {description}</p>
          {
            (objectives && objectives.length > 0) &&
            <div className="flex flex-col justify-start w-full mt-4">
              <hr className='my-2 border-t-2'></hr>
              <p className="mt-2">Objectives</p>
              {
                objectives.map((objective, index) => (
                  <div className='flex items-center w-full gap-2' key={objective + index}>
                    <input type="checkbox" id={objective + index} />
                    <label htmlFor={objective + index} className="align-middle select-none">
                      {objective.slice(0, 1).toUpperCase() + objective.slice(1, objective.length).replace(/_/g, ' ')}
                    </label>
                  </div>
                ))
              }
            </div>
          }
        </div>

        <div className="flex justify-end mt-2">
          <div className="flex flex-col items-start w-full sm:items-center sm:flex-row sm:justify-between">
            <div className="flex justify-start w-full sm:w-fit">
              <Button text="close" onClick={onClose} />
              {
                infoUrl &&
                <Button text="learn more" type="info" onClick={() => window.open(infoUrl, '_blank', 'noopener,noreferrer')} />
              }
            </div>
            <div className="flex flex-col w-full gap-2 mt-2 sm:w-fit sm:mt-0 sm:flex-row sm:justify-end">
              <Button text="Skip" type="cancel" onClick={onSkip} />
              <Button text="complete" type="confirm" onClick={onComplete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
