import express from 'express';
const router = express.Router();
import { updateUser, deleteUser, getUser, getAllUser } from '../controllers/user.js';

//update
router.put('/:id', updateUser);
//delete
router.delete('/:id', deleteUser);
//get
router.get('/:id', getUser);
//get all
router.get('/', getAllUser);
export default router;
