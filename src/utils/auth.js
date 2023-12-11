import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserRepository from '../database/repository/userRepository.js';
import RefreshTokenDAO from '../database/DAOs/refreshTokenDAO.js';
import RefreshToken from '../models/refreshToken.js';

const router = express.Router();

const JWT_SECRET = 'your_jwt_secret_key';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret_key';
const JWT_EXPIRATION = '30s';
const REFRESH_TOKEN_EXPIRATION = '1d';

export async function login(req, res) {
  const { username, password } = req.body;
  console.log(username + " " + password);
  console.log("Ici ca debug feu feu feu"); 

  const userRepository = new UserRepository();

  // Temporary method to check if the user exists, before adding security features (password hashing, etc.)
  const user = await userRepository.findByUsernameAndPassword(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const refreshTokenDAO = new RefreshTokenDAO();
  
  const refreshTokenObject = new RefreshToken();

  refreshTokenObject.setUserId(user.getId());
  refreshTokenObject.setToken(refreshToken);

  const refreshTokenFromDatabase = await refreshTokenDAO.findByIdUser(user.getId());
  if (refreshTokenFromDatabase) {
    // await refreshTokenDAO.update(refreshTokenObject);
  } else {
    await refreshTokenDAO.insert(refreshTokenObject);
  }

  return res.json({ accessToken, refreshToken });

};

export const logout = (req, res) => {
  // res.json({ message: 'Logout successful' });
  // Here, we should invalidate the refresh token and the current access token
  const refreshTokenDAO = new RefreshTokenDAO();
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  refreshTokenDAO.deleteByToken(refreshToken);
  res.json({ message: 'Logout successful' });
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};

export async function refreshToken(req, res) {
  const { refreshToken } = req.body;
  const refreshTokenDAO = new RefreshTokenDAO();
  const refreshTokens = await refreshTokenDAO.findAll();
  console.log(refreshTokens);
  for (const refreshTokenObject of refreshTokens) {
    if (refreshTokenObject.token === refreshToken) {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
      });
    } 
  }
}
