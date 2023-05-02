# DAB - Course Assignment 1
# Application Installation and Usage Instructions


# Environment Variables
DB_HOST = [URI_to_Databse]
DB_USER = [USER]
DB_PASSWORD = [PASSWORD]
DB_DB = [DATABASE_NAME]

# Additional Libraries/Packages
"mysql": "^2.18.1"
"nodemon": "^2.0.22"
"passport": "^0.6.0"
"passport-local": "^1.0.0"
"sequelize": "^6.31.1"
"dotenv": "^16.0.3"

# NodeJS Version Used
v18.13.0

# DATABASE
The database is created in app.js between the lines 50-75.
in sumary 'CREATE DATABASE ${process.env.DB_DB}'

# DATAINSERTS
CREATE TABLE IF NOT EXISTS species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS temperament (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS size (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS animals (
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
        ON DELETE RESTRICT);

CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS passwords (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(38) NOT NULL);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    password INT,
    FOREIGN KEY (password)
        REFERENCES passwords(id),
    role INT,
    FOREIGN KEY (role)    
        REFERENCES role(id));

CREATE TABLE IF NOT EXISTS adoptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal INT,
    user INT,
    FOREIGN KEY (animal)    
        REFERENCES animals(id),
    FOREIGN KEY (user)    
        REFERENCES users(id));

# DATABASEACCESS
CREATE USER 'dabcaowner'@'%' IDENTIFIED BY 'dabca1234';
GRANT ALL ON *.* TO "dabcaowner"@"%";

# DATABASEQUERIES