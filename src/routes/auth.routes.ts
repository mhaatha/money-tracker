import express from 'express';

const authRoute = express.Router();

authRoute.post('/register', (req, res) => {
  res.send('Register');
});

authRoute.post('/login', (req, res) => {
  res.send('Login');
});

authRoute.post('/logout', (req, res) => {
  res.send('Logout');
});

authRoute.post('/refresh-token', (req, res) => {
  res.send('Refresh Token');
});

export default authRoute;