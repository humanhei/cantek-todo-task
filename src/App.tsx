import { useState, useEffect, useRef } from 'react'
import AddToDo from './AddToDo';
import TodoList from './TodoList';

interface ListItem {
    id: number;
    text: string;
}

function App() {
  const [list, setList] = useState<ListItem[]>([]);
  const didMountRef = useRef(false);

  // Load the items from local storage when the component mounts
  useEffect(() => {
    const storedList = localStorage.getItem('list');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  // Save the items to local storage whenever they change
  useEffect(() => {
    if (didMountRef.current){
      localStorage.setItem('list', JSON.stringify(list));
    }
    didMountRef.current = true;
  }, [list]);

  const handleAddItem = (text: string) => {
    // Add new item
    const newItem: ListItem = {
      id: Date.now(),
      text,
    };
    setList([...list, newItem]);
  };

  const handleEditItem = (itemId: number, newText: string) => {
    // Edit item
    const selectedItem = list.find((item) => item.id === itemId);
    if (selectedItem) {
      const updatedList = list.map((item) =>
        item.id === itemId ? { ...item, text: newText } : item
      );
      setList(updatedList);
    }
  };

  const handleDeleteItem = (itemId: number) => {
    // Delete item
    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  };

  return (
    <div>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome to Task List!
        </p>
        <p className="text-gray-500 text-lg">
          Enter a new task in the input box or edit task in the list
        </p>
      </div>
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <AddToDo onAddItem={handleAddItem} />
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Task List
        </p>
        {list.length > 0 ?
          <TodoList
            list={list}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
          /> : 
          <p className="text-gray-500 text-lg">
            No Task in the List
          </p>
        }
      </div>
    </div>
    
  );
}

export default App
