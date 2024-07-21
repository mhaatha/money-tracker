import * as controller from '../controllers/auth.controller';
import express from 'express';

const authRoute = express.Router();

authRoute.post('/register', controller.register);
authRoute.post('/login', controller.login);
authRoute.post('/logout', controller.logout);
authRoute.post('/refresh-token', controller.refreshToken);

export default authRoute;