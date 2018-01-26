import React, {Component} from 'react'
import {Layout, Menu, Icon,Button} from 'antd'
// api
import {get_net_menu} from '../../api/navigation'
import {user_logout} from '../../api/user'
// component
import Sidebar from './Sidebar'
//withRouter
import {withRouter} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//style
import './index.scss'
const {Header, Sider, Content} = Layout

class AppLayout extends Component {
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  handelLogout = () => {
    user_logout().then(data => {
      if(!data.data.code) {
        this.props.userLogout()
        this.props.history.replace('/login')
      }
    })
  }
  componentDidMount() {
    console.log('layout',this.props)
    // get_net_menu().then(data => {
    //   console.log(data)
    // })
  }
  render() {
    return (<Layout>
      <Sider trigger={null} collapsible="collapsible" collapsed={this.state.collapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user"/>
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera"/>
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload"/>
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{
            background: '#fff',
            padding: 0
          }}>
          <Icon className="trigger" type={this.state.collapsed
              ? 'menu-unfold'
              : 'menu-fold'} onClick={this.toggle}/>
        </Header>
        <Content style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: '100vh'
          }}>
          <Button type="primary" onClick={this.handelLogout}>logout</Button>
        </Content>
      </Layout>
    </Layout>)
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user_token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch({type:'USER_LOGOUT'})
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AppLayout))
