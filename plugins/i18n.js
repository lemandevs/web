export default function ({ app }) {
  // onBeforeLanguageSwitch called right before setting a new locale
  app.i18n.onBeforeLanguageSwitch = (
    oldLocale,
    newLocale,
    isInitialSetup,
    context
  ) => {
    debugger
    console.log(oldLocale, newLocale, isInitialSetup)
  }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    debugger
    console.log(oldLocale, newLocale)
  }
}
