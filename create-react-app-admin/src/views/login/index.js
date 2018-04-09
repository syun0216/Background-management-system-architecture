import React from 'react'
import styles from './index.scss'
// app
import {user_login} from '../../api/user'
// react-redux
import {connect} from 'react-redux'
// react-router
import {withRouter} from 'react-router-dom'
// ui component
import {Icon,Button,Row,Form,Input} from 'antd'
import md5 from 'js-md5'
const FormItem = Form.Item
const Login = (props) => {
  // console.log(props)
  const {getFieldDecorator,getFieldsError,getFieldError,isFieldTouched} = props.form
  // Only show error after a field is touched.
   const userNameError = isFieldTouched('userName') && getFieldError('userName');
   const passwordError = isFieldTouched('password') && getFieldError('password');
   window.onload = function() {
     console.log(document.querySelector('#login-btn'))
     document.querySelector('#login-btn').addEventListener('keydown', function(e) {
       let key = e.which || e.keyCode;
       console.log(2354)
       if(key === 13) {
         handelSubmit()
       }
     })
   }
  function handelSubmit(){
    // e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // props.userLogin('admin')
        // props.history.replace('/')
        // if(values.userName === '123' && values.password === '123') {
        //   props.userLogin('123')
        //     props.history.replace('/')
        // }
        user_login(values.userName,values.password).then(data => {
          if(data.data.code === 200){
            props.userLogin(data.data.data[0].account)
            props.history.replace('/system')
          }
        })
      }
    });
  }
  return (
    <div className="login_container">
      <h2 className="login_title">前海数据官网管理系统</h2>
      <Form className="login-form" onSubmit={handelSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="此处输入用户名" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="此处输入密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" id="login-btn" tabIndex="0" onClick={handelSubmit} className="login-form-button">登录</Button>
        </FormItem>
      </Form>
    </div>
  )
}

// Login = Form.create()(Login)

const mapStateToProps = (state) => {
  return {
    user:state.auth.user_token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (token) => dispatch({type:'USER_LOGIN',user:token})
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Form.create()(Login)))
