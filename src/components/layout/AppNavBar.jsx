import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from "next/image";
import { Layout } from 'antd';

const { Content, Sider } = Layout;

function AppNavBar() {
  return (
    <Navbar className="c-header" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Image
              alt="Senotype Editor"
              src="/imgs/editor.png"
              width="30"
              height="30"
              className="w-fixed d-inline-block align-top"
            />{' '}
            <span>Senotype Editor</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {new Date().toLocaleDateString()}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;