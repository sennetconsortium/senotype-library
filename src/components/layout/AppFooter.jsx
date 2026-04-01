import React from 'react'
import { Container } from 'react-bootstrap';
import { Layout } from 'antd';
const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer className='c-footer bg-light'>
        <Container>
          <div>
            <a href="https://github.com/sennetconsortium/senotype_editor">The Senotype Editor</a>&nbsp; © <span id="current-year"> {new Date().getFullYear()} </span> by
           &nbsp;
            <a href="https://www.dbmi.pitt.edu/">Department of Biomedical Informatics, University of Pittsburgh</a>
            &nbsp; is licensed under&nbsp;
            <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</a>
        </div>
        </Container>
    </Footer>
  )
}

export default AppFooter