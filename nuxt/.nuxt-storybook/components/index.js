import { wrapFunctional } from './utils'

export { default as LoginCard } from '../..\\components\\loginCard.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'

export const LazyLoginCard = import('../..\\components\\loginCard.vue' /* webpackChunkName: "components/login-card" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyVuetifyLogo = import('../..\\components\\VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
