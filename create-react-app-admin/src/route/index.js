import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
// component
import Login from '../views/login/index'
import Layout from '../views/layout/index'
import Company_news from '../views/companynews/index'
import Company_jobs from '../views/companyjobs/index'
// utils
import {getToken} from '../utils/auth'
// redux
import {connect} from 'react-redux'

const Routes = (props) => {
  let isLogin = typeof getToken() !== 'undefined'
  // console.log(getToken())
  // console.log(isLogin)
  if (isLogin) {
    props.userLogin(getToken())
  }

  return (<Switch>
    <Route exact path="/login" render={() => (
      isLogin ? (<Redirect to="/"/>):(<Login />)
    )}/>
    <Route exact path="/" render={() => (
      !isLogin ? (<Redirect to="/login"/>) : (<Layout/>)
    )} />
    <Layout>
      <Route path="/dispatch/news" component={Company_news}/>    
      <Route path="/dispatch/jobs" component={Company_jobs}/>    
    </Layout>
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
