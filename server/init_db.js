import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_URL = "https://perenual.com/api/v2/species-list"
 
//using this file to check db is being updated and has something in it while we work.
//this file will need to be changed once we decide how many plants we want to have in the database and where the info is going to come from. 

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

async function initDb() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database.');

        // Create table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS plants (
                id INT AUTO_INCREMENT PRIMARY KEY,
                common_name VARCHAR(255) NOT NULL,
                scientific_name VARCHAR(255) NOT NULL
            )
        `;
        await connection.execute(createTableQuery);
        console.log('Table "plants" created or already exists.');

        // Check if data exists
        const [rows] = await connection.execute('SELECT COUNT(*) as count FROM plants');
        if (rows[0].count > 0) {
             console.log('Table already has data. Skipping seed.');
        } else {

    //Commented out old insert query

            // Seed data
            // const insertQuery = `
            //     INSERT INTO plants (common_name, scientific_name) VALUES
            //     ('Snake Plant', 'Sansevieria trifasciata'),
            //     ('Monstera', 'Monstera deliciosa'),
            //     ('Peace Lily', 'Spathiphyllum'),
            //     ('Fiddle Leaf Fig', 'Ficus lyrata'),
            //     ('Aloe Vera', 'Aloe barbadensis miller')
            // `;
            // await connection.execute(insertQuery);
            // console.log('Seed data inserted.');

    //Added new helper function to insert mass amount of plant names to DB
            await seedFromPerenual(connection, 10); // ~200 plants
            console.log("Seeded plants from Perenual API.");

        }

        await connection.end();
        console.log('Database initialization complete.');

    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

/*
@param connection - Db sql connection
@param pages - number of API pages to fetch

loop through each page and collect common names and scientific names under the given API Key
inserts into DB

*/
async function seedFromPerenual(connection, pages = 5) {
  for (let page = 1; page <= pages; page++) {
    console.log(`Fetching plants page ${page}...`);

    const res = await fetch(
      `${PERENUAL_URL}?key=${PERENUAL_API_KEY}&page=${page}`
    );
    const json = await res.json();

    for (const plant of json.data) {
      const common = plant.common_name;
      const scientific = plant.scientific_name?.[0];

      if (!common || !scientific) continue;

      await connection.execute(
        `INSERT IGNORE INTO plants (common_name, scientific_name)
         VALUES (?, ?)`,
        [common, scientific]
      );
    }

    await new Promise(r => setTimeout(r, 250)); // rate limit safety
  }
}


initDb();
