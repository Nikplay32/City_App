import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth(); // Get the current user and loading state from your auth context

  if (loading) {
    return <div>Loading...</div>; // Return a loading component while the user data is being loaded
  } else if (currentUser?.isAdmin) {
    return <>{children}</>; // If the user is an admin, render the children
  } else {
    return <Navigate to="/authorization" />; // If the user is not an admin, redirect them to the authorization page
  }
}