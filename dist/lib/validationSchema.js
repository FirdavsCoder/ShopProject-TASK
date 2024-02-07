"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const exception_1 = require("../common/exception/exception");
function validationSchema(schema, dto) {
    const { error } = schema.validate(dto);
    if (error) {
        throw new exception_1.BadRequestException(error.message);
    }
}
exports.validationSchema = validationSchema;
