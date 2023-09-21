const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')


// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    // when `next build` or `npm run build` is used
    const isStaging =
      phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
  
    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)
  
    const env = {
      apiBaseURI: (() => {
        if (isDev) return 'http://localhost:4000'
        if (isProd) {
          return 'https://bcarddev.tuldok.dev'
        }
        if (isStaging) return 'http://localhost:11639'
        return ''
      })()
    }
  
    // next.config.js object
    return {
      env,
    }
}