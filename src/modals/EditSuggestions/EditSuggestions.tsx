import React, { useState, useRef } from 'react';
import Button from '../../components/Button';
import { Suggestion } from '@/models/SuggestionModels/suggestionResponse';
import { Category } from '@/models/CategoryModels/categoryResponse';
import { convertSuggestionIntoQuestBodyRequest } from '@/models/SuggestionModels/suggestionRequests';

interface ModalProps {
  onClose: () => void;
  onDeleteSuggestion: () => void;
  onCreateQuest: (newQuest: convertSuggestionIntoQuestBodyRequest) => void;
  suggestion: Suggestion;
  categories: Category[];
}

const EditSuggestion: React.FC<ModalProps> = (props) => {
  const {
    onClose,
    onDeleteSuggestion,
    onCreateQuest,
    suggestion,
    categories
  } = props;

  const [previewQuest, setPreviewQuest] = useState(true);
  const [imageUrl] = useState("https://questsandbox.s3.amazonaws.com/mission.png");
  const [title, setTitle] = useState(suggestion.title);
  const [description, setDescription] = useState(suggestion.description);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [category, setCategory] = useState(categories[0].name);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);

    if (inputRefs.current[index]) {
      inputRefs.current[index]?.focus();
    }
  };

  return (
    <>
      <img
        src={imageUrl}
        alt="logo"
        className='w-full max-h-[16rem] object-cover'
      />

      <div className="flex justify-center w-full mt-2">
        {
          previewQuest ?
            <h2 className="text-3xl font-bold text-text" style={{ lineHeight: '1.2' }}>{title.toUpperCase()}</h2> :
            <input
              type="text"
              value={title.toUpperCase()}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl font-bold text-center text-text bg-white/25 placeholder:text-text/50"
            />
        }
      </div>

      <div className="flex justify-center w-full mt-2">
        {
          previewQuest ?
            <p className="text-xl font-bold text-text-secondary">Category: {category.toUpperCase()}</p> :
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xl font-bold text-center hover:cursor-pointer text-text bg-white/25 placeholder:text-text/50"
            >
              {
                categories.map((category) => (
                  <option key={category.id} value={category.name}>Category: {category.name.toUpperCase()}</option>
                ))
              }
            </select>
        }
      </div>

      <div className="w-full p-4 mt-2 overflow-x-hidden overflow-y-auto text-lg font-bold max-h-48 text-text-secondary-highlight bg-secondary-highlight scrollbar-modern">
        {
          previewQuest ?
            <p style={{ lineHeight: '1.1' }} className="text-pretty">{description}</p> :
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-lg font-bold text-text bg-white/25 placeholder:text-text/50"
            />
        }

        <div className="flex flex-col justify-start w-full mt-4">
          <hr className='my-2 border-t-2'></hr>
          <p className="mt-2">Objectives</p>
          {
            previewQuest ?
              !(objectives && objectives.length > 0) ? <p className='text-buttonBackground-cancel'>MISSING OBJECTIVES</p> :
                objectives.map((objective, index) => (
                  <div className='flex items-center w-full gap-2' key={index}>
                    <input type="checkbox" id={`objective-${index}`} />
                    <label htmlFor={`objective-${index}`} className="align-middle select-none">
                      {objective.slice(0, 1).toUpperCase() + objective.slice(1).replace(/_/g, ' ')}
                    </label>
                  </div>
                )) :
              <>
                <button
                  className='w-full px-2 py-1 bg-buttonBackground hover:bg-buttonBackground-hover text-buttonText'
                  onClick={() => setObjectives([...objectives, ''])}
                >add objective
                </button>
                {
                  objectives.map((objective, index) => (
                    <div className='flex items-center w-full gap-2 mt-2' key={index}>
                      <input
                        ref={(el) => (inputRefs.current[index] = el)} // Capture the ref
                        type="text"
                        value={objective}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        className="w-full px-4 py-1 text-lg font-bold text-text bg-white/25 placeholder:text-text/50"
                      />
                      <button
                        className='px-2 py-1 bg-buttonBackground-cancel text-buttonText-cancel hover:bg-buttonBackground-cancel-hover'
                        onClick={() => {
                          const newObjectives = objectives.filter((_, i) => i !== index);
                          setObjectives(newObjectives);
                        }}>
                        remove
                      </button>
                    </div>
                  ))
                }
              </>
          }
        </div>

        {
          suggestion.username &&
          <div className="flex flex-col justify-start w-full mt-4">
            <hr className='my-2 border-t-2'></hr>
            <p className="mt-2">Suggested by: <span className='text-buttonBackground-confirm'>{suggestion.username}</span></p>
          </div>
        }
      </div>

      <div className="flex justify-end mt-2">
        <div className="flex flex-col items-start w-full sm:items-center sm:flex-row sm:justify-between">
          <div className="flex justify-start w-full gap-2 sm:w-fit">
            <Button
              onClick={onClose}>
              close
            </Button>
            <Button
              type='cancel'
              onClick={onDeleteSuggestion}
            >
              delete
            </Button>
          </div>
          <div className="flex flex-col w-full gap-2 mt-2 sm:w-fit sm:mt-0 sm:flex-row sm:justify-end">
            <Button
              type="info"
              onClick={() => setPreviewQuest(prev => !prev)}>
              {previewQuest ? 'edit' : 'preview'}
            </Button>
            {
              onCreateQuest &&
              <Button
                type="confirm"
                onClick={() => onCreateQuest({
                  title,
                  description,
                  objectives,
                  image_url: imageUrl,
                  categoryId: categories.find((cat) => cat.name === category)?.id ?? 0
                })}>
                create
              </Button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSuggestion;
