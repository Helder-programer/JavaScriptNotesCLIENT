import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Column } from 'rbx';
import NoteService from '../../services/notes/notes';
import ListNotes from './list/index';
import Editor from './editor/index';
import Search from './search/index';
import '../../styles/notes.scss';
import { INote } from '../../types/INote';

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Notes({ setIsOpen, isOpen }: IProps) {
    const [notes, setNotes] = useState<INote[]>([]);
    const [currentNote, setCurrentNote] = useState<INote>({} as INote);

    
    
    async function getNotes() {
        const response = await NoteService.index();
        if (response.data.length >= 1) {
            //Pegar última notes
            setNotes(response.data.reverse());
            //Colocar última nota para se
            setCurrentNote(response.data[0]);
        } else {
            setNotes([]);
        }

    }

    useEffect(() => {
        getNotes();
    }, []);


    const selectNote = (noteId: string) => {
        const note = notes.find(currentNote => {
            return currentNote._id === noteId;
        });

        if (note) {
            setCurrentNote(note);
        }
    }


    const createNote = async () => {
        await NoteService.create();
        getNotes();
    }

    const updateNote = async (oldNote: INote, params: { title?: string, body?: string }) => {
        const updatedNote = await NoteService.update({ id: oldNote._id, params });
        const newNotes = notes;

        for (let currentNoteIndex in newNotes) {
            let isEqualNote = newNotes[currentNoteIndex]._id === oldNote._id;
            if (isEqualNote) newNotes[currentNoteIndex] = updatedNote.data;
        }

        setNotes(newNotes);
        setCurrentNote(updatedNote.data);
    }

    const deleteNote = async (id: string) => {
        let confirmDelete = window.confirm('Deseja deletar esta nota?');
        if (confirmDelete) {
            await NoteService.delete(id);
            getNotes();
        }
    }

    const searchNotes = async (query: string) => {
        const searchedNotes = await NoteService.search(query);
        setNotes(searchedNotes.data.reverse());
    }

    return (
        <>
            <Column.Group className="notes" id="notes">
                <Menu
                    pageWrapId={"notes-editor"}
                    isOpen={isOpen}
                    onStateChange={(state) => setIsOpen(state.isOpen)}
                    disableAutoFocus
                    outerContainerId={"notes"}
                    customBurgerIcon={false}
                    customCrossIcon={false}
                >
                    <Column.Group>
                        <Column size={10} offset={1}>
                            <Search searchNotes={searchNotes} getNotes={getNotes} />
                        </Column>
                    </Column.Group>
                    <ListNotes
                        notes={notes}
                        selectNote={selectNote}
                        currentNote={currentNote}
                        createNote={createNote}
                        deleteNote={deleteNote}
                        updateNote={updateNote}
                    />
                </Menu>

                <Column size={'half'} className="notes-editor" id="notes-editor">
                    {notes.length >= 1 ?
                        
                        <Editor
                            currentNote={currentNote}
                            updateNote={updateNote}
                        />
                        : ''
                    }
                </Column>
            </Column.Group>
        </>
    );
}

export default Notes;