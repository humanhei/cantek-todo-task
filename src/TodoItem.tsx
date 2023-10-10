import React, { useState } from 'react';

interface TodoItemProps {
	id: number;
  text: string;
  onSave: (id: number, newText: string) => void;
	onDelete: (itemId: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
		if (!isEditing){
			setIsEditing(true);
		}
  };

  const handleSave = () => {
		if (isEditing){
			setIsEditing(false);
			onSave(id, editedText);
		}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  return (
		<tr className="bg-white border-b">
			<th scope="row" className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap">
			{isEditing ? (
				<>
					<input
						className='w-full border'
						type="text"
						value={editedText}
						onChange={handleChange}
						autoFocus />
				</>
			) : (
				<>
					<span onDoubleClick={handleEdit}>{text}</span>
				</>
			)}
			</th>
			<td className="px-8 py-4 text-right">
				{isEditing ? (
					<button className="px-4 font-medium text-blue-600 hover:underline" onClick={handleSave}>Save</button>
				) : (
					<button className="px-4 font-medium text-blue-600 hover:underline" onClick={handleEdit}>Edit</button>
				)}
				<button className="px-4 font-medium text-red-600 hover:underline" onClick={() => onDelete(id)}>Delete</button>
			</td>
		</tr>
	);
};

export default TodoItem;