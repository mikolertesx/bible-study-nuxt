export const state = () => {
  return {
    token: null,
    username: null,
  }
}

export const mutations = {
  setLogin(state, { username, token }) {
    state.username = username
    state.token = token
  },
}

export const actions = {
  login({ commit }, { username, token }) {
    localStorage.setItem('username', username)
    localStorage.setItem('token', token)
    commit('setLogin', { username, token })
  },
  logoff({ commit }) {
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    commit('setLogin', { username: null, token: null })
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.token !== null && state.username !== null
  },
  username(state, getters) {
    if (getters.isLoggedIn) {
      return state.username
    } else {
      return null
    }
  },
  token(state, getters) {
    if (getters.isLoggedIn) {
      return state.token
    } else {
      return null
    }
  },
}
