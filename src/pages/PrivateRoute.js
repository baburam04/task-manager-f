import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;