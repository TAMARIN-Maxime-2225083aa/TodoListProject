import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState([
    { text: "Learn JavaScript", done: false },
    { text: "Learn React", done: false },
    { text: "Play around in JSFiddle", done: true },
    { text: "Build something awesome", done: true }
  ]);
  const [filter, setFilter] = useState("");

  const addTask = () => {
    const taskName = prompt("Un nom pour cette tâche");
    const newTask = { text: taskName, done: false };
    setItems([...items, newTask]);
  }

  const removeTask = (indexToRemove) => {
    if (window.confirm("Voulez-vous supprimer cette tâche ?")) {
      const updatedItems = [...items];
      updatedItems.splice(indexToRemove, 1);
      setItems(updatedItems);
    }
  }

  const toggleTask = (indexToToggle) => {
    const updatedItems = [...items];
    updatedItems[indexToToggle].done = !updatedItems[indexToToggle].done;
    setItems(updatedItems);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const moveTaskUp = (indexToMove) => {
    if (indexToMove > 0) {
      const updatedItems = [...items];
      const temp = updatedItems[indexToMove];
      updatedItems[indexToMove] = updatedItems[indexToMove - 1];
      updatedItems[indexToMove - 1] = temp;
      setItems(updatedItems);
    }
  }

  const moveTaskDown = (indexToMove) => {
    if (indexToMove < items.length - 1) {
      const updatedItems = [...items];
      const temp = updatedItems[indexToMove];
      updatedItems[indexToMove] = updatedItems[indexToMove + 1];
      updatedItems[indexToMove + 1] = temp;
      setItems(updatedItems);
    }
  }

  const tasksDone = items.filter(item => item.done).length;
  const tasksNotDone = items.filter(item => !item.done).length;
  const taskNumber = items.length;

  const filteredTasks = items.filter(item =>
    item.text.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Todos:</h2>
      <input type='text' id='filter' placeholder='Filtre' value={filter} onChange={handleFilterChange} /> <br />
      <ol>
        {filteredTasks.map((item, index) => (
          <li key={index}>
            <label>
              <input type="checkbox" checked={item.done} onChange={() => toggleTask(index)} />
              <span className={item.done ? "done" : ""}>{item.text}</span>
            </label>
            <button onClick={() => removeTask(index)}>Supprimer</button>
            <button onClick={() => moveTaskUp(index)} disabled={index === 0}>↑</button>
            <button onClick={() => moveTaskDown(index)} disabled={index === items.length - 1}>↓</button>
          </li>
        ))}
      </ol> <br />
      <p>Tâches faites : {tasksDone}</p>
      <p>Tâches à faire : {tasksNotDone}</p>
      <p>Nombre de Tâches : {taskNumber}</p> <br />
      <button onClick={addTask}>Ajouter une tâche</button>
    </div>
  );
}

export default App; // Export de la fonction App
