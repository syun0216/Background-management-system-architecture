import React,{Component,PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Layout,Menu,Icon} from 'antd'
import {Link} from 'react-router-dom';
const {Sider} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup


export default class Sidebar extends PureComponent {
  state = {
    collapsed: false
  }

  _route_link = (item) => {
    console.log(item)
  }

  render() {
    return (
      <Sider trigger={null} collapsible="collapsible" collapsed={this.props.isCollapsed}>
        <div className="logo"/>
        <Menu theme="dark" mode="inline">
          {
            this.props.sidebarData.map((item,idx) => (
              item.children.length > 0 ?
              (<SubMenu key={idx} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
                {/* <MenuItemGroup> */}
                  { item.children.map((citem,cidx) => (
                      <Menu.Item key={cidx}>
                        <Link to={citem.route_path}>{citem.name}</Link>
                      </Menu.Item>
                  )) }
                {/* </MenuItemGroup> */}
              </SubMenu>) :
              (
                // <Link to={item.route_path}>
                  <Menu.Item key={idx}>
                    <Link to={item.route_path}>
                      <span><Icon type="mail" /><span>{item.name}</span></span>
                    </Link>
                  </Menu.Item>
                // </Link>
              )
            ))
          }
          {/* {
            props.sidebartData.map((item,idx) => (
              item.children.length>0? (
                <SubMenu key={idx} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
                  <MenuItemGroup key="g1">
                      <Menu.Item key="123">123</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              ) :
              (
                <Menu.Item key={item.id}>
                  {item.name}
                </Menu.Item>
              )
            ))
          } */}
        </Menu>
      </Sider>
    )
  }
}
Sidebar.defaultProps = {
  isCollapsed: false
}
Sidebar.propTypes = {
  sidebartData:PropTypes.array,
  getCurrentMenu:PropTypes.func,
  isCollapsed: PropTypes.bool
}

