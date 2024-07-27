import * as controller from '../controllers/category.controller';
import express from 'express';
import { auth } from '../middlewares/auth.middleware';

const categoryRoute = express.Router();

categoryRoute.route('/').post(auth, controller.create).get(auth, controller.get);

categoryRoute
  .route('/:categoryId')
  .get(auth, controller.getById)
  .put(auth, controller.update)
  .delete(auth, controller.deleted);

export default categoryRoute;
