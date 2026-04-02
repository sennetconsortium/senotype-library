import React, {useState, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from "next/image";
import { Layout } from 'antd';
import ENVS from '@/lib/envs';
import AppContext from '@/context/AppContext';

const { Content, Sider } = Layout;

function AppNavBar() {
  const {authInfo} = useContext(AppContext)
  return (
    <Navbar expand="lg" className="c-header" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image
              alt={ENVS.app.name}
              src="/imgs/editor.png"
              width="30"
              height="30"
              className="w-fixed d-inline-block align-top"
            />{' '}
            <span>{ENVS.app.name}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
            <NavDropdown title={authInfo.name} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">{new Date().toLocaleDateString()}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;