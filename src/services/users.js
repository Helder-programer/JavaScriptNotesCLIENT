import Api from "./api";

const UserService = {
    register: params => Api.post('/users/register', params),
    login: async params => {
        const response = await Api.post('/users/login', params);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
    },
    logout: () => { localStorage.clear() },
    update: async params => {
        await Api.put(`/users/`, params, {
            headers: { 'access-token': localStorage.getItem('token') }
        });
        localStorage.clear();
    },
    delete: async () => {
        await Api.delete(`/users`, { headers: { 'access-token': localStorage.getItem('token') } });
    },
}

export default UserService;