import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute({ children }: { children: React.JSX.Element }) {
    const user = localStorage.getItem('user');

    if (user) return <Navigate to='/notes' />


    return children;
}

export default PublicRoute;