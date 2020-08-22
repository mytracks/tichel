const { appendWebpackPlugin } = require('@rescripts/utilities')
const WebpackLicensePlugin = require('webpack-license-plugin')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = (config) => {
  if (true) {
    return appendWebpackPlugin(new WebpackLicensePlugin({}), config)
  }

  return config
}

// // .rescriptsrc.js
