DROP DATABASE IF EXISTS `clubPenguin`;
CREATE DATABASE `clubPenguin`;
USE `clubPenguin`;

DROP TABLE IF EXISTS `penguins`;
CREATE TABLE `penguins` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Penguin ID',
    `Username` text NOT NULL COMMENT 'Usernames',
    `Password` text NOT NULL COMMENT 'Passwords',
    `Email` text NOT NULL COMMENT 'Emails',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='penguins';