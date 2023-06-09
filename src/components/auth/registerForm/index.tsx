import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label, } from "rbx";
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/users/users.js';

function RegisterForm() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await UserService.register({ name, email, password });
            navigate('/login');
        } catch (err: any) {
            console.log(err);
            setError(err.response.data.message);
        }
    }


    return (
        <>
            <Column.Group centered>
                <form onSubmit={handleSubmit} className='auth-form'>
                    <Column>
                        <Field>
                            <Label size="small">Name:</Label>
                            <Control>
                                <Input
                                    type="text"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Email:</Label>
                            <Control>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column className='buttons'>
                                        <a className="button is-white has-text-primary"
                                            onClick={event => navigate('/login')}
                                        >Login or</a>
                                        <Button color="primary" outlined>Register</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                        {error && <Help color="danger">Error: {error}</Help>}
                    </Column>
                </form>
            </Column.Group>
        </>
    );
}

export default RegisterForm;