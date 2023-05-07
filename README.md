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
CREATE DATABASE adoptiondb;

# DATAINSERTS
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

# DATABASEACCESS
CREATE USER 'dabcaowner'@'%' IDENTIFIED BY 'dabca1234';
GRANT ALL ON *.* TO "dabcaowner"@"%";

## DATABASEQUERIES
# Return the most popular animal name.
SELECT Name FROM animals GROUP BY Name ORDER BY COUNT(*) DESC LIMIT 1;

# Return a list of animals that have been adopted, and the name of the user that adopted them. 
SELECT animals.name, users.name FROM animals LEFT JOIN users ON animals.userId = users.id;

# Return a list of all the animals, sorted by age from youngest to oldest. 
SELECT name, birthday, TIMESTAMPDIFF(YEAR, birthday, CURDATE()) AS age_in_years FROM animals ORDER BY birthday ASC;

# Return all the animals born between 31 December 2017 and 31 December 2020. 
SELECT name, birthday FROM animals WHERE birthday BETWEEN '2017-12-31' AND '2020-12-31';
    
# Return the number of animals per size (return each size and the number). 
SELECT  sizes.name, COUNT(*) FROM sizes, animals WHERE sizes.id = animals.sizeId GROUP BY sizes.name;

# CREATE a trigger to implement the following feature 
# - Whenever a new animal of Species type “Lizard” is added to the database, the last created user will automatically adopt that animal.

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