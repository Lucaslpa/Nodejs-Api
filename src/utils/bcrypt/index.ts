import bcrypt from 'bcrypt';

export class BCRYPT {
  async encrypt(password: string) {
    try {
      const encrypted = await bcrypt.hash(password, 10);
      return encrypted;
    } catch (e) {
      return false;
    }
  }

  async compare(password: string, hash: string) {
    try {
      const encrypted = await bcrypt.compare(password, hash);
      return encrypted;
    } catch (e) {
      return false;
    }
  }
}
