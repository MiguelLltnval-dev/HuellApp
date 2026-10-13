const express = require('express');
const router = express.Router();
const Mascota = require('../models/Mascota');
const Avistamiento = require('../models/Avistamiento');

// 1. GET con filtros (Requisito de rúbrica)
router.get('/', async (req, res) => {
    try {
        const { ciudad, estado } = req.query;
        let filtro = {};
        if (ciudad) filtro.ciudad = ciudad;
        if (estado) filtro.estado = estado;
        
        const mascotas = await Mascota.find(filtro).populate('usuarioId', 'nombre identidadVerificada');
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// 2. POST (Crear Mascota)
router.post('/', async (req, res) => {
    try {
        if (!req.body.nombre || !req.body.especie || !req.body.usuarioId) {
            return res.status(400).json({ error: "Faltan datos obligatorios" });
        }
        const nuevaMascota = new Mascota(req.body);
        const guardada = await nuevaMascota.save();
        res.status(201).json(guardada); // 201 Created
    } catch (error) {
        res.status(500).json({ error: "Error al guardar" });
    }
});

// 3. DELETE (Eliminar Mascota)
router.delete('/:id', async (req, res) => {
    try {
        const mascota = await Mascota.findByIdAndDelete(req.params.id);
        if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
});

// 4. PATCH + REGLA DE NEGOCIO OBLIGATORIA (Añadir Avistamiento)
router.post('/:id/avistamientos', async (req, res) => {
    try {
        const mascota = await Mascota.findById(req.params.id);
        if (!mascota) return res.status(404).json({ error: "Mascota no encontrada" });

        // REGLA: No permitir avistamientos si la mascota está "EN_CASA"
        if (mascota.estado === 'EN_CASA') {
            return res.status(409).json({ // 409 Conflict
                error: "Conflicto: La mascota ya se encuentra en casa, reporte cerrado." 
            });
        }

        const nuevoAvistamiento = new Avistamiento({
            mascotaId: mascota._id,
            reportanteId: req.body.reportanteId,
            ubicacion: req.body.ubicacion,
            estadoObservado: req.body.estadoObservado,
            generadoPorIA: req.body.generadoPorIA || false
        });

        const guardado = await nuevoAvistamiento.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(500).json({ error: "Error al registrar avistamiento" });
    }
});

module.exports = router;