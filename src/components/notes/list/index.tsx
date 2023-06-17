import React, { useReducer, ChangeEvent, FormEvent } from 'react';
import { Button, Column, Tag, Title, List, Input } from "rbx";
import { FaTrash } from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import Moment from 'moment';

import { INote } from '../../../types/INote';
import '../../../styles/notes.scss';

interface IProps {
    notes: INote[];
    selectNote(noteId: string): void;
    currentNote: INote;
    createNote(): Promise<void>;
    deleteNote(noteId: string): Promise<void>;
    updateNote(oldNote: INote, params: { title?: string, body?: string }): Promise<void>;
}

interface INoteTitleAlterationState {
    isNoteTitleAlteration: boolean;
    noteTitle: string;
}

interface INoteTitleAlterationAction {
    type: string;
    payload: string;
}


const reducer = (state: INoteTitleAlterationState, action: INoteTitleAlterationAction) => {
    switch (action.type) {
        case 'note-title-alteration':
            return { ...state, isNoteTitleAlteration: !state.isNoteTitleAlteration };
        case 'note-title-input':
            return { ...state, noteTitle: action.payload };
        default:
            return state;
    }
}

function ListNotes({ notes, selectNote, currentNote, createNote, deleteNote, updateNote }: IProps) {
    const [state, dispatch] = useReducer(reducer, { isNoteTitleAlteration: false, noteTitle: '' });

    const handleSubmitNoteTitleForm = (event: FormEvent) => {
        event.preventDefault();
        updateNote(currentNote, { title: state.noteTitle });
        dispatch({ type: 'note-title-alteration', payload: '' });
    }


    return (
        <>
            <Column.Group breakpoint="mobile">
                <Column size={6} offset={1}>
                    <Title size={6}>
                        {notes.length} Notes
                    </Title>

                </Column>
                <Column size={2}>
                    <Button color="primary" outlined size="normal" onClick={() => createNote()}>
                        Notes +
                    </Button>
                </Column>
            </Column.Group>
            <List className="notes-list">
                {notes.map((note, key) =>
                    <List.Item key={key} onClick={() => selectNote(note._id)} active={note._id === currentNote._id}>
                        <Title size={5} >
                            <Column.Group className="is-vcentered" id="note-title-column">
                                <form action="" method="" onSubmit={handleSubmitNoteTitleForm}>
                                    <Column size={12}>
                                        {
                                            state.isNoteTitleAlteration && note === currentNote ?
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    required
                                                    value={state.noteTitle}
                                                    onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch({ type: 'note-title-input', payload: event.target.value })}
                                                    onBlur={() => dispatch({ type: 'note-title-alteration', payload: '' })}
                                                    id="note-title"
                                                    autoFocus
                                                /> : note.title
                                        }
                                    </Column>
                                </form>
                                <Column size={2}>
                                    {
                                        !state.isNoteTitleAlteration &&
                                        <AiFillEdit id="edit-icon" onClick={() => {
                                            dispatch({ type: 'note-title-alteration', payload: '' });
                                            dispatch({ type: 'note-title-input', payload: note.title });
                                        }} />
                                    }
                                </Column>
                            </Column.Group>
                        </Title>

                        <Title size={6} subtitle spaced={false}>
                            {
                                `${note.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30)}...`
                            }
                        </Title>

                        <Column.Group breakpoint="mobile">
                            <Column size={10}>
                                <Tag color="dark">
                                    {Moment(note.created_at).format('DD/MM/YYYY')}
                                </Tag>
                            </Column>
                            <Column size={2}>
                                <FaTrash
                                    onClick={() => deleteNote(note._id)}
                                    color="grey"
                                />
                            </Column>
                        </Column.Group>
                    </List.Item>
                )}
            </List>
        </>
    );
}

export default ListNotes;   