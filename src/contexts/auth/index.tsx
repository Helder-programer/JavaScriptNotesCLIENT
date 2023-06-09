import React, { createContext, useState, useEffect } from 'react';

import UserService from '../../services/users/users';
import { IAuthInformations, IContext } from './types';
import { getAuthLocalStorage, setAuthLocalStorage } from './utils';

export const AuthContext = createContext<IContext>({} as IContext);

function AuthProvider({ children }: { children: React.JSX.Element }) {
    const [auth, setAuth] = useState<IAuthInformations | null>();

    const authenticate = async (email: string, password: string) => {
        const response = await UserService.login({ email, password });

        const userInformations = { token: response.token, user: { name: response.user.name, email: response.user.email, password: response.user.password } };

        setAuth(userInformations);
        setAuthLocalStorage(userInformations);

    }

    const logout = () => {
        setAuth(null);
        setAuthLocalStorage(null);
    }


    useEffect(() => {
        const user = getAuthLocalStorage();

        if (user) {
            setAuth(user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;