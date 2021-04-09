import bcrypt from 'bcrypt';

function verifyPassword(password: string, passwordHash: string): boolean {
  return bcrypt.compareSync(password, passwordHash);
}

export default verifyPassword;
