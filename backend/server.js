import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// Allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Only if you use cookies or auth headers
}));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);
//app.use('/api/auth', authRoutes);


// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});