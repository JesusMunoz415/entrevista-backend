// controllers/authController.js
const bcrypt = require('bcrypt');
const db = require('../db'); // ✅ conexión a pg

const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  try {
    // Verificar si el correo ya está registrado
    const result = await db.query(
      'SELECT * FROM entrevistadores WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo entrevistador
    await db.query(
      'INSERT INTO entrevistadores (nombre, email, password) VALUES ($1, $2, $3)',
      [nombre, email, hashedPassword]
    );

    return res.status(200).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error en el servidor (register)' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM entrevistadores WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const entrevistador = result.rows[0];

    const esCorrecta = await bcrypt.compare(password, entrevistador.password);

    if (!esCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    return res.status(200).json({
      mensaje: 'Login exitoso',
      id: entrevistador.id,
      nombre: entrevistador.nombre,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: 'Error en el servidor (login)' });
  }
};

module.exports = { register, login };
