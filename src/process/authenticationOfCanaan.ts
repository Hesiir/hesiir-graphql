import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {
    jwtRegisteredType
} from '../types';

dotenv.config();
const secret = process.env.AUTHENTICATION_SECRET;
if (secret.indexOf('canaan') < 0) {
    throw new Error('canaan secret key not found, add your key to field AUTHENTICATION_SECRET in .env')
}
const canaan_key = secret.match(/canaan:\w+/g)[0].split(":")[1];

export const createToken:Function = () => {
    return jwt.sign({
        iss: "canaan",
        exp: Math.floor(Date.now() / 1000) + (10 * 60),
        unm: "orlo"
    }, canaan_key)
};

export const decodeToken:Function = (token:string, cb) => {
    return jwt.verify(token, canaan_key, cb)
};