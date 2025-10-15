import { sql } from '@vercel/postgres';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Database = any;

// Check if we're in development (local) or production (Vercel)
// Vercel sets NODE_ENV to 'production', but we can also check for Vercel-specific env vars
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

// For local development, we'll still use SQLite
let db: Database | typeof sql;

if (!isProduction) {
  // Local development - use SQLite
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require('path');

  const dbPath = path.join(process.cwd(), 'missubi.db');
  db = new Database(dbPath);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');
} else {
  // Production - use Vercel Postgres
  // We'll initialize the database schema in production
  db = sql;
}

// Create tables
if (!isProduction) {
  // SQLite setup for local development
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      image_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert default admin user (username: admin, password: admin123)
  const insertAdmin = db.prepare(`
    INSERT OR IGNORE INTO admins (username, password_hash)
    VALUES (?, ?)
  `);

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const bcrypt = require('bcryptjs');
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  insertAdmin.run('admin', hashedPassword);
} else {
  // PostgreSQL setup for production
  // Create tables if they don't exist
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0,
        image_path TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert default admin user
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const bcrypt = require('bcryptjs');
    const hashedPassword = bcrypt.hashSync('admin123', 10);

    await sql`
      INSERT INTO admins (username, password_hash)
      VALUES ('admin', ${hashedPassword})
      ON CONFLICT (username) DO NOTHING;
    `;

    console.log('Database initialized successfully in production');
  } catch (error) {
    console.error('Error initializing production database:', error);
  }
}

// Database query functions
export const dbStatements = {
  // Admin queries
  getAdminByUsername: !isProduction
    ? db.prepare('SELECT * FROM admins WHERE username = ?')
    : async (username: string) => {
        const result = await sql`SELECT * FROM admins WHERE username = ${username}`;
        return result.rows[0];
      },

  createAdmin: !isProduction
    ? db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)')
    : async (username: string, passwordHash: string) => {
        await sql`INSERT INTO admins (username, password_hash) VALUES (${username}, ${passwordHash})`;
      },

  // Product queries
  getAllProducts: !isProduction
    ? db.prepare('SELECT * FROM products ORDER BY created_at DESC')
    : async () => {
        const result = await sql`SELECT * FROM products ORDER BY created_at DESC`;
        return result.rows;
      },

  getProductById: !isProduction
    ? db.prepare('SELECT * FROM products WHERE id = ?')
    : async (id: number) => {
        const result = await sql`SELECT * FROM products WHERE id = ${id}`;
        return result.rows[0];
      },

  createProduct: !isProduction
    ? db.prepare('INSERT INTO products (name, description, price, quantity, image_path) VALUES (?, ?, ?, ?, ?)')
    : async (name: string, description: string, price: number, quantity: number, imagePath: string | null) => {
        const result = await sql`INSERT INTO products (name, description, price, quantity, image_path) VALUES (${name}, ${description}, ${price}, ${quantity}, ${imagePath}) RETURNING id`;
        return { lastInsertRowid: result.rows[0]?.id || 1 };
      },

  updateProduct: !isProduction
    ? db.prepare('UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, image_path = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    : async (name: string, description: string, price: number, quantity: number, imagePath: string | null, id: number) => {
        await sql`UPDATE products SET name = ${name}, description = ${description}, price = ${price}, quantity = ${quantity}, image_path = ${imagePath}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
        return { changes: 1 };
      },

  deleteProduct: !isProduction
    ? db.prepare('DELETE FROM products WHERE id = ?')
    : async (id: number) => {
        await sql`DELETE FROM products WHERE id = ${id}`;
        return { changes: 1 };
      },

  updateProductQuantity: !isProduction
    ? db.prepare('UPDATE products SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
    : async (quantity: number, id: number) => {
        await sql`UPDATE products SET quantity = ${quantity}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id}`;
      },
};

export default db;