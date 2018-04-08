import React, { Component } from 'react'

import emitter from './event'
import Button from 'antd';

class EventItem extends Component {
  clickfunc() {
    emitter.emit('btnclick', 123)
  }
  render = () => (
    <button onClick={this.clickfunc.bind(this)}>click me</button>
  )
}

export default class EventContainer extends Component {
  componentDidMount = () => {
    emitter.addListener('btnclick',(msg,data) => {
      console.log('msg',msg)
      console.log('data',data)
    })
  };
  
  render = () => (
    <div><EventItem /></div>
  )
}
