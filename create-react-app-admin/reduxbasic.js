const redux = require('redux')

const initialState = {
  couter:0
}

const rootReducer = (state=initialState,action) => {
  switch(action.type){
    // 不要修改 state。 使用 Object.assign() 新建了一个副本。不能这样使用 Object.assign(state, { visibilityFilter: action.filter })，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 { ...state, ...newState } 达到相同的目的。
    case "INC": return Object.assign({},state,{couter:state.couter+1});
    case "ADD": return {
      ...state,
      couter: state.couter + action.value
    }
    default:return state
  }
}



var store = redux.createStore(rootReducer)
console.log(store.getState())

store.subscribe(() => {
  console.log('sub',store.getState())
})

store.dispatch({type:'INC'})
store.dispatch({type:'ADD',value:10})
