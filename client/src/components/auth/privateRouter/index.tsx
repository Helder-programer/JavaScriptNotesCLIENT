import React from 'react';
import { Navigate } from 'react-router-dom';


function PrivateRoute({ children }: { children: React.JSX.Element }) {
    const user = localStorage.getItem('user');

    if (!user) return <Navigate to='/login' />

    return children

}

export default PrivateRoute;