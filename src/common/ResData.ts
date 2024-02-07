export class ResData {
    message: string;
    statusCode: number;
    data?: any;
    error?: any;

    constructor(message: string, statusCode: number, data?: any, error?: any) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}
