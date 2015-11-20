
# koa-bunyan-log

> Yet another way to attach bunyan to koa

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


## Credits

If you find other modules that contain the keywords [bunyan](https://github.com/trentm/node-bunyan) and [koa](https://github.com/koajs/koa) then this module has almost certainly been influenced by them, thanks for all the hard work guys and gals!

## License

MIT
