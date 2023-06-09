import { IUser } from "../../types/IUser";
import Api from "../api";
import { ILoginDTO } from "./dtos/ILoginDTO";
import { IRegisterUserDTO } from "./dtos/IRegisterUserDTO";
import { IUpdateUserDTO } from "./dtos/IUpdateUserDTO";

class UserService {
    async register(data: IRegisterUserDTO) {
        await Api.post('/users/register', data);
    }


    async login(data: ILoginDTO) {
        const response = await Api.post<{ user: IUser, token: string }>('/users/login', data);
        return response.data;
    }
    
    async update(data: IUpdateUserDTO) {
        await Api.put(`/users/`, data);
    }

    async deleteAccount() {
        await Api.delete(`/users`);
    }
}

export default new UserService();