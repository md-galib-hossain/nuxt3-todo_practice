// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      api: process.env.NUXT_PUBLIC_API,
    },
  },
  app: {
    head: {
      title: "Todo App",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{
        rel: 'shortcut icon',
        href: 'https://api.iconify.design/logos:todoist-icon.svg'
      }]
    },
  },
});
