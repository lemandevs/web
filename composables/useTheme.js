export default () => {
  const theme = computed({
    get() {
      if (process.client) {
        if (localStorage.theme) {
          return localStorage.theme
        }
      }
      return 'dark'
    },
    set(theme) {
      localStorage.theme = theme
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
  })

  return { theme }
}
