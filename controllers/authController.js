// controllers/authController.js
const bcrypt = require('bcrypt');
const db = require('../db'); // ✅ conexión a pg (Supabase)

const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  try {
    // 🔍 Verificar si el correo ya existe
    const result = await db.query(
      'SELECT id FROM entrevistadores WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    // 🔐 Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Insertar nuevo entrevistador
    await db.query(
      'INSERT INTO entrevistadores (nombre, email, password, creado_en) VALUES ($1, $2, $3, NOW())',
      [nombre, email, hashedPassword]
    );

    console.log(`✅ Nuevo entrevistador registrado: ${email}`);
    return res.status(201).json({ mensaje: 'Registro exitoso' });
  } catch (err) {
    console.error('❌ Error en register:', err);
    return res.status(500).json({ mensaje: 'Error en el servidor (register)' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  try {
    // 🔍 Buscar entrevistador por correo
    const result = await db.query(
      'SELECT id, nombre, password FROM entrevistadores WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const entrevistador = result.rows[0];

    // 🔐 Comparar contraseñas
    const esCorrecta = await bcrypt.compare(password, entrevistador.password);

    if (!esCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    console.log(`✅ Login exitoso: ${email}`);
    return res.status(200).json({
      mensaje: 'Login exitoso',
      id: entrevistador.id,
      nombre: entrevistador.nombre,
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    return res.status(500).json({ mensaje: 'Error en el servidor (login)' });
  }
};

module.exports = { register, login };
