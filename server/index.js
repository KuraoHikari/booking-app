import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

dotenv.config();
const app = express();
// Or:\
const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);

    console.log('mongo connect');
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('mongoDb disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('mongoDb connected again');
});
//midleware
app.use(express.json());
app.use('/auth', authRoute);
app.use('/users', usersRoute);
app.use('/hotels', hotelsRoute);
app.use('/rooms', roomsRoute);

app.listen(8800, () => {
  connect();
  console.log('connect to port' + '8800');
});
