const mySql = require('mysql');
require('dotenv').config();

let connection = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect((err) => {
    if (err) return console.error(err);

    connection.query(`USE ${process.env.DB_DB}`, (err, results) => {
        // Create DB if not existing
        if (err && err.code == 'ER_BAD_DB_ERROR') {
          connection.query(`CREATE DATABASE ${process.env.DB_DB}`, (err, results) => {
            if (err) return console.error(err);

            console.log('Databse re-created: ', process.env.DB_DB);
          })
          // create tables and relations
          createTables();
          connection.end();
          return;
        }
        createTables(); // try to create tables
        console.log('conneted to DB: ', process.env.DB_DB);
        connection.end();
      })
});

function createTables() {
    const tablesList = [
        `CREATE TABLE IF NOT EXISTS species 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS temperaments 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS sizes 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS animals 
        (id VARCHAR(38) PRIMARY KEY,name VARCHAR(255) NOT NULL,birthday DATE,species INT,
        FOREIGN KEY (species) REFERENCES species(id) ON UPDATE CASCADE ON DELETE RESTRICT,
        size INT,FOREIGN KEY (size) REFERENCES sizes(id) ON UPDATE CASCADE ON DELETE RESTRICT, 
        temperament INT,FOREIGN KEY (temperament) REFERENCES temperaments(id) ON UPDATE CASCADE ON DELETE RESTRICT)`,

        `CREATE TABLE IF NOT EXISTS roles 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS passwords 
        (id INT AUTO_INCREMENT PRIMARY KEY,password VARCHAR(38) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS users 
        (id VARCHAR(38) PRIMARY KEY,fullName VARCHAR(255) NOT NULL,userName VARCHAR(255) NOT NULL UNIQUE,
        password INT,FOREIGN KEY (password) REFERENCES passwords(id)
        ,role INT,FOREIGN KEY (role) REFERENCES roles(id))`,

        `CREATE TABLE IF NOT EXISTS adoptions 
        (id INT AUTO_INCREMENT,animal VARCHAR(38),user VARCHAR(38),PRIMARY KEY (id, animal),
        FOREIGN KEY (animal) REFERENCES animals(id),FOREIGN KEY (user) REFERENCES users(id))`
    ];

    for (let table in tablesList) {
        connection.query(tablesList[table], (err, results) => {
            if (err) return console.log(`table: ${table} /`, err.sqlMessage, err.code);
            console.log(`table created:`, tablesList[table].slice(26, 38).trim());
        });
    }
}