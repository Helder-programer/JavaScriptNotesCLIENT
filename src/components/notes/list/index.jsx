import React from 'react';
import { Button, Column, Tag, Title, List } from "rbx";
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/notes.scss';


function ListNotes(props) {
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
                        <Title size={6}>
                            {/* Remover todas as tags HTML e apresentar somente o texto */}
                            {/* {item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 25)} */}
                            {
                                ['<h1>', '<h2>', '<b>'].includes(item.body.split(/(<([^>]+)>)/ig)[1]) ?
                                    item.body.split(/(<([^>]+)>)/ig)[3] :  item.body.replace(/(<([^>]+)>)/ig, "").substring(0, 25)
                            }
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