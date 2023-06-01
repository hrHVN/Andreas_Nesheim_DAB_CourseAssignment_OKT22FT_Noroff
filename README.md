# DAB - Course Assignment 1
This repository is the Course Assignment for the subject "Databases" at Noroff Vocational School.
This file was required to have som "instructions" and all MySQL queries was to be written here. The project it self utelize Sequelize, an ORM-system for Javascript servers.

Furthermore the Project has an "MVC" layout, where Controller is known as Roues.

## Application Installation and Usage Instructions
## Environment Variables
DB_HOST = [URI_to_Databse]
DB_USER = [USER]
DB_PASSWORD = [PASSWORD]
DB_DB = [DATABASE_NAME]

## Additional Libraries/Packages
"mysql": "^2.18.1"
"nodemon": "^2.0.22"
"passport": "^0.6.0"
"passport-local": "^1.0.0"
"sequelize": "^6.31.1"
"dotenv": "^16.0.3"

## NodeJS Version Used
v18.13.0

## DATABASE
CREATE DATABASE adoptiondb;

## DATAINSERTS
CREATE TABLE IF NOT EXISTS species 
 (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS temperaments 
(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS sizes 
(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL);

CREATE TABLE IF NOT EXISTS animals 
(id VARCHAR(38) PRIMARY KEY,name VARCHAR(255) NOT NULL,birthday DATE,species INT,
FOREIGN KEY (species) REFERENCES species(id) ON UPDATE CASCADE ON DELETE RESTRICT,
size INT,FOREIGN KEY (size) REFERENCES sizes(id) ON UPDATE CASCADE ON DELETE RESTRICT, 
temperament INT,FOREIGN KEY (temperament) REFERENCES temperaments(id) ON UPDATE CASCADE ON DELETE RESTRICT);

CREATE TABLE IF NOT EXISTS roles 
(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL);

CREATE TABLE IF NOT EXISTS passwords 
(id INT AUTO_INCREMENT PRIMARY KEY,password VARCHAR(38) NOT NULL);

CREATE TABLE IF NOT EXISTS users 
(id VARCHAR(38) PRIMARY KEY,fullName VARCHAR(255) NOT NULL,userName VARCHAR(255) NOT NULL UNIQUE,
password INT,FOREIGN KEY (password) REFERENCES passwords(id)
,role INT,FOREIGN KEY (role) REFERENCES roles(id));

CREATE TABLE IF NOT EXISTS adoptions 
(id INT AUTO_INCREMENT,animal VARCHAR(38),user VARCHAR(38),PRIMARY KEY (id, animal),
FOREIGN KEY (animal) REFERENCES animals(id),FOREIGN KEY (user) REFERENCES users(id));

INSERT INTO sizes (name) VALUES 
("small"),("medium"),("large");

INSERT INTO temperaments (name) VALUES 
("calm"), ("scared"), ("energetic"), ("happy"), ("lazy");

INSERT INTO roles (name) VALUES 
("admin"), ("member");

INSERT INTO species (name) VALUES 
("Dwarf Hamster"), ("Tedy bear hamster"), ("Jack-Russel"), 
("Budgy"), ("Tortouse"), ("Gold Fish"), 
('Lizzard'), ('Bearder Dragon'), ('Parrot'), 
('Corn snake');

INSERT INTO users (name, username, roleId) VALUES 
("System admin", "Admin", 1);

INSERT INTO passwords (password, userId) VALUES 
("admin1234",1);

INSERT INTO animals (name, birthday, speciesId, sizeId) VALUES
("Coco","2020-02-12", 1, 1), ("Ted", "2021-02-12", 2, 1), ("Coco", "2020-02-12", 3, 2)
, ("Everrest", "2019-02-12", 4,1), ("Rocko", "2020-02-12", 5,2), ("Goldy", "2023-02-12", 6, 1), ("Lizzy", "2020-02-12", 7, 2), ("Goga", "2018-02-12", 8, 3), ("Tweet Tweet", "2020-02-12", 9 ,3), ("Toothless", "2017-02-12", 10, 2), ("Sophie",  "2020-02-12", 1, 1), ("Teddy", "2021-02-12", 2, 1), ("Roger", "2020-02-18", 9, 3);

INSERT INTO animalTempers (animalId, temperamentId) VALUES 
(1,1), (1,2),(2,1), (2,2),(3,3), (4,1), (4,4),(5,1), (5,5),
(6,1), (7,1), (7,5),(8,1), (8,5), (8,2),(9,1), (9,4),
(10,2),(11,1), (11,2),(12,1), (12,2), (13,1),(13,4);

## DATABASEACCESS
CREATE USER 'dabcaowner'@'%' IDENTIFIED BY 'dabca1234';
GRANT ALL ON *.* TO "dabcaowner"@"%";

## DATABASEQUERIES
### Return the most popular animal name.
SELECT Name FROM animals GROUP BY Name ORDER BY COUNT(*) DESC LIMIT 1;

### Return a list of animals that have been adopted, and the name of the user that adopted them. 
SELECT animals.name, users.name FROM animals LEFT JOIN users ON animals.userId = users.id;

### Return a list of all the animals, sorted by age from youngest to oldest. 
SELECT name, birthday, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age_in_years FROM animals ORDER BY birthday ASC;

### Return all the animals born between 31 December 2017 and 31 December 2020. 
SELECT name, birthday FROM animals WHERE birthday BETWEEN '2017-12-31' AND '2020-12-31';
    
### Return the number of animals per size (return each size and the number). 
SELECT  sizes.name, COUNT(*) FROM sizes, animals WHERE sizes.id = animals.sizeId GROUP BY sizes.name;

### CREATE a trigger to implement the following feature 
_- Whenever a new animal of Species type “Lizard” is added to the database, the last created user will automatically adopt that animal._

DELIMITER $$
create trigger auto_adopt_lizzards
	before update on animals for each row
begin
	call getLizzard();
    call getLastUser();
    select max(id) from users;
	begin if new.speciesId = @lizzard then
		set new.userId = @looser;
    end if;
end;
DELIMITER;

DELIMITER $$
create procedure getLizzard(
	out lizzard int
)
begin
    select id 
    into lizzard 
    from species 
    where name = 'lizzard';
end;
DELIMITER;

DELIMITER $$
create procedure getLastUser( 
out looser int
)
begin
	select max(id) 
    into looser
    from users;
end;

DELIMITER;
