import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import UserRepository from '../database/repository/userRepository.js';
import RefreshTokenDAO from '../database/DAOs/refreshTokenDAO.js';
import RefreshToken from '../models/refreshToken.js';

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