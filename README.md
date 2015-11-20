
# koa-bunyan-log

> Yet another way to attach [bunyan](https://github.com/trentm/node-bunyan) to [koa](https://github.com/koajs/koa)

**koa-bunyan-log** is now compatible with **koa v2** which requires **node v4** or higher.

## Installation

```sh
npm i -S koa-bunyan-log
```

## Example

```js
const Koa = require( 'koa' )
const Logger = require( 'koa-bunyan-log' )

const app = new Koa()
const logger = new Logger()

app.use( logger.attach() )

app.use( ctx => {
  ctx.logger.info( 'A shiny log' )
})

app.listen( process.env.PORT || 3000 )
```

## Request Logger

`koa-bunyan-log` also comes bundled with a simple attachment for logging basic request/response information

```js
app.use( logger.attachRequest() )
```

```sh
$ node examples/server | bunyan -o short

19:06:05.170Z  INFO koa:  (event=request, method=GET, url=/)
19:06:05.175Z  INFO koa:  (event=response, method=GET, url=/, status=200, delta=5)
```

## Logger options

All options are passed through to `bunyan` so use whatever config you normally specify and logging will just work

```js
const logger = new Logger({
  streams: [
    {
      stream: fs.createWriteStream( __dirname + '/output.log' )
    }
  ]
})
```

## Attach options

Options can be passed through when attaching the log instance to Koa (feel free to attach multiple logger instances).

```js
app.use( logger.attach({
  as: 'myLog'
}))

app.use( ctx => {
  ctx.myLog.info( 'Another shiny log' )
})
```


## Credits

If you find other modules that contain the keywords [bunyan](https://github.com/trentm/node-bunyan) and [koa](https://github.com/koajs/koa) then this module has almost certainly been influenced by them, thanks for all the hard work guys and gals!

## License

MIT
