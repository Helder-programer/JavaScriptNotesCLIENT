import React, { Dispatch, SetStateAction, useState } from 'react';
import { Navbar, Column, Button, Dropdown } from 'rbx';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

import LogoImage from '../../assets/images/logo-white.png';
import UserService from '../../services/users/users';
import { useAuth } from '../../contexts/auth/useAuth';
import "../../styles/header.scss";

interface IProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function HeaderLogged({ setIsOpen }: IProps) {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        auth.logout();
        navigate('/');
    }

    const deleteAccount = async () => {
        let confirmDeleteUser = window.confirm('Deseja mesmo apagar sua conta?');

        if (!confirmDeleteUser) return;
        await UserService.deleteAccount();
        logout();
        navigate('/');
    }

    return (
        <Navbar color="primary" className="navbar-logged">
            <Navbar.Brand>
                <Column.Group>
                    <Column size={11} offset={1}>
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
                <Navbar.Segment as="div" className="navbar-item navbar-end" align="end">
                    <Navbar.Item as="div">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Button className="button" color="white" outlined>
                                    <span id='current-user'><FaUserAlt />{auth.user?.name ? auth.user?.name.toUpperCase() : ''}</span>
                                </Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Content id='user-dropdown'>
                                    <Dropdown.Item as="div">
                                        <Link to="/users/edit">User Edit</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div">
                                        <a href="#" onClick={event => logout()}>LogOut</a>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item as="div">
                                        <a href="#" id='delete-account-button' onClick={() => deleteAccount()}>Delete your user</a>
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