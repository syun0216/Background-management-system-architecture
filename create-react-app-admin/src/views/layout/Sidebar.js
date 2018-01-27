import React from 'react'
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
  console.log(props.sidebarData);
  return (
    <div>
      {props.sidebarData.map(item => (
        <p>{item.name}</p>
      ))}
    </div>
    // <Sider trigger={null} collapsible="collapsible" collapsed={state.collapsed}>
    //   <div className="logo"/>
    //   <Menu theme="dark" mode="inline">
    //     {/* {
    //       props.sidebartData.map((item,idx) => (
    //         item.children.length>0? (
    //           <SubMenu key={idx} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
    //             <MenuItemGroup key="g1">
    //                 <Menu.Item key="123">123</Menu.Item>
    //             </MenuItemGroup>
    //           </SubMenu>
    //         ) :
    //         (
    //           <Menu.Item key={item.id}>
    //             {item.name}
    //           </Menu.Item>
    //         )
    //       ))
    //     } */}
    //     <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
    //       <MenuItemGroup key="g1" title="Item 1">
    //         <Menu.Item key="1">Option 1</Menu.Item>
    //         <Menu.Item key="2">Option 2</Menu.Item>
    //       </MenuItemGroup>
    //       <MenuItemGroup key="g2" title="Item 2">
    //         <Menu.Item key="3">Option 3</Menu.Item>
    //         <Menu.Item key="4">Option 4</Menu.Item>
    //       </MenuItemGroup>
    //     </SubMenu>
    //     <Menu.Item key="3">
    //       <Icon type="upload"/>
    //       <span>nav 3</span>
    //     </Menu.Item>
    //   </Menu>
    // </Sider>
  )
}
// Sidebar.defaultProps = {
//   sidebartData: []
// }
Sidebar.propTypes = {
  sidebartData:PropTypes.array,
  getCurrentMenu:PropTypes.func
}
export default Sidebar
