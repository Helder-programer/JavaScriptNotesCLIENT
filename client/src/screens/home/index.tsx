import React from 'react';
import PresentationImage from '../../assets/images/presentation.png';
import Header from '../../components/header';
import { Column, Section, Title, Container } from 'rbx';
import { Link } from 'react-router-dom';
import '../../styles/home.scss';

function HomeScreen() {
    return (
        <>
            <Header/>
            <Section size="medium" className="home fadein columns is-vcentered">
                <Container>
                    <Column.Group>
                        <Column size={5} id="left-home">
                            <Title size={2} spaced className="has-text-white" id="page-title">
                                Welcome to JavascriptNotes!
                            </Title>
                            <Title size={5} className="has-text-white" id="page-subtitle">
                                Create notes easily and access when you wants on the cloud
                            </Title>

                            <Link id="page-button" className="button mgt-large is-outlined is-white is-large" to='/register'>
                                <strong>Register for free Now</strong>
                            </Link>
                        </Column>
                        <Column size={6} offset={1}>
                            <img src={PresentationImage} />
                        </Column>
                    </Column.Group>
                </Container>
            </Section>
        </>
    );
}

export default HomeScreen;