const mongoose = require('mongoose');

const AvistamientoSchema = new mongoose.Schema({
    mascotaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mascota', required: true },
    reportanteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    ubicacion: { type: String, required: true }, // Ofuscada a 500m
    estadoObservado: { type: String, required: true },
    generadoPorIA: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Avistamiento', AvistamientoSchema);