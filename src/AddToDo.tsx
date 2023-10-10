import React, { useState } from 'react';

interface TextInputProps {
  onAddItem: (text: string) => void;
}

const AddToDo: React.FC<TextInputProps> = ({ onAddItem }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddItem = () => {
    if (inputText.trim() === '') {
      return;
    }

    onAddItem(inputText);
    setInputText('');
  };

  return (
    <div className='container mx-auto mb-6'>
			<div className='mb-2'>
				<input
					id="new_task"
					type="text"
					placeholder="Enter a new task"
					value={inputText}
					onChange={handleInputChange}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
				/>
			</div>
			<div>
				<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddItem}>Add</button>
			</div>
    </div>
  );
};

export default AddToDo;