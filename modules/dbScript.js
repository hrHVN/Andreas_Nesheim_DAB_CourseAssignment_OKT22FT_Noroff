const mySql = require('mysql');
require('dotenv').config();

let connection = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
});

let animals = `CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE,
    FOREIGN KEY (species)    
        REFERENCES species(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    FOREIGN KEY (size)    
        REFERENCES size(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    FOREIGN KEY (temperament)    
        REFERENCES temperament(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)`;
let species = `
CREATE TABLE IF NOT EXISTS species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    )`;
let temperament = `
CREATE TABLE IF NOT EXISTS temperament (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    )`;
let size = `
CREATE TABLE IF NOT EXISTS size (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    )`;
let adoptions = `
CREATE TABLE IF NOT EXISTS adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    FOREIGN KEY (animal)    
        REFERENCES animal(id),
    FOREIGN KEY (user)    
        REFERENCES users(id)
    )`;
let users = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    FOREIGN KEY (password)
        REFERENCES passwords(id),
    FOREIGN KEY (role)    
        REFERENCES role(id)
    )`;
let role = `
CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
    )`;
let passwords = `
CREATE TABLE IF NOT EXISTS passwords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(38) NOT NULL
    )`;


connection.connect((err) => {
    if (err) return console.error(err);

    const tablesList = [
        `CREATE TABLE IF NOT EXISTS species 
        (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
                )`,
        `CREATE TABLE IF NOT EXISTS temperament 
        (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
                )`,
        `CREATE TABLE IF NOT EXISTS size 
        (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL
                )`,
        `CREATE TABLE IF NOT EXISTS animals 
        (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                birthday DATE,

                species INT,
                FOREIGN KEY (species)        
                REFERENCES species(id)
                    ON UPDATE CASCADE
                    ON DELETE RESTRICT,

                size INT,
                FOREIGN KEY (size)    
                    REFERENCES size(id)
                    ON UPDATE CASCADE
                    ON DELETE RESTRICT,

                temperament INT,
                FOREIGN KEY (temperament)    
                    REFERENCES temperament(id)
                    ON UPDATE CASCADE
                    ON DELETE RESTRICT)`,
        `CREATE TABLE IF NOT EXISTS role 
        (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS passwords 
        (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    password VARCHAR(38) NOT NULL)`,
        `CREATE TABLE IF NOT EXISTS users 
        (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    fullName VARCHAR(255) NOT NULL,
                    userName VARCHAR(255) NOT NULL,
                    password INT,
                    FOREIGN KEY (password)
                        REFERENCES passwords(id),
                    role INT,
                    FOREIGN KEY (role)    
                        REFERENCES role(id))`,
        `CREATE TABLE IF NOT EXISTS adoptions 
        (
                    id INT AUTO_INCREMENT,
                    animal INT,
                    user INT,
                    PRIMARY KEY (id, animal),
                    FOREIGN KEY (animal)    
                        REFERENCES animals(id),
                    FOREIGN KEY (user)    
                        REFERENCES users(id))`
    ];

    for (let table in tablesList) {
        connection.query(tablesList[table], (err, results) => {
            if (err) return console.log(`table: ${table} /`, err.sqlMessage, err.code);
            console.log(`table created:`,tablesList[table].slice(26,38));
        });
    }
});
