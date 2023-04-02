import React, { useState } from 'react';
import Header from "../../../components/header";
import { Column, Section, Title, Container, Card } from "rbx";
import LogoImage from '../../../assets/images/logo.png';
import EditUserForm from '../../../components/auth/editUserForm';
import "../../../styles/auth.scss";

function UserEditScreen() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));


    return (
        <>
            <Header />
            <Section size="small" className="auth">
                <Container>
                    <Column.Group centered>
                        <Column size={4}>
                            <Card className='auth-card'>
                                <Card.Content>

                                    <Section>
                                        <Column.Group centered>
                                            <Column size={10}>
                                                <img src={LogoImage} />
                                            </Column>
                                        </Column.Group>

                                        <Column.Group>
                                            <Column size={12}>
                                                <Title size={4} className="has-text-grey has-text-centered">
                                                    Edit your user
                                                </Title>
                                            </Column>
                                        </Column.Group>
                                        <EditUserForm user={currentUser}/>
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

export default UserEditScreen;