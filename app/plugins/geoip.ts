import geoip from 'geoip-lite'

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            geoip: geoip
        }
    }
})