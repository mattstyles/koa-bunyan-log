
'use strict'

const Koa = require( 'koa' )
const Logger = require( '../lib' )
const convert = require( 'koa-convert' )

const app = new Koa()
const logger = new Logger()

/**
 * Old v1 style, just use convert and carry on as normal
 */
app.use( convert( logger.attach() ) )

app.use( ctx => {
  logger.info( 'Hello Koa, with ❤︎ from Bunyan' )
  ctx.body = 'Log log'
})

let port = process.env.PORT || 3000
app.listen( port, () => console.log( `Listening on ${ port }` ) )
