/**
 * Create error with status code
 * @param message Error message 
 * @param type HTTP status code
 */
class CustomError extends Error{
    constructor (message, type){
        super(message);
        this.type = type;
    }
}

module.exports = CustomError;