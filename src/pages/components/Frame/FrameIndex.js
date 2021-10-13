import React from 'react'
import {Layout, Menu} from 'antd';
import {mainRouters} from '../../../routers/RouterIndex';
import {withRouter} from 'react-router-dom';
import './FrameIndex.css';

const {Header, Content, Footer, Sider} = Layout;

function DefaultLayout(props) {
    return (
        <Layout>
            <Sider>
                <div className="logo">
                    <p/>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.location.pathname]}>
                    {mainRouters.filter(r => r.show).map(r => {
                        return <Menu.Item key={r.path} onClick={p => props.history.push(p.key)}>
                            {r.icon}{r.title}
                        </Menu.Item>
                    })}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}>

                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>Sugar - Personal property accounting system</Footer>
            </Layout>
        </Layout>
    )
}

export default withRouter(DefaultLayout)
