import React, {Component} from 'react'
import {Layout, Menu, Icon,Button} from 'antd'
// api
import {get_net_menu} from '../../api/navigation'
import {user_logout} from '../../api/user'
// component
import Sidebar from './Sidebar'


import ContextTest from '../test/context_test'
import EventContainer from '../test/eventemitter'
import ImutableText from '../test/immutable_test'
import Company_news from '../companynews/index'
import Company_jobs from '../companyjobs/index'
//withRouter
import {withRouter,Route,Switch} from 'react-router-dom'
//redux
import {connect} from 'react-redux'
//style
import './index.scss'
import './index.css'
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
      if(data.data.code === 200) {
        this.setState({
          netMenuData:data.data.data
        })
      }
    })
  }
  handelLogout = () => {
    user_logout().then(data => {
      if(data.data.code === 200) {
        this.props.userLogout()
        this.props.history.replace('/login')
      }
    })
  }
  // common function
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  getCurrentMenu(menu) {
    console.log(menu)
  }
  render() {
    return (<Layout>
      {this.state.netMenuData != null ? <Sidebar sidebarData={this.state.netMenuData} isCollapsed={this.state.collapsed} getCurrentMenu={this.getCurrentMenu} {...this.props}/> : null}
      <Layout>
        <Header style={{
            background: '#fff',
            padding: 0
          }}>
          <Icon className="trigger" type={this.state.collapsed
              ? 'menu-unfold'
              : 'menu-fold'} onClick={this.toggle}/>
          <Button className="logout" type="primary" onClick={this.handelLogout}>登出</Button>
        </Header>
        <Content style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: '100vh'
          }}>
          <Route path="/dispatch/news" component={Company_news}/>
          <Route path="/dispatch/jobs" component={Company_jobs}/>
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
