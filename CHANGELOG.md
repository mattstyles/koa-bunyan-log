##

* _add_ test suite
* _add_ attach as functionality
* _add_ example
* _update_ babel@6 transpile

### Breaking changes

* Koa v2 has a different middleware signature which shifts the context of the middleware into a parameter, this breaks BC where context is attached to `this`. `koa-bunyan-log` follows suit by attaching the log instance to the `ctx`, in much the same way as it used to, but, in v2 `this.logger` is not available, look instead for `ctx.logger`

---

## 1.0.0

* _add_ instantiate logger class
* _add_ attach instance to koa context
* _add_ request logger middleware
