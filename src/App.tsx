import React from 'react';
import MainRoutes from './routes';
import AuthProvider from './contexts/auth';
import './styles/app.scss';


function App() {
    document.title = 'JavascriptNotes';
    
    return (
        <>
            <AuthProvider>
                <MainRoutes />
            </AuthProvider>
        </>
    );
}

export default App;
