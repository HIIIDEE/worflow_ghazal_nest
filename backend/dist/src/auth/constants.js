"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
exports.jwtConstants = {
    secret: process.env.JWT_SECRET || (() => {
        throw new Error('JWT_SECRET is not defined in environment variables');
    })(),
};
//# sourceMappingURL=constants.js.map