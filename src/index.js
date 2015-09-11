
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
     */
    attach( opts ) {
        let logger = this
        return function *attachLogger( next ) {
            this.logger = logger

            yield next
        }
    }
}
