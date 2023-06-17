import React from 'react';
import Header from "../../../components/header";
import { Column, Section, Title, Container, Card } from "rbx";
import LogoImage from '../../../assets/images/logo.png';
import LoginForm from "../../../components/auth/loginForm";
import "../../../styles/auth.scss";


function LoginScreen() {
    return (
        <>
            <Header />
            <Section className="auth columns is-vcentered">
                <Container>
                    <Column.Group centered>
                        <Column size={4}>
                            <Card className='auth-card fadein'>
                                <Card.Content>

                                    <Section>
                                        <Column.Group centered>
                                            <Column style={{ display: 'flex', justifyContent: 'center' }}>
                                                <img src={LogoImage} />
                                            </Column>
                                        </Column.Group>

                                        <Column.Group>
                                            <Column size={12}>
                                                <Title size={6} className="has-text-grey has-text-centered">
                                                    Your notes on the cloud
                                                </Title>
                                            </Column>
                                        </Column.Group>
                                        <LoginForm />
                                    </Section>
                                </Card.Content>
                            </Card>
                        </Column>
                    </Column.Group>
                </Container>
            </Section>
        </>
    );
}

export default LoginScreen;