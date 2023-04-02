import React, { Fragment, useState } from 'react';
import { Input, Column } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


function SearchNotes(props) {
    const [query, setQuery] = useState('');

    const handleKeyDown = event => {
        let isEnterKey = event.key === 'Enter';
        if (isEnterKey) props.searchNotes(query);
    }

    return (
        <>
            <Column.Group className="is-vcentered" breakpoint="mobile">
                <Column size="10" offset={0}>
                    <Input type="text"
                        name={query}
                        value={query}
                        placeholder="Search note..."
                        onChange={event => setQuery(event.target.value)}
                        onKeyDown={handleKeyDown} />
                </Column>
                <Column size={1}>
                    <a href="#" onClick={() => {
                        props.getNotes()
                        setQuery('')
                    }}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            color="grey"
                            className="is-pulled-left"
                            fontSize={'15pt'}
                        />
                    </a>
                </Column>
            </Column.Group>
        </>
    );
}

export default SearchNotes;