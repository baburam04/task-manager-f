import { Alert as MuiAlert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import TaskContext from '../context/taskContext';

const Alert = () => {
  const { error: authError, setError: setAuthError } = useContext(AuthContext);
  const { error: taskError, setError: setTaskError } = useContext(TaskContext);
  
  const error = authError || taskError;
  const handleClose = () => {
    if (authError) setAuthError(null);
    if (taskError) setTaskError(null);
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;