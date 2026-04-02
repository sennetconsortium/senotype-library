import React from 'react';
import { QuestionCircleOutlined, } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import AppContext from '@/context/AppContext';
import EditorLibrary from '../EditorLibrary';
const { Content, Sider } = Layout;

function AppSider({}) {


  const items = [
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: 'Help',
      children: [
        {
          key: 'documentation',
          label: 'Documentation'
        }
      ],
    }
  ]

  return (
    <div>
      <Sider breakpoint="lg" collapsedWidth="0" width={400}>
        <EditorLibrary />
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items}
            />
          </Sider>
    </div>
  )
}

export default AppSider