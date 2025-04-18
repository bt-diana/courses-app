import Header from '../Header/Header';
import { default as AntdLayout, Content } from 'antd/es/layout/layout';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <AntdLayout className="layout">
      <Header />
      <Content className="content">{children}</Content>
    </AntdLayout>
  );
};

export default Layout;
