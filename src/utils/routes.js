import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserRepository from '../database/repository/userRepository.js';
import RefreshTokenDAO from '../database/DAOs/refreshTokenDAO.js';
import RefreshToken from '../models/refreshToken.js';

const JWT_SECRET = 'your_jwt_secret_key';
const REFRESH_TOKEN_SECRET = 'your_refresh_token_secret_key';

export const protectedRoute = (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
};

export async function usersRoute(req, res) {
  try {
    const userRepository = new UserRepository();
    const users = await userRepository.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function userByIdRoute(req, res) {
  try {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function authenticatedUserRoute(req, res) {
  try {
    // Get user from access token
    const accessToken = req.headers.authorization.split(' ')[1];
    const decodedAccessToken = jwt.verify(accessToken, JWT_SECRET);

    const userRepository = new UserRepository();
    const user = await userRepository.findById(decodedAccessToken.id);
    console.log(user);

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
