// backend/controllers/historialEntrevistasController.js
const db = require('../db');

const historialEntrevistas = (req, res) => {
    const { entrevistador_id } = req.body;

    if (!entrevistador_id) {
        return res.status(400).json({ status: 'error', mensaje: 'Falta el ID del entrevistador.' });
    }

    const query = `
        SELECT 
            r.postulante_id,
            p.nombre AS postulante_nombre,
            r.fecha,
            r.pregunta_id,
            r.texto AS respuesta,
            r.evaluacion_automatica,
            r.puntaje_manual,
            r.comentario_manual
        FROM respuestas r
        JOIN postulantes p ON r.postulante_id = p.id
        WHERE r.entrevistador_id = ?
        ORDER BY r.postulante_id, r.fecha, r.pregunta_id
    `;

    db.query(query, [entrevistador_id], (err, results) => {
        if (err) {
            console.error('Error al obtener historial:', err);
            return res.status(500).json({ status: 'error', mensaje: 'Error al obtener historial' });
        }

        // Agrupar por postulante_id + fecha:
        const entrevistas = [];
        let current = null;

        results.forEach(row => {
            const key = `${row.postulante_id}_${row.fecha}`;
            if (!current || current.key !== key) {
                current = {
                    key,
                    postulante: row.postulante_nombre,
                    fecha: row.fecha,
                    respuestas: []
                };
                entrevistas.push(current);
            }

            current.respuestas.push({
                pregunta: `Pregunta ${row.pregunta_id}`,  // Aquí podrías usar tabla preguntas si tienes
                respuesta: row.respuesta,
                evaluacion_automatica: row.evaluacion_automatica,
                puntaje_manual: row.puntaje_manual,
                comentario_manual: row.comentario_manual
            });
        });

        res.json({ status: 'ok', entrevistas });
    });
};

module.exports = { historialEntrevistas };
