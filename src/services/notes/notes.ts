import { INote } from '../../types/INote.js';
import Api from '../api.js';
import { IUpdateNoteDTO } from './dtos/IUpdateNoteDTO.js';

class NoteService {
    async index() {
        const notes = await Api.get('/notes');
        return notes;
    }
    async create() {
        Api.post('/notes', { title: 'Nova Nota', body: 'Nova nota' });
    }

    async delete(id: string) {
        Api.delete(`/notes/${id}`);
    }

    async update(data: IUpdateNoteDTO) {
        const noteUpdated = await Api.put(`/notes/${data.id}`, data.params);

        return noteUpdated;
    }

    async search(query: string) {
        const searchedNotes = await Api.get<INote[]>(`/notes/search/?query=${query}`);
        return searchedNotes;
    }
}


export default new NoteService();