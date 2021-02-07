export default function ({ store }) {
  if (process.server) return
  window.onNuxtReady(() => {
    store.dispatch('auth/login', {
      username: localStorage.getItem('username'),
      token: localStorage.getItem('token'),
    })
  })
}
