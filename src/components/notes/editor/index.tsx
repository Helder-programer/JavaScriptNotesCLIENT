import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Delta as TypeDelta, Sources } from 'quill';
import { BsFillCloudCheckFill } from 'react-icons/bs';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import 'react-quill/dist/quill.snow.css';

import { INote } from '../../../types/INote';

interface IProps {
    currentNote: INote;
    updateNote(oldNote: INote, params: { title: string, body: string }): Promise<void>;
}


function Editor({ currentNote, updateNote }: IProps) {
    const [currentContent, setCurrentContent] = useState<string>('');
    //Estado utilizado para realizar autoSave
    const [timer, setTimer] = useState<NodeJS.Timeout | string>('');

    useEffect(() => {
        setCurrentContent(currentNote.body);
    }, [currentNote.body]);



    const updateNoteInEditor = async (content: string) => {
        updateNote(currentNote, { body: content, title: '' });
    }



    //Parâmetros delta e source são padrões do react quill. Source faz menção ao meio de atualização. Pode ser usuário ou API.
    const handleChange = (content: string, delta: TypeDelta, source: Sources) => {
        clearTimeout(timer);
        if (source === 'user') {
            setCurrentContent(content);
            setTimer(setTimeout(() => updateNoteInEditor(content).then(() => setTimer('')), 2000));
        }
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ]
    }

    return (
        <>
            <ReactQuill value={currentContent} modules={modules} onChange={handleChange} />

            {
                timer
                    ?
                    <span id="cloud-icon-saving" className="has-text-primary">
                        <BsFillCloudArrowUpFill />
                        <span className="small-text">Saving...</span>
                    </span>
                    :
                    <span id="cloud-icon-saved" className="has-text-success">
                        <BsFillCloudCheckFill />
                        <span className="small-text">Saved!</span>
                    </span>
            }
        </>
    );
}

export default Editor;