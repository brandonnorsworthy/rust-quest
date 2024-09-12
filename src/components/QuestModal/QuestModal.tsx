import React, { useEffect } from 'react';
import Button from '../Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  objectives: string[];
}

const QuestModal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl, title, category, description, objectives }) => {
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
      <div className="w-[56rem] p-5 rounded-lg shadow-lg bg-secondary">
        <img
          src={imageUrl}
          alt="logo"
          className='w-full'
        />

        <div className="flex justify-center w-full mt-4">
          <h2 className="text-5xl font-bold text-text">{title.toUpperCase()}</h2>
        </div>

        <div className="flex justify-center w-full mt-4">
          <p className="text-2xl font-bold text-text-secondary">Category: {category}</p>
        </div>


        <div className="w-full p-5 text-2xl font-bold text-text-secondary">
          <p>
            {description}
          </p>

          {
            (objectives && objectives.length > 0) &&
            <ul className="flex flex-col justify-start w-full px-8 mt-4 list-disc">
              {
                objectives.map((objective, index) => (
                  <li key={objective + index}>{objective}</li>
                ))
              }
            </ul>
          }
        </div>

        <div className="flex justify-end mt-6">
          <div className="flex justify-between w-full gap-4">
            <Button text="learn more" type="info" onClick={onClose} />
            <div className="flex gap-4">
              <Button text="Skip" onClick={onClose} />
              <Button text="complete" type="confirm" onClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestModal;
