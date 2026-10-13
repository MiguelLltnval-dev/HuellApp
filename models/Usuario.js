const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true }, // Formato +57
    ciudad: { type: String, required: true },
    rol: { type: String, enum: ['usuario', 'vet_business', 'fundacion'], default: 'usuario' },
    identidadVerificada: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', UsuarioSchema);