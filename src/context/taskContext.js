import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || '';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get all tasks
  const getTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/tasks`);
      setTasks(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching tasks');
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (task) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/tasks`, task);
      setTasks([res.data.data, ...tasks]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding task');
    }
  };

  // Update task
  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/api/v1/tasks/${id}`, updates);
      setTasks(tasks.map(task => task._id === id ? res.data.data : task));
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating task');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/v1/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting task');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
        setError
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;