import express, { Router } from 'express';
import authRoute from './auth.routes';
import userRoute from './user.routes';
import categoryRoute from './category.routes';

export const router = express.Router();

const defaultRoute: { path: string; route: Router }[] = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/categories',
    route: categoryRoute
  }
];

defaultRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
