import React, { Component } from 'react';
// import Perf from 'react-addons-perf'

import {Map} from 'immutable'

export default class ImutableText extends Component{
  state = {
    data1: Map({time:0}),
    time:0
  }
  componentWillMount = () => {
    // Perf.start()
  }
  
  componentDidMount = () => {
    // Perf.stop()
    this.handleAdd()
  };
  
  handleAdd = () => {
    this.setState({
      // data1:this.state.data1.update('time', v => v+1),
     time:this.state.time + 1
    })
    // console.log(this.state.data1.get('time'))
    console.log(this.state.time)
  }
  render = () => (
    <div>{this.state.time}
      <button onClick={this.handleAdd}>changetime</button>
    </div>
  )
}

// let a = Map({
//   select: 'user',
//   filter: Map({name:'Cam'})
// })

// let b = a.set('select','people')
// console.log(123,a === b)
// console.log(a.get('filter') === b.get('filter'))