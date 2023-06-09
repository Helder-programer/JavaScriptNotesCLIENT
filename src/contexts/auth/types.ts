import { IUser } from "../../types/IUser";

export interface IAuthInformations {
    user?: IUser;
    token?: string;
}

export interface IContext extends IAuthInformations {
    authenticate(email: string, password: string): Promise<void>;
    logout(): void;
}


export interface IAuthProvider {
    children: React.JSX.Element;
}