require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mascotasRoutes = require('./routes/mascotas');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Atlas Conectado'))
    .catch(err => console.error('❌ Error DB:', err));

app.use('/api/mascotas', mascotasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor HuellApp en puerto ${PORT}`));