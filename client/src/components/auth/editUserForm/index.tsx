import React, { useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Navigate } from 'react-router-dom';
import UserService from '../../../services/users.js';

function EditUserForm({ user }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    if (redirectToLogin) return <Navigate to='/login'/>

    const handleSubmit = async event => {
        event.preventDefault();
        if (!checkPassword()) return setError(true);

        await UserService.update(   { name, email, password: newPassword });
        setRedirectToLogin(true);
    }

    const checkPassword = () => {
        let isValidPassword = newPassword == newPasswordConfirmation;
        if (!isValidPassword) return false;
        return true;
    }

    return (
        <>
            <Column.Group centered>
                <form onSubmit={handleSubmit} className='auth-form'>
                    <Column size={12}>
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
                            <Label size="small">New Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={newPassword}
                                    onChange={event => setNewPassword(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Label size="small">Confirm Your New Password</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="passwordConfirmation"
                                    value={newPasswordConfirmation}
                                    onChange={event => setNewPasswordConfirmation(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column className='buttons'>
                                        <Button color="custom-purple" outlined>Edit User</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        </Field>
                        {error && <Help color="danger">Problem to edit your user. Please, check your informations</Help>}
                    </Column>
                </form>
            </Column.Group>
        </>
    );
}

export default EditUserForm;