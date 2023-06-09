import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/home/index';
import RegisterScreen from './screens/auth/register';
import LoginScreen from './screens/auth/login';
import NotesIndexScreen from './screens/notes/index';
import UserEditScreen from './screens/users/edit';
import PrivateRoute from './components/auth/privateRouter';
import PublicRoute from './components/auth/publicRoute';

function MainRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomeScreen />} />
                <Route path='/register' element={
                    <PublicRoute>
                        <RegisterScreen />
                    </PublicRoute>
                } />

                <Route path='/login' element={
                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>
                } />
                <Route path='/notes' element={
                    <PrivateRoute>
                        <NotesIndexScreen />
                    </PrivateRoute>
                } />
                <Route path='/users/edit' element={
                    <PrivateRoute>
                        <UserEditScreen />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default MainRoutes;