import jwt from 'jsonwebtoken';

export class JWT {
  generateToken = (payload: object) => {
    try {
      const token = jwt.sign(payload, `${process.env.SECRET_KEY}`);
      return token;
    } catch (e) {
      return false;
    }
  };

  verifyToken = (token: string) => {
    try {
      const tokenIsValid = jwt.verify(token, `${process.env.SECRET_KEY}`);
      return tokenIsValid;
    } catch (e) {
      return false;
    }
  };
}
