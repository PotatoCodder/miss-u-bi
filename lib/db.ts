import Database from 'better-sqlite3';
import path from 'path';

// Initialize database
const dbPath = path.join(process.cwd(), 'missubi.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
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

const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('admin123', 10);
insertAdmin.run('admin', hashedPassword);

// Prepared statements
export const dbStatements = {
  // Admin queries
  getAdminByUsername: db.prepare('SELECT * FROM admins WHERE username = ?'),
  createAdmin: db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)'),

  // Product queries
  getAllProducts: db.prepare('SELECT * FROM products ORDER BY created_at DESC'),
  getProductById: db.prepare('SELECT * FROM products WHERE id = ?'),
  createProduct: db.prepare(`
    INSERT INTO products (name, description, price, quantity, image_path)
    VALUES (?, ?, ?, ?, ?)
  `),
  updateProduct: db.prepare(`
    UPDATE products
    SET name = ?, description = ?, price = ?, quantity = ?, image_path = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  deleteProduct: db.prepare('DELETE FROM products WHERE id = ?'),
  updateProductQuantity: db.prepare(`
    UPDATE products
    SET quantity = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
};

export default db;