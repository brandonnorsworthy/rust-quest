import React from 'react';
import Button from '../../components/Button';
import { Quest } from '@/models/QuestModels/questResponse';
import { DEFAULT_IMG_URL } from '@/constants';

interface ModalProps {
  onClose: () => void;
  onSkip?: () => void;
  onComplete?: () => void;
  onIncomplete?: () => void;
  quest: Quest
}

const ViewQuest: React.FC<ModalProps> = (props) => {
  const {
    onClose,
    onSkip,
    onComplete,
    onIncomplete,
    quest
  } = props;
  const { title, description, objectives, image_url, category, info_url, username } = quest;

  return (
    <>
      <img
        src={image_url ? image_url : DEFAULT_IMG_URL}
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
        <p style={{ lineHeight: '1.1' }} className="text-pretty">{description}</p>

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

        {
          username &&
          <div className="flex flex-col justify-start w-full mt-4">
            <hr className='my-2 border-t-2'></hr>
            <p className="mt-2">Suggested by: <span className='text-buttonBackground-confirm'>{username}</span></p>
          </div>
        }
      </div>

      <div className="flex justify-end mt-2">
        <div className="flex flex-col items-start w-full sm:items-center sm:flex-row sm:justify-between">
          <div className="flex flex-col w-full gap-2 mt-2 sm:w-fit sm:mt-0 sm:flex-row sm:justify-start">
            <Button
              onClick={onClose}>
              close
            </Button>
            {
              info_url &&
              <Button
                type="info"
                onClick={() => window.open(info_url, '_blank', 'noopener,noreferrer')}>
                learn more
              </Button>
            }
          </div>
          <div className="flex flex-col w-full gap-2 mt-2 sm:w-fit sm:mt-0 sm:flex-row sm:justify-end">
            {
              onSkip &&
              <Button
                type="cancel"
                onClick={onSkip}>
                skip
              </Button>
            }
            {
              onComplete &&
              <Button
                type="confirm"
                onClick={onComplete}>
                complete
              </Button>
            }
            {
              onIncomplete &&
              <Button
                type="cancel"
                onClick={onIncomplete}>
                mark incomplete
              </Button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewQuest;