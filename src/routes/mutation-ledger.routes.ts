import * as controller from '../controllers/mutation-ledger.controller';
import express from 'express';
import { auth } from '../middlewares/auth.middleware';

const mutationLedgerRoute = express.Router();

mutationLedgerRoute.post('/', auth, controller.create);

mutationLedgerRoute.get('/current-user', auth, controller.get);

mutationLedgerRoute
  .route('/:mutationId')
  .patch(auth, controller.update)
  .delete(auth, controller.deleted);

export default mutationLedgerRoute;
