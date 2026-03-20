import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_URL = process.env.PERENUAL_URL || "https://perenual.com/api/v2/species-list";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

async function ensurePerenualIdColumn(connection) {
  const [cols] = await connection.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'plants' AND COLUMN_NAME = 'perenual_id'`
  );
  if (cols.length === 0) {
    await connection.execute(
      `ALTER TABLE plants ADD COLUMN perenual_id INT NULL UNIQUE`
    );
    console.log('Added column plants.perenual_id');
  }
}

/** Backfill perenual_id for rows missing it by matching common_name from species-list pages. */
async function backfillPerenualIds(connection, maxPages = 10) {
  if (!PERENUAL_API_KEY) return;
  const [missing] = await connection.execute(
    `SELECT id, common_name FROM plants WHERE perenual_id IS NULL`
  );
  if (missing.length === 0) return;

  const nameToPerenual = new Map();
  for (let page = 1; page <= maxPages; page++) {
    const res = await fetch(
      `${PERENUAL_URL}?key=${PERENUAL_API_KEY}&page=${page}`
    );
    const json = await res.json();
    if (!json?.data || !Array.isArray(json.data)) break;
    for (const plant of json.data) {
      const common = plant.common_name;
      if (common && plant.id != null) {
        nameToPerenual.set(common.toLowerCase(), plant.id);
      }
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  for (const row of missing) {
    const pid = nameToPerenual.get(String(row.common_name).toLowerCase());
    if (pid != null) {
      await connection.execute(
        `UPDATE plants SET perenual_id = ? WHERE id = ?`,
        [pid, row.id]
      );
    }
  }
  if (missing.length > 0) {
    console.log('Backfill perenual_id attempted for legacy plant rows.');
  }
}

async function initDb() {
  try {
      const connection = await mysql.createConnection(dbConfig);
      console.log('Connected to database.');

      const createTableQuery = `CREATE TABLE IF NOT EXISTS plants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        common_name VARCHAR(255) NOT NULL,
        scientific_name VARCHAR(255) NOT NULL,
        perenual_id INT NULL UNIQUE
      )`;
      await connection.execute(createTableQuery);
      console.log('Table "plants" created or already exists.');

      await ensurePerenualIdColumn(connection);

      const newTableQuery = `CREATE TABLE IF NOT EXISTS plots (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, plants JSON)`;
      await connection.execute(newTableQuery);
      console.log('Table "plots" created or already exists');

      await backfillPerenualIds(connection, 10);

      const [rows] = await connection.execute('SELECT COUNT(*) as count FROM plants');
      if (rows[0].count > 0) {
        console.log('Table already has data. Skipping seed.');
      } else {
        await seedFromPerenual(connection, 10);
        console.log("Seeded plants from Perenual API.");
      }

      await connection.end();
      console.log('Database initialization complete.');
  } catch (err) {
      console.error('Error initializing database:', err);
      process.exit(1);
  }
}

async function seedFromPerenual(connection, pages = 1) {
  if (!PERENUAL_API_KEY) {
    console.warn('PERENUAL_API_KEY missing; skipping Perenual seed.');
    return;
  }
  for (let page = 1; page <= pages; page++) {
    console.log(`Fetching plants page ${page}...`);

    const res = await fetch(
      `${PERENUAL_URL}?key=${PERENUAL_API_KEY}&page=${page}`
    );
    const json = await res.json().catch(() => null);
    if (!res.ok || !Array.isArray(json?.data)) {
      console.warn('Unexpected Perenual response; stopping seed.', {
        status: res.status,
      });
      break;
    }

    for (const plant of json.data) {
      const common = plant.common_name;
      const scientific = plant.scientific_name?.[0];
      const perenualId = plant.id;

      if (!common || !scientific || perenualId == null) continue;

      await connection.execute(
        `INSERT IGNORE INTO plants (perenual_id, common_name, scientific_name)
         VALUES (?, ?, ?)`,
        [perenualId, common, scientific]
      );
    }

    await new Promise(r => setTimeout(r, 250));
  }
}

initDb();
