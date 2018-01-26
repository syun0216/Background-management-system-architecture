import React from 'react'
import PropTypes from 'prop-types'
import {Layout} from 'antd'
const {Sider, Menu, Icon} = Layout
const Sidebar = ({title}) => {
  return (
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
  )
}
Sidebar.defaultProps = {
}
Sidebar.propTypes = {
}
export default Sidebar
