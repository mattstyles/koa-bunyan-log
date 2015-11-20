
'use strict'

const Koa = require( 'koa' )
const Logger = require( '../lib' )

const app = new Koa()
const logger = new Logger()

/**
 * Old v1 style, just use convert and carry on as normal
 */
//const convert = require( 'koa-convert' )
//app.use( convert( logger.attach() ) )

/**
 * New v2 style, just attach it
 */
app.use( logger.attach() )
app.use( logger.attachRequest() )

app.use( ctx => {
  ctx.logger.info( 'Hello Koa, with ❤︎ from Bunyan' )
  ctx.body = 'Log log'
})

let port = process.env.PORT || 3000
app.listen( port, () => console.log( `Listening on ${ port }` ) )
