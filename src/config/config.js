// Secrets generated with openssl rand -hex 32
export const JWT_SECRET = '82ada9f33cb5eb9ed7c04a70a098eaf72b1182f7ce1fe88cf215e3fa15afe2a0';
export const REFRESH_TOKEN_SECRET = 'b9b9fa0369168e2860d5e48c430bdd283521acf78826f7811e4ca3e2c26343a8';

// Expiration time of access token set to 30 seconds for testing purposes
export const JWT_EXPIRATION = '30s';

// Expiration time of refresh token set to 1 day by default
export const REFRESH_TOKEN_EXPIRATION = '1d';

// NOTE : The following configuration is chosen arbitrarily and is not based on any security best practices
// It is only used to demonstrate how to implement role-based access control
export const roleRequirements = {
    'GET:/protected': ['admin'],
    'POST:/users/add': ['admin'],
    'PATCH:/users/:id': ['admin'],
    'DELETE:/users/:id': ['admin'],
    'POST:/recipes/add': ['user' || 'admin'],
    'PATCH:/recipes/:id': ['user' || 'admin'],
    'DELETE:/recipes/:id': ['admin'],
    // Add more operations and their required roles as needed
  };
