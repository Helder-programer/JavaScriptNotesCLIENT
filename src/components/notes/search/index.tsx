import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Input, Column } from "rbx";
import { FaTimes } from 'react-icons/fa';

interface IProps {
    searchNotes(query: string): Promise<void>;
    getNotes(): Promise<void>;
}

function SearchNotes({ searchNotes, getNotes }: IProps) {
    const [query, setQuery] = useState('');

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        let isEnterKey = event.key === 'Enter';
        if (isEnterKey) searchNotes(query);
    }

    return (
        <>
            <Column.Group className="is-vcentered" breakpoint="mobile">
                <Column size={10} offset={0}>
                    <Input type="text"
                        name={query}
                        value={query}
                        placeholder="Search note..."
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                        onKeyDown={handleKeyDown} />
                </Column>
                <Column size={1}>
                    <a href="#" onClick={() => {
                        getNotes()
                        setQuery('')
                    }}>
                        <FaTimes
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