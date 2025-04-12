import { useState, useContext } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Checkbox } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import TaskForm from './TaskForm';
import TaskContext from '../context/taskContext';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateTask, deleteTask } = useContext(TaskContext);

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleUpdate = (updatedTask) => {
    updateTask(task._id, updatedTask);
    setIsEditing(false);
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: task.completed ? '#f5f5f5' : 'white' }}>
      <CardContent>
        {isEditing ? (
          <TaskForm
            task={task}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={task.completed}
                onChange={handleToggleComplete}
                color="primary"
              />
              <Typography
                variant="h6"
                sx={{
                  flexGrow: 1,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.disabled' : 'text.primary'
                }}
              >
                {task.title}
              </Typography>
              <IconButton onClick={() => setIsEditing(true)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteTask(task._id)}>
                <Delete />
              </IconButton>
            </Box>
            {task.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {task.description}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;