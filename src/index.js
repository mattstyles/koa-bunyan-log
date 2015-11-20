
'use strict'

const Bunyan = require( 'bunyan' )

/**
 * Instantiates a logger
 * @class
 */
module.exports = class Logger extends Bunyan {
  /**
   * @constructs
   * @param opts <Object> passed straight through to bunyan.Logger
   */
  constructor( opts ) {
    super( Object.assign({
      name: 'koa'
    }, opts || {} ))
  }

  /**
   * Attaches the log instance to the koa instance
   * @returns generator function for koa middleware
   */
  attach() {
    const logger = this
    return async function( ctx, next ) {
      if ( ctx.logger ) {
        console.warn( 'ctx.logger already exists' )
        await next()
        return
      }

      ctx.logger = logger

      await next()
    }
  }

  /**
   * Basic request log middleware
   * @param opts <Object> options hash
   * @returns generator function for koa middleware
   */
  attachRequest( opts ) {
    const logger = this
    return async function( ctx, next ) {
      let start = Date.now()

      logger.info({
        event: 'request',
        method: ctx.method,
        url: ctx.url
      })

      await next()

      logger.info({
        event: 'response',
        method: ctx.method,
        url: ctx.originalUrl,
        status: ctx.status,
        delta: Date.now() - start
      })
    }
  }

}
