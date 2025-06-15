import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/users.route.js';
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
const __dirname = path.resolve();

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);

// Serve static files from the React app
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});