import Api from './api.js';

const NotesService = {
    index: async () => Api.get('/notes', {
        headers: { 'access-token': localStorage.getItem('token') }
    }),
    create: async () => Api.post('/notes', { title: 'Nova Nota', body: 'Nova nota...' }, {
        headers: { 'access-token': localStorage.getItem('token') }
    }),
    delete: async (id) => Api.delete(`/notes/${id}`, {
        headers: { 'access-token': localStorage.getItem('token') }
    }),
    update: async (id, params) => Api.put(`/notes/${id}`, params, {
        headers: { 'access-token': localStorage.getItem('token') }
    }),
    search: async query => Api.get(`/notes/search/?query=${query}`, {
        headers: { 'access-token': localStorage.getItem('token') }
    }),
}


export default NotesService;