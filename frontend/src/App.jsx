import React, { useState, useEffect } from 'react';
import axios from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post('/api/tasks', { name: task });
    setTask('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Coaching Tasks</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(t => (
          <li key={t._id}>
            {t.name} <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;