import React, { useState } from 'react';
import { Button, Column, Tag, Title, List, Input } from "rbx";
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AiFillEdit } from 'react-icons/ai';
import '../../../styles/notes.scss';


function ListNotes(props) {
    const [isNoteTitleAlteration, setIsNoteTitleAlteration] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');

    return (
        <>
            <Column.Group breakpoint="mobile">
                <Column size={6} offset={1}>
                    <Title size={6}>
                        {props.notes.length} Notes
                    </Title>

                </Column>
                <Column size={2}>
                    <Button color="custom-purple" outlined size="normal" onClick={() => props.createNote()}>
                        Notes +
                    </Button>
                </Column>
            </Column.Group>
            <List className="notes-list">
                {props.notes.map((item, key) =>
                    <List.Item key={key} onClick={() => props.selectNote(item._id)} active={item == props.currentNote}>
                        {/* {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 25)} */}
                        {/* {
                                ['<h1>', '<h2>', '<b>'].includes(item.body.split(/(<([^>]+)>)/ig)[1]) ?
                                    item.body.split(/(<([^>]+)>)/ig)[3] :  item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 25)
                            } */}

                        <Title size={5} >
                            <Column.Group className="is-vcentered" id="note-title-column">
                                <form action="" method="">
                                    <Column size={12}>
                                        {
                                            isNoteTitleAlteration ?
                                                <Input
                                                    type="text"
                                                    name="title"
                                                    required
                                                    value={noteTitle}
                                                    onChange={event => setNoteTitle(event.target.value)}
                                                    onBlur={() => setIsNoteTitleAlteration(!isNoteTitleAlteration)}
                                                    id="note-title"
                                                    autoFocus
                                                /> : item.title
                                        }
                                    </Column>
                                </form>
                                <Column size={2}>
                                    {
                                        !isNoteTitleAlteration &&
                                        <AiFillEdit id="edit-icon" onClick={() => {
                                            setIsNoteTitleAlteration(!isNoteTitleAlteration);
                                            setNoteTitle(item.title);
                                        }} />
                                    }
                                </Column>
                            </Column.Group>
                        </Title>

                        <Title size={6} subtitle spaced={false}>
                            {
                                item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 30) + '...'
                            }
                        </Title>

                        <Column.Group breakpoint="mobile">
                            <Column size={10}>
                                <Tag color="dark">
                                    {Moment(item.created_at).format('DD/MM')}
                                </Tag>
                            </Column>
                            <Column size={2}>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => props.deleteNote(item._id)}
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