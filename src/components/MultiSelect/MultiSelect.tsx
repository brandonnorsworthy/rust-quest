import { Category } from '@/models/CategoryModels/categoryResponse';
import React from 'react';

interface MultiSelectProps {
  categories: Category[];
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const { categories, selectedCategories, setSelectedCategories } = props;

  const toggleCategory = (id: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(categoryId => categoryId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <div className="w-full max-w-full mt-5">
      <div className="p-3 space-y-2 border-2 rounded-md border-buttonBackground-confirm">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`cursor-pointer p-2 rounded-md text-center
              ${selectedCategories.includes(category.id)
                ? 'bg-buttonBackground-confirm text-buttonText-confirm font-bold border-buttonBackground-confirm'
                : 'bg-white text-gray-800 border-gray-300'}
              hover:bg-buttonText-confirm hover:text-buttonBackground-confirm select-none`}
          >
            {category.name}
          </div>
        ))}
      </div>

      <input
        type="hidden"
        value={selectedCategories.join(',')}
        name="selectedCategories"
      />
    </div>
  );
};

export default MultiSelect;
