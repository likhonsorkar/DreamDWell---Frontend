import useAuthContext from '../hooks/useAuthContext';
import { Navigate } from 'react-router';
const PrivateRoute = ({children}) => {
    const {user} = useAuthContext();
    if (user==null) return <div className='text-center m-2'><span className="loading loading-bars loading-xl text-primary"></span></div>;
    return user ? children : <Navigate to="/login"></Navigate>
};
export default PrivateRoute;

