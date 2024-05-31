import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>; 
  } else if (currentUser?.isAdmin) {
    return <>{children}</>; 
  } else {
    return <Navigate to="/authorization" />; 
  }
}