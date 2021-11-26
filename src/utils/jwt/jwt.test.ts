import { JWT } from './Jwt';

const jwt = new JWT();
const payload = {
  id: 20,
  username: 'sdsd',
};
describe('jwt', () => {
  it('should generate a valid token', () => {
    const token = jwt.generateToken(payload);
    if (typeof token === 'string') {
      const res = jwt.verifyToken(token);
      expect(res).toBeTruthy();
    }
  });
  it('should cause error if token is invalid', () => {
    const token = jwt.generateToken(payload);

    const invalidToken = `${token}1`;
    const res = jwt.verifyToken(invalidToken);
    expect(res).toBeFalsy();
  });
});
