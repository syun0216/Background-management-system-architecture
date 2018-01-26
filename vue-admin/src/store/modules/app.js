import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      raw_data: null,
      data: null
    },
    visitedViews: [],
    currentTheme: localStorage.getItem('currentTheme') != null ? localStorage.getItem('currentTheme') : 'custom-blue'
  },
  mutations: {
    ADD_SIDEBAR_DATA: (state, data) => {
      state.sidebar.data = data.data
      state.sidebar.raw_data = data.raw_data
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    },
    CHANGE_THEME: (state, data) => {
      // console.log(111, data)
      state.currentTheme = data
    }
  },
  actions: {
    addSideBarData: ({ commit }, raw_data) => {
      commit('ADD_SIDEBAR_DATA', raw_data)
    },
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    changeTheme: ({ commit }, currentTheme) => {
      commit('CHANGE_THEME', currentTheme)
    }
  }
}

export default app
