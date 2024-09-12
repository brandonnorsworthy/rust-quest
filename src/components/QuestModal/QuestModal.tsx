import React, { useEffect } from 'react';
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
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[50rem] max-h-[50rem] overflow-hidden p-5 rounded-lg shadow-lg bg-secondary">
        <img
          src={imageUrl}
          alt="logo"
          className='w-full'
        />

        <div className="flex justify-center w-full mt-4">
          <h2 className="text-5xl font-bold text-text">{title.toUpperCase()}</h2>
        </div>

        <div className="flex justify-center w-full mt-2">
          <p className="text-2xl font-bold text-text-secondary">Category: {category.toUpperCase()}</p>
        </div>


        <div className="w-full px-4 py-2 mt-2 overflow-scroll text-2xl font-bold max-h-52 text-text-secondary-highlight bg-secondary-highlight">
          <p>{description}</p>
          {
            (objectives && objectives.length > 0) &&
            <div className="flex flex-col justify-start w-full px-4 mt-4">
              <p>Objectives:</p>
              {
                objectives.map((objective, index) => (
                  <div className='flex items-center w-full gap-2' key={objective + index}>
                    <input type="checkbox" id={objective + index} />
                    <label htmlFor={objective + index} className="align-middle select-none">
                      {objective}
                    </label>
                  </div>
                ))
              }
            </div>
          }
        </div>

        <div className="flex justify-end mt-4">
          <div className="flex justify-between w-full gap-4">
            <div className="flex">
              <Button text="close" onClick={onClose} />
              {
                infoUrl &&
                <Button text="learn more" type="info" onClick={() => window.open(infoUrl, '_blank', 'noopener,noreferrer')} />
              }
            </div>
            <div className="flex justify-end gap-4">
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
