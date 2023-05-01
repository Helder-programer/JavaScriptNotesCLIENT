import React, { useState } from 'react';
import { Navbar, Column, Button, Dropdown } from 'rbx';
import LogoImage from '../../assets/images/logo-white.png';
import "../../styles/header.scss";
import UserService from '../../services/users';
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FaUserAlt } from 'react-icons/fa';



function HeaderLogged({ setIsOpen }) {
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const logOut = async () => {
        UserService.logout();
        setRedirectToHome(true);
    }

    const deleteUser = async event => {
        let confirmDeleteUser = window.confirm('Deseja mesmo apagar sua conta?');

        if (!confirmDeleteUser) return;
        await UserService.delete();
        UserService.logout();
        setRedirectToHome(true);
    }

    if (redirectToHome) return <Navigate to='/' />

    return (
        <Navbar color="custom-purple" className="navbar-logged">
            <Navbar.Brand>
                <Column.Group>
                    <Column size="11" offset="1">
                        <Link to="/">
                            <img src={LogoImage} />
                        </Link>
                    </Column>
                </Column.Group>
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

            <Navbar.Menu>
                <Navbar.Segment as="div" className="navbar-item navbar-start" align="start">
                    <Navbar.Item as="div">
                        <Button
                            className="open-button"
                            color="white"
                            outlined
                            onClick={() => setIsOpen(true)}
                        >
                            <FontAwesomeIcon icon={faList} />
                        </Button>
                    </Navbar.Item>
                </Navbar.Segment>
                <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
                    <Navbar.Item as="div">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button className="button" color="white" outlined>
                                    <span id='current-user'><FaUserAlt />{user.name.toUpperCase()}</span>
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Content id='user-dropdown'>
                                    <Dropdown.Item as="div">
                                        <Link to="/users/edit">User Edit</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div">
                                        <a href="#" onClick={event => logOut()}>LogOut</a>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div">
                                        <a href="#" id='delete-account-button' onClick={event => deleteUser()}>Delete uour user</a>
                                    </Dropdown.Item>
                                </Dropdown.Content>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Item>
                </Navbar.Segment>
            </Navbar.Menu>
        </Navbar>
    )
}

export default HeaderLogged;