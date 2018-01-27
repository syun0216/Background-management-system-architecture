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
  console.log(props)
  const {getFieldDecorator,getFieldsError,getFieldError,isFieldTouched} = props.form
  // Only show error after a field is touched.
   const userNameError = isFieldTouched('userName') && getFieldError('userName');
   const passwordError = isFieldTouched('password') && getFieldError('password');
  function handelSubmit(){
    // e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // props.userLogin('admin')
        // props.history.replace('/')
        user_login(values.userName,md5(values.password)).then(data => {
          if(!data.data.code){
            props.userLogin(data.data.data[0])
            props.history.replace('/')
          }
        })
      }
    });
  }
  return (
    <div className="login_container">
      <Form className="login-form" onSubmit={handelSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={handelSubmit} className="login-form-button">登录</Button>
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
