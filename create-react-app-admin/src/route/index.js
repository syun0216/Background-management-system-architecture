import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
// component
import Login from '../views/login/index'
import Layout from '../views/layout/index'
// utils
import {getToken} from '../utils/auth'
// redux
import {connect} from 'react-redux'

const PrivateRoute = ({
  component: Component,
  ...rest
}) => (<Route {...rest} render={(props) => (
    rest.isLogin
    ? <Component {...props}/>
    : <Redirect to="/login"/>)}/>)

const Routes = (props) => {
  let isLogin = typeof getToken() !== 'undefined'
  // console.log(getToken())
  // console.log(isLogin)
  if (isLogin) {
    props.userLogin(getToken())
  }

  return (<Switch>
    <Route exact path="/" render={() => (
        !isLogin
        ? (<Redirect to="/login"/>)
        : (<Layout/>))}/>
    <Route exact path="/login" render={() => (
      isLogin ? (<Redirect to="/"/>):(<Login />)
    )}/>
    {/* <PrivateRoute component={Layout} path="/" isLogin={isLogin}/> */}
    <Route render={() => (
      isLogin ? (<h1>404 not found</h1>) : (<Redirect to="/login"/>)
    )}/>
  </Switch>)
};

const mapStateToProps = (state) => {
  return {user: state.auth.user_token}
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (token) => dispatch({type: 'USER_LOGIN', user: token})
  }
}

// 子组件里用到withRouter而在总的父容器里没有包裹这个withRouter将会导致子组件url跳转之后页面没有
// 刷新 导致出现空白页
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes))
