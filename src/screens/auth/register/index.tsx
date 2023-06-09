import React from 'react';
import Header from "../../../components/header";
import RegisterForm from '../../../components/auth/registerForm';
import { Column, Section, Title, Container, Card } from "rbx";
import LogoImage from '../../../assets/images/logo.png';
import "../../../styles/auth.scss";


function RegisterScreen() {
    return (
        <>
            <Header />
            <Section className="auth columns is-vcentered">
                <Container>
                    <Column.Group centered className='auth-container'>
                        <Column size={4}>
                            <Card className='auth-card fadein'>
                                <Card.Content>
                                    <Section>
                                        <Column.Group centered>
                                            <Column size={10}>
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
                                        <RegisterForm/>
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

export default RegisterScreen;