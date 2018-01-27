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
    netMenuData: null
  }
  componentWillMount() {
    this.getNetMenu()
  }
  // api
  getNetMenu() {
    get_net_menu().then(data => {
      if(!data.data.code) {
        this.setState({
          netMenuData:data.data.data
        })
      }
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
  // common function
  getCurrentMenu(menu) {
    console.log(menu)
  }
  render() {
    return (<Layout>
      {this.state.netMenuData != null ? <Sidebar sidebarData={this.state.netMenuData} getCurrentMenu={this.getCurrentMenu} {...this.props}/> : null}
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
