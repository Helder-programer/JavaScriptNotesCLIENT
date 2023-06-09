import React, { FormEvent, useState, ChangeEvent } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth/useAuth.js';
import UserService from '../../../services/users/users.js';

function EditUserForm() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [name, setName] = useState(auth.user?.name);
    const [email, setEmail] = useState(auth.user?.email);
    const [newPassword, setNewPassword] = useState<string>('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>('');
    const [error, setError] = useState<string>('');


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            if (!checkPassword()) throw new Error('Check your passwords');

            [name, email, newPassword, newPasswordConfirmation].forEach(currentText => {
                if (!currentText) throw new Error('Fields are required');
            });

            await UserService.update({ name: name!, email: email!, password: newPassword });
            auth.logout();
            navigate('/');

        } catch(err: any) {
            setError(err.response.data.message);
        }

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
                            <Label size="small">New Password:</Label>
                            <Control>
                                <Input
                                    type="password"
                                    required
                                    name="password"
                                    value={newPassword}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}
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
                                    onChange={(event: ChangeEvent<HTMLInputElement>)  => setNewPasswordConfirmation(event.target.value)}
                                />
                            </Control>
                        </Field>
                        <Field>
                            <Control>
                                <Column.Group breakpoint="mobile">
                                    <Column className='buttons'>
                                        <Button color="primary" outlined>Edit User</Button>
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

export default EditUserForm;