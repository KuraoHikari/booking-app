import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('masuk');
});
router.get('/register', (req, res) => {
  res.send('masuk');
});
export default router;
