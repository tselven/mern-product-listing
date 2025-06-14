import bcrypt from 'bcryptjs';

const hashPassword = async (plainPassword) => {
  const saltRounds = process.env.BYCRYPT_ROUNDS || 10;
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};