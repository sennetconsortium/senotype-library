import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import AppNavBar from './AppNavBar';
import AppFooter from './AppFooter';
import { Container } from 'react-bootstrap';
import THEME from '@/lib/theme';
import AppSider from './AppSider';
const { Content } = Layout;

const FullLayout = ({ children, sider }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={THEME.layout.style}>
      <AppNavBar />
      <Container>
        <Breadcrumb
          className='mt-3 mb-3'
          items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        />
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          {!sider && <AppSider />}
          <Content style={THEME.content.style}>
            {children}
          </Content>
        </Layout>
      </Container>
      <AppFooter />
    </Layout>
  );
};
export default FullLayout;