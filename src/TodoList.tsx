import TodoItem from "./TodoItem";

interface ListItem {
  id: number;
  text: string;
}

interface ListDisplayProps {
  list: ListItem[];
  onEditItem: (itemId: number, newText: string) => void;
  onDeleteItem: (itemId: number) => void;
}

const TodoList: React.FC<ListDisplayProps> = ({ list, onEditItem, onDeleteItem }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Task name
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (            
              <TodoItem key={item.id} id={item.id} text={item.text} onSave={onEditItem} onDelete={onDeleteItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList