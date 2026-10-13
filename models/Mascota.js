const mongoose = require('mongoose');

const MascotaSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre: { type: String, required: true },
    especie: { type: String, required: true },
    color: { type: String, required: true },
    ciudad: { type: String, required: true },
    estado: { type: String, enum: ['PERDIDO', 'EN_CASA'], default: 'PERDIDO' },
    fotoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Mascota', MascotaSchema);