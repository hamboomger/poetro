import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function hashPassword(password: string): string {
  return bcrypt.hashSync(password, SALT_ROUNDS);
}

export default hashPassword;
