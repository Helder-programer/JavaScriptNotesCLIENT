import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/auth/useAuth';

function PublicRoute({ children }: { children: React.JSX.Element }) {
    const auth = useAuth();

    if (auth.user) return <Navigate to='/notes' />


    return children;
}

export default PublicRoute;