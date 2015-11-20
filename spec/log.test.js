
'use strict'

const http = require( 'http' )
const tape = require( 'tape' )
const Koa = require( 'koa' )
const request = require( 'supertest' )

const Logger = require( '../src' )

class CaptureStream {
  constructor( recs ) {
    this.recs = recs
  }
  write( data ) {
    this.recs.push( data )
  }
}

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


tape( 'Ctx.logger should be capable of logging', t => {
  t.plan( 2 )

  var recs = []

  const app = new Koa()
  const logger = new Logger({
    streams: [
      {
        stream: new CaptureStream( recs )
      }
    ]
  })

  app.use( logger.attach() )
  app.use( ctx => {
    ctx.logger.info( 'Foo' )
  })

  const srv = http.createServer( app.callback() ).listen()

  request( srv )
    .get( '/' )
    .end( () => {
      var msg
      try {
        msg = JSON.parse( recs[ 0 ] )
      } catch ( err ) {
        console.error( err )
        t.end( 'Something went horribly wrong' )
      }

      t.equals( msg.name, 'koa', '\'koa\' is the default namespace' )
      t.equals( msg.msg, 'Foo', 'Message is logged' )
      srv.close()
    })
})

tape( 'The instance attached to context can be defined', t => {
  t.plan( 2 )

  const app = new Koa()
  const logger = new Logger()

  app.use( logger.attach({
    as: 'myLog'
  }) )
  app.use( ctx => {
    t.ok( ctx.myLog, 'Custom log variable name has been attached' )
    t.equal( typeof ctx.myLog.info, 'function', 'Logger has an info function' )
  })

  const srv = http.createServer( app.callback() ).listen()

  request( srv )
    .get( '/' )
    .end( () => srv.close() )
})
