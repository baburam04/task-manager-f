import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import TaskContext from '../context/taskContext';

const Tasks = () => {
  const [showForm, setShowForm] = useState(false);
  const { tasks, loading, getTasks, addTask } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
  }, []);

  const handleAddTask = (task) => {
    addTask(task);
    setShowForm(false);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      {!showForm ? (
        <Button
          variant="contained"
          onClick={() => setShowForm(true)}
          sx={{ mb: 2 }}
        >
          Add Task
        </Button>
      ) : (
        <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />
      )}
      {loading ? (
        <Typography>Loading tasks...</Typography>
      ) : tasks.length === 0 ? (
        <Typography>No tasks found. Add one to get started!</Typography>
      ) : (
        tasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </Box>
  );
};

export default Tasks;