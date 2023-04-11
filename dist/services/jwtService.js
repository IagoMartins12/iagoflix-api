"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'chave-do-jwt';
exports.jwtService = {
    //Metodo para criar um token de autenticação
    signPayload: (payload, expiration) => {
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiration });
    },
    //Metodo para verificar um token de autenticação  
    verifyToken: (token, callbackfn) => {
        jsonwebtoken_1.default.verify(token, secret, callbackfn);
    }
};
