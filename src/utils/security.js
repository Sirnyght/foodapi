import bcrypt from 'bcrypt';

// NOTE : In a real case application, we would use those functions
// to hash passwords and tokens before storing them in the database.
// Here, we don't, because it is just a project to discover how to make APIs, endpoints, etc.

// Generate a hash before storing in the database
export const generateHash = async (token) => {
  const saltRounds = 10;
  const hashedToken = await bcrypt.hash(token, saltRounds);
  return hashedToken;
};

export const comparePasswordWithHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Compare a provided token with the stored hash during validation
export const compareTokenWithHash = async (token, hashedToken) => {
  return await bcrypt.compare(token, hashedToken);
};