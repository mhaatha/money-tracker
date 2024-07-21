import express, { Router } from 'express';
import authRoute from './auth.routes';

export const router = express.Router();

const defaultRoute: { path: string; route: Router }[] = [
  {
    path: '/auth',
    route: authRoute
  }
];

defaultRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;