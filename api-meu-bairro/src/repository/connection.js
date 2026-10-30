import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'meu_bairro',
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  decimalNumbers: true
});

export async function testarConexao() {
  await connection.query('SELECT 1');
}

export default connection;
