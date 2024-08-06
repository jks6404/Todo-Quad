import React from 'react';

function ToDoList() {
  // For simplicity, static todo list items are used
  const todoItems = [
    { id: 1, text: 'NOTE #1', completed: false },
    { id: 2, text: 'NOTE #2', completed: true },
    { id: 3, text: 'NOTE #3', completed: false },
  ];

  return (
    <div>
      {todoItems.map(item => (
        <div key={item.id} className="mb-2">
          <input
            type="checkbox"
            checked={item.completed}
            className="mr-2"
          />
          <span className="text-gray-800 dark:text-gray-300">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default ToDoList;