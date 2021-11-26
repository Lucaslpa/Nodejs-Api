import { BCRYPT } from '.';

const bcrypt = new BCRYPT();

describe('Bcrypt', () => {
  it('should encrypt password', async () => {
    const hash = await bcrypt.encrypt('12345');

    if (typeof hash === 'string') {
      const res = await bcrypt.compare('12345', hash);

      expect(res).toBeTruthy();
    }
  });
  it('should error if compare is fail', async () => {
    const hash = await bcrypt.encrypt('12345');

    if (typeof hash === 'string') {
      const res = await bcrypt.compare('123451', hash);

      expect(res).toBeFalsy();
    }
  });
});
