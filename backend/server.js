require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');



const app = express();

// Router 
const authRouter = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');



// Middleware
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome to E-commerce API...');
});
// Routes
app.use('/api/auth', authRouter);
app.use('/api/v1', productRoutes);
app.use('/api/v1/products/review', reviewRoutes);
app.use('/api/v1/productsCart', cartRoutes);
app.use('/api/v1/order', paymentRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
    
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on htttp://localhost:${PORT}`));
