import {
    createToken,
    decodeToken
} from './authenticationOfCanaan';

export default {
  canaan: {
      Token: createToken(),
      decodeToken: decodeToken
  }
};