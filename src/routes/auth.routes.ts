import * as controller from '../controllers/auth.controller';
import express from 'express';
import { auth } from '../middlewares/auth.middleware';

const authRoute = express.Router();

authRoute.post('/register', controller.register);
authRoute.post('/login', controller.login);
authRoute.post('/logout', auth, controller.logout);
authRoute.post('/refresh-token', auth, controller.refreshToken);

export default authRoute;
