import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js' },
    ],
  },
  buildModules: ['@intlify/nuxt3'],
  css: ['~/assets/styles/app.scss'],
  plugins: [{ src: '~/plugins/i18n.js' }],
  intlify: {
    localeDir: 'locales/messages',
    vueI18n: {
      fallbackLocale: 'es',
      availableLocales: [
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
        {
          code: 'it',
          iso: 'it-IT',
          name: 'Italiano',
        },
        {
          code: 'pt',
          iso: 'pt-PT',
          name: 'Português',
        },
      ],
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'my_custom_cookie_name',
      },
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
      {
        code: 'it',
        iso: 'it-IT',
        name: 'Italiano',
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        name: 'Português',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'my_custom_cookie_name',
    },
  },
})
