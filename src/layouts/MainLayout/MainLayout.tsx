import React, { FC } from 'react';
import { Layout } from '@douyinfe/semi-ui';

import ErrorBoundary from '~/containers/ErrorBoundary';

// components
import NavBar from './NavBar';

const MainLayout: FC = ({ children }) => {
  const { Header, Content } = Layout;
  return (
    <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
      <Header>
        <NavBar />
      </Header>
      <Content
        style={{
          marginTop: 60,
          marginBottom: 20,
          padding: '10px 0 20px 0',
          height: 'calc(100vh - 80px)',
          overflowY: 'scroll'
        }}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Content>
    </Layout>
  );
};

export default MainLayout;
