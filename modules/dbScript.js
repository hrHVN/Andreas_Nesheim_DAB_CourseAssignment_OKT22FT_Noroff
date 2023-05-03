const mySql = require('mysql');
require('dotenv').config();

let connection = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});

connection.connect((err) => {
    if (err) return console.error(err);
    // Create Tables if not exsist (with references)
    const tablesList = [
        `CREATE TABLE IF NOT EXISTS species 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS temperament 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS size 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS animals 
        (id UUID(38) PRIMARY KEY,name VARCHAR(255) NOT NULL,birthday DATE,species INT,
        FOREIGN KEY (species) REFERENCES species(id) ON UPDATE CASCADE ON DELETE RESTRICT,
        size INT,FOREIGN KEY (size) REFERENCES size(id) ON UPDATE CASCADE ON DELETE RESTRICT, 
        temperament INT,FOREIGN KEY (temperament) REFERENCES temperament(id) ON UPDATE CASCADE ON DELETE RESTRICT)`,

        `CREATE TABLE IF NOT EXISTS role 
        (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS passwords 
        (id INT AUTO_INCREMENT PRIMARY KEY,password VARCHAR(38) NOT NULL)`,

        `CREATE TABLE IF NOT EXISTS users 
        (id UUID(38) PRIMARY KEY,fullName VARCHAR(255) NOT NULL,userName VARCHAR(255) NOT NULL UNIQUE,
        password INT,FOREIGN KEY (password) REFERENCES passwords(id)
        ,role INT,FOREIGN KEY (role) REFERENCES role(id))`,
        
        `CREATE TABLE IF NOT EXISTS adoptions 
        (id INT AUTO_INCREMENT,animal UUID(38),user UUID(38),PRIMARY KEY (id, animal),
        FOREIGN KEY (animal) REFERENCES animals(id),FOREIGN KEY (user) REFERENCES users(id))`
    ];

    for (let table in tablesList) {
        connection.query(tablesList[table], (err, results) => {
            if (err) return console.log(`table: ${table} /`, err.sqlMessage, err.code);
            console.log(`table created:`, tablesList[table].slice(26, 38));
        });
    }
});
