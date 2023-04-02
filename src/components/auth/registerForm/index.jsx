import React, { useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label, } from "rbx";
import { Navigate } from 'react-router-dom';
import UserService from '../../../services/users.js';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    if (redirectToLogin) return <Navigate to={'/login'} />


    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await UserService.register({ name, email, password });
            setRedirectToLogin(true);
        } catch (error) {
            setError(true);
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
                                    type="name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
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
                                    onChange={event => setEmail(event.target.value)}
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
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column className='buttons'>
                                        <a className="button is-white has-text-custom-purple"
                                            onClick={event => setRedirectToLogin(true)}
                                        >Login or</a>
                                        <Button color="custom-purple" outlined>Register</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                        {error && <Help color="danger">Email or Password invalid</Help>}
                    </Column>
                </form>
            </Column.Group>
        </>
    );
}

export default RegisterForm;