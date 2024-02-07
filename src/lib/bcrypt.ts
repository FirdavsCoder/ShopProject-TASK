import bcrypt from 'bcrypt';


const salt: number = 10;

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
