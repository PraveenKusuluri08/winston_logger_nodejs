const applicationLogger = require("./applicationLogger")
let logger = null


if (process.env.NODE_ENV !== 'production') {
    logger = applicationLogger()
  }

  module.exports =logger