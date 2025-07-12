import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('🟢 Conectado a la base de datos PostgreSQL');
  } catch (err) {
    console.error('🔴 Error de conexión a la base de datos', err);
    process.exit(1);
  }
};

export default pool;
