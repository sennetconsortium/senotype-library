import React from 'react';
import { Layout} from 'antd';
import AppNavBar from './AppNavBar';
import AppFooter from './AppFooter';
import { Container } from 'react-bootstrap';
import THEME from '@/lib/theme';
const { Content } = Layout;


const BasicLayout = ({children}) => {

  return (
    <Layout style={THEME.layout.style}>
      <AppNavBar />
      <Container>
        <Content style={THEME.content.style}>
            {children}
        </Content>
      </Container>
      <AppFooter />
    </Layout>
  );
};
export default BasicLayout;