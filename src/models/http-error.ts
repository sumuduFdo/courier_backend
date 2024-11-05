// custom class for handling and sending errors
export default class HttpError extends Error {

    public status: number;

    constructor(errorStatus: number, message: string) {
        super(message);
        this.status = errorStatus;
    }
}