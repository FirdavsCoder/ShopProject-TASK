"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResData = void 0;
class ResData {
    constructor(message, statusCode, data, error) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
        this.error = error;
    }
}
exports.ResData = ResData;
