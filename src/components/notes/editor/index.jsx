import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Editor(props) {
    const [currentContent, setCurrentContent] = useState('');
    //Estado utilizado para realizar autoSave
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        setCurrentContent(props.currentNote.body);
    }, [props.currentNote]);

    const updateNote = content => {
        const title = content.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
        props.updateNote(props.currentNote, { title, body: content });
    }

    //Parâmetros delta e source são padrões do react quill. Source faz menção ao meio de atualização. Pode ser usuário ou API.
    const handleChange = (content, delta, source) => {
        clearTimeout(timer);
        if (source == 'user') {
            setCurrentContent(content);
            setTimer(setTimeout(() => updateNote(content), 2000));
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
            <ReactQuill value={currentContent} modules={modules} onChange={handleChange}/>
        </>
    );
}

export default Editor;