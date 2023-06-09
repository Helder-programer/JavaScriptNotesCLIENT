import React from "react";
import { Navbar, Container, Column } from 'rbx';
import LogoImage from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import '../../styles/header.scss';
import { useAuth } from "../../contexts/auth/useAuth";

function Header() {
    const auth = useAuth();




    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <Link to={!auth.user ? '/' : ''}>
                        <img src={LogoImage} />
                    </Link>
                    <Navbar.Burger
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbar-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Navbar.Burger>
                </Navbar.Brand>

                {
                    auth.user ?
                        <Navbar.Menu id="navbar-menu">
                            <Navbar.Segment as="div" className="navbar-item navbar-end" align="end">
                                <Column.Group>
                                    <Column>
                                        <Link to="/notes" className="button is-outlined is-primary">Your Notes</Link>
                                    </Column>
                                </Column.Group>
                            </Navbar.Segment>
                        </Navbar.Menu>
                        :
                        <Navbar.Menu id="navbar-menu">
                            <Navbar.Segment as="div" className="navbar-item navbar-end" align="end">
                                <Column.Group>
                                    <Column>
                                        <Link to="/register" className="button is-white has-text-primary">Register</Link>
                                    </Column>
                                    <Column>
                                        <Link to="/login" className="button is-outlined is-primary">Login</Link>
                                    </Column>
                                </Column.Group>
                            </Navbar.Segment>
                        </Navbar.Menu>

                }
            </Container>
        </Navbar>
    );
}


export default Header;