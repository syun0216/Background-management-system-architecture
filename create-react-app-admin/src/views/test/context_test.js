import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Button} from 'antd';
class ListChildItem extends Component {
  static contextTypes = {
    title: PropTypes.string
  }
  render = () => (
    <p>{this.context.title}</p>
  )
}
class ListItem extends Component {
  static contextTypes = {
    title: PropTypes.string
  }
  componentDidMount(){
    // document.querySelector('#btn-click').addEventListener(function(e) {
    //   console.log(123);
    // })
  }
  render = () => (
    <div>{this.context.title}
      <Button id="btn-click"> click</Button>
      <ListChildItem />
    </div>
  )
}

export default class List extends Component {
  static childContextTypes = {
    title: PropTypes.string
  }

  getChildContext() {
    return {
      title: '测试context'
    }
  }

  render = () => (
    <div>
      <ListItem />
    </div>
  )
}