import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  buildModules: ['@intlify/nuxt3'],
  css: ['~/assets/styles/app.scss'],
  plugins: [{ src: '~/plugins/i18n.js' }],
  intlify: {
    localeDir: 'locales/messages',
    vueI18n: {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'es',
      availableLocales: ['es', 'en'],
    },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Español',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'my_custom_cookie_name',
    },
  },
})
