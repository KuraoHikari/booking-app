import express from 'express';
const router = express.Router();
import Hotel from '../models/Hotel.js';

//create
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    return res.status(200).json(savedHotel);
  } catch (error) {
    return res.status(500).json(error);
  }
});
//update
//delete
//get
//get all
export default router;
