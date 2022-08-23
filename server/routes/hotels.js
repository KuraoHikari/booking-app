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
router.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    return res.status(200).json(updatedHotel);
  } catch (error) {
    return res.status(500).json(error);
  }
});
//delete
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json('hotel has been deleted');
  } catch (error) {
    return res.status(500).json(error);
  }
});
//get
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json(error);
  }
});
//get all
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    return res.status(200).json(hotels);
  } catch (error) {
    return res.status(500).json(error);
  }
});
export default router;
