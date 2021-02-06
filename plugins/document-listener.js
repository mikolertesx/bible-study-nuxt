export const listenToDocument = () => {
  if (process.server) return
  action()
  window.removeEventListener('resize', action)
  window.addEventListener('resize', action)
}

const action = () => {
  const vh = window.innerHeight
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

listenToDocument()
