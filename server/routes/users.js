import express from 'express';
const router = express.Router();
import { updateUser, deleteUser, getUser, getAllUser } from '../controllers/user.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

//update
router.put('/:id', verifyUser, updateUser);
//delete
router.delete('/:id', deleteUser);
//get
router.get('/:id', verifyUser, getUser);
//get all
router.get(
  '/',
  //  verifyAdmin,
  getAllUser
);
export default router;
