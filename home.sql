--
-- initialize schema
-- 

DROP SCHEMA IF EXISTS home;
CREATE SCHEMA home;
USE home;
SET AUTOCOMMIT=0;

-- 
-- establish test_table
-- 

DROP TABLE IF EXISTS `test_table`;
CREATE TABLE `test_table` (
  `ID` INT(11) NOT NULL AUTO_INCREMENT,
  `User` CHAR(35) NOT NULL DEFAULT 'ANONYMOUS',
  `Message` CHAR(120),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4080 DEFAULT CHARSET=latin1;

--
-- establish user table
-- 

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `userName` CHAR(35) NOT NULL UNIQUE,
    `userPassword` CHAR(64) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO User (userName, userPassword) VALUES ('Anonymous', 'Anonymous');
COMMIT;