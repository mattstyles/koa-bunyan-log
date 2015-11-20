
'use strict'

const http = require( 'http' )
const tape = require( 'tape' )
const Koa = require( 'koa' )
const request = require( 'supertest' )

const Logger = require( '../src' )


tape( 'Attaching the logger should append the logger to the context', t => {
  t.plan( 1 )

  const app = new Koa()
  const logger = new Logger()

  app.use( logger.attach() )
  app.use( ctx => {
    t.ok( ctx.logger, 'Logger has been attached to context' )
  })

  const srv = http.createServer( app.callback() ).listen()

  request( srv )
    .get( '/' )
    .end( () => srv.close() )

})
