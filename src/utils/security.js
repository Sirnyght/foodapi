import bcrypt from 'bcrypt';

// Generate a hash before storing in the database
export const generateHash = async (token) => {
  const saltRounds = 10;
  const hashedToken = await bcrypt.hash(token, saltRounds);
  return hashedToken;
};

// Compare a provided token with the stored hash during validation
export const compareTokenWithHash = async (token, hashedToken) => {
  return await bcrypt.compare(token, hashedToken);
};