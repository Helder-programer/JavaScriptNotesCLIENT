import React, { useState, useEffect } from 'react';
import { push as Menu } from 'react-burger-menu';
import { Column } from 'rbx';
import NotesService from '../../services/notes.js';
import ListNotes from './list/index';
import Editor from './editor/index';
import Search from './search/index';
import '../../styles/notes.scss';


function Notes({ setIsOpen, isOpen }) {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState({ title: '', body: '', id: '' });

    async function getNotes() {
        const response = await NotesService.index();
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


    const selectNote = noteId => {
        const note = notes.find(currentNote => {
            return currentNote._id == noteId;
        });
        setCurrentNote(note);
    }


    const createNote = async () => {
        await NotesService.create();
        getNotes();
    }

    const updateNote = async (oldNote, params) => {
        const updatedNote = await NotesService.update(oldNote._id, params);
        const index = notes.indexOf(oldNote);
        const newNotes = notes;
        newNotes[index] = updatedNote.data;
        setNotes(newNotes);
        setCurrentNote(updatedNote.data);
    }

    const deleteNote = async (id) => {
        let confirmDelete = window.confirm('Deseja deletar esta nota?');
        if (confirmDelete) {
            await NotesService.delete(id);
            getNotes();
        }

    }


    const searchNotes = async query => {
        const response = await NotesService.search(query);
        setNotes(response.data);
    }

    return (
        <>
            <Column.Group className="notes" id="notes">
                <Menu
                    // pageWrapId={"notes-editor"}
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
                    />
                </Menu>

                <Column size={12} className="notes-editor">
                    { notes.length >= 1 ?
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