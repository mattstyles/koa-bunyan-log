
import Bunyan from 'bunyan'

/**
 * Instantiates a logger
 * @class
 */
export default class Logger extends Bunyan {
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
        let logger = this
        return function *attachLogger( next ) {
            if ( this.logger ) {
                console.warn( 'ctx.logger already exists' )
                yield next
                return
            }

            this.logger = logger

            yield next
        }
    }

    /**
     * Basic request log middleware
     * @param opts <Object> options hash
     * @returns generator function for koa middleware
     */
    attachRequest( opts ) {
        let logger = this

        return function *requestLogger( next ) {
            let start = Date.now()

            logger.info({
                event: 'request',
                method: this.method,
                url: this.url
            })

            yield next
        }

    }
}
