
import bunyan from 'bunyan'

export default class Logger {
    constructor( opts ) {
        opts = Object.assign({
            logOpts: {
                name: 'koa'
            },
            logger: null
        }, opts )

        this.logger = logger || bunyan.createLogger( opts.logOpts )
    }

    attach( opts ) {

    }
}
