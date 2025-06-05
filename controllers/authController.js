// controllers/authController.js
const bcrypt = require('bcrypt');
const db = require('../db');         // ✅ correcto


const register = (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  // Verificar si ya existe ese correo
  db.query('SELECT * FROM entrevistadores WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });
    if (results.length > 0) return res.status(409).json({ mensaje: 'El correo ya está registrado' });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO entrevistadores (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'No se pudo registrar' });
        return res.status(200).json({ mensaje: 'Registro exitoso' });
      }
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  db.query('SELECT * FROM entrevistadores WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error en el servidor' });
    if (results.length === 0) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const entrevistador = results[0];
    const esCorrecta = await bcrypt.compare(password, entrevistador.password);

    if (!esCorrecta) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    return res.status(200).json({
      mensaje: 'Login exitoso',
      id: entrevistador.id,
      nombre: entrevistador.nombre,
    });
  });
};

module.exports = { register, login };
