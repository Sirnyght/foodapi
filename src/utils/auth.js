import express from 'express';
import jwt from 'jsonwebtoken';


import UserRepository from '../database/repository/userRepository.js';
import RefreshTokenDAO from '../database/DAOs/refreshTokenDAO.js';
import RefreshToken from '../models/refreshToken.js';
import { JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRATION, roleRequirements } from '../config/config.js';
import { compareTokenWithHash } from './security.js';

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, roles: user.roles }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, roles: user.roles }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

// Function to check user role for a specific route
const checkUserRole = (method, url, userRoles) => {
  // Define your method and route-specific role requirements in config.js
  // If nothing is specified for a route, it is accessible by everyone
  // If the URL ends with a number, it is a route to get a specific resource
  // So we replace the number with ':id' to match the route in config.js
  if (url.match(/\d+$/)) url = url.replace(/\d+$/, ':id');

  const requiredRoles = roleRequirements[`${method}:${url}`];
  // If there are no role requirements for a route, it is accessible by everyone
  if (!requiredRoles) return true;
  // If there are role requirements for a route, check if the user has the required roles
  // If the user has at least one of the required roles, he can access the route
  // If the user has none of the required roles, he cannot access the route
  // Keep in mind that the user can have more roles than the ones required for a route
  // And that roles is an array with an id and a name
  // So we perform a check on the role names
  // We use some() to check if the user has at least one of the required roles
  // If the user has none of the required roles, the function returns false
  // If the user has at least one of the required roles, the function returns true
  return userRoles.some((role) => requiredRoles.includes(role.name));
};

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) 
    return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) 
      return res.status(403).json({ message: 'Forbidden' });

    // Get user role from access token and check if the user has the required roles for the route
    const userRoles = jwt.decode(token).roles;
    if (checkUserRole(req.method, req.url, userRoles))
      next(); // Grant access
    else
      res.status(403).json({ message: 'Insufficient permissions' }); // Deny access
  });
};

export async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  const refreshTokenDAO = new RefreshTokenDAO();
  const refreshTokens = await refreshTokenDAO.findAll();

  for (const refreshTokenObject of refreshTokens) {
    if (await compareTokenWithHash(refreshToken, refreshTokenObject.token)) {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) 
          return res.status(403).json({ message: 'Forbidden' });
        
        // Add user roles from refresh token to user object
        user.roles =  jwt.decode(refreshToken).roles;
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
      });
    } 
  }
};

export async function login(req, res) {
  const { username, password } = req.body;
  const userRepository = new UserRepository();

  // Temporary method to check if the user exists, before adding security features (password hashing, etc.)
  const user = await userRepository.findByUsernameAndPassword(username, password);

  if (!user) 
    return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const refreshTokenDAO = new RefreshTokenDAO();
  const refreshTokenObject = new RefreshToken();

  refreshTokenObject.setUserId(user.getId());
  refreshTokenObject.setToken(refreshToken);

  const refreshTokenFromDatabase = await refreshTokenDAO.findByIdUser(user.getId());

  if (!refreshTokenFromDatabase) 
    await refreshTokenDAO.insert(refreshTokenObject);
  else 
    await refreshTokenDAO.update(refreshTokenObject);
  
  return res.json({ accessToken, refreshToken, message: 'Login successful'});
};

export const logout = (req, res) => {
  // Here, we should invalidate the refresh token and the current access token
  // The refresh token is invalidated by deleting it from the database
  // The access token is invalidated by deleting it from the client side
  // Deleting the refresh token from the database will prevent the user from generating a new access token
  // Thus effectively logging him out
  const refreshToken = req.body.refreshToken;

  // Methods needing update later
  const refreshTokenDAO = new RefreshTokenDAO();
  refreshTokenDAO.deleteByToken(refreshToken);

  res.json({ message: 'Logout successful' });
};






