import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../../../contexts/auth/useAuth.js';
import { Button, Field, Control, Input, Column, Help, Label } from "rbx";
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const auth = useAuth();


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            await auth.authenticate(email, password);
            navigate('/notes');
        } catch (err: any) {
            console.log(err);
            setError(err.response.data.message);
        }
    }

    return (
        <>
            <Column.Group centered>
                <form onSubmit={handleSubmit} className='auth-form'>
                    <Column size={12}>
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
                                            onClick={event => navigate('/register')}
                                        >Register or</a>
                                        <Button color="primary" outlined>Login</Button>
                                    </Column>
                                </Column.Group>
                            </Control>
                        {error && <Help color="danger">Error: {error}</Help>}
                        </Field>
                    </Column>
                </form>
            </Column.Group>
        </>
    );
}

export default LoginForm;