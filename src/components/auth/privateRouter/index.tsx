import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth/useAuth';


function PrivateRoute({ children }: { children: React.JSX.Element }) {
    const auth = useAuth();

    if (!auth.user) return <Navigate to='/login' />

    return children

}

export default PrivateRoute;