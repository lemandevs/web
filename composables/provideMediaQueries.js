export default () => {
  const mobileMediaQuery = window.matchMedia('(max-width: 768px)')
  const desktopMediaQuery = window.matchMedia('(min-width: 769px)')
  const mobile = ref(mobileMediaQuery.matches)
  const desktop = ref(desktopMediaQuery.matches)
  onMounted(() => {
    window
      .matchMedia('(max-width: 768px)')
      .addEventListener('change', (event) => {
        mobile.value = event.matches
      })
    window
      .matchMedia('(min-width: 769px)')
      .addEventListener('change', (event) => {
        desktop.value = event.matches
      })
  })
  return {
    mobile,
    desktop,
  }
}
