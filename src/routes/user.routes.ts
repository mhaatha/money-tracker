import * as controller from '../controllers/user.controller';
import express from 'express';
import { auth } from '../middlewares/auth.middleware';

const userRoute = express.Router();

userRoute.route('/current-user')
  .get(auth, controller.get)
  .patch(auth, controller.update)
  .delete(auth, controller.deleteUser);

userRoute.get('/current-user/balance', auth, controller.getUserBalance);

export default userRoute;
