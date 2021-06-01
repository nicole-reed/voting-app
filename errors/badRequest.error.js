export class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}