import { computed } from 'vue'

export default function () {
  const language = ref(localStorage.getItem('language') || 'es')
  const setLanguage = function (newLanguage) {
    debugger
    if (process.client) {
      language.value = newLanguage
      localStorage.setItem('language', newLanguage)
    }
  }
  return {
    language,
    setLanguage,
  }
}
