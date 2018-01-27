import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Layout,Menu,Icon} from 'antd'
const {Sider} = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup


const Sidebar = (props) => {
  const state = {
    collapsed: false
  }
  const toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  console.log(props);
  return (
    <Sider trigger={null} collapsible="collapsible" collapsed={props.collapsed}>
      <div className="logo"/>
      <Menu theme="dark" mode="inline">
        {
          props.sidebarData.map((item,idx) => (
            item.children.length > 0 ?
            (<SubMenu key={idx} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
              {/* <MenuItemGroup> */}
                { item.children.map((citem,cidx) => (
                  <Menu.Item key={cidx}>{citem.name}</Menu.Item>
                )) }
              {/* </MenuItemGroup> */}
            </SubMenu>) :
            (<Menu.Item key={idx}>{<span><Icon type="mail" /><span>{item.name}</span></span>}</Menu.Item>)
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
Sidebar.defaultProps = {
  isCollapsed: false
}
Sidebar.propTypes = {
  sidebartData:PropTypes.array,
  getCurrentMenu:PropTypes.func,
  isCollapsed: PropTypes.bool
}
export default Sidebar
