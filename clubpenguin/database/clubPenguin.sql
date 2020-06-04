DROP DATABASE IF EXISTS `clubPenguin`;
CREATE DATABASE `clubPenguin`;
USE `clubPenguin`;

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
    `PenguinID` int(10) unsigned NOT NULL COMMENT 'Penguin ID',
    `Username` text NOT NULL COMMENT 'Penguin Username',
    `ItemID` text NOT NULL COMMENT 'Clothing Item ID',
    PRIMARY KEY (`PenguinID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='inventory';

DROP TABLE IF EXISTS `penguins`;
CREATE TABLE `penguins` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Penguin ID',
    `Username` text NOT NULL COMMENT 'Usernames',
    `Nickname` text NOT NULL COMMENT 'Nickname',
    `Password` text NOT NULL COMMENT 'Passwords',
    `Email` text NOT NULL COMMENT 'Emails',
    `Created` text NOT NULL DEFAULT NOW() COMMENT 'Date Created',
    `LoginKey` text NOT NULL COMMENT 'Login Key',
    `Approved` text NOT NULL DEFAULT 0 COMMENT 'Username Approved',
    `Active` text NOT NULL DEFAULT 0 COMMENT 'Is Activated',
    `SafeChat` text NOT NULL DEFAULT 0 COMMENT 'Is Safe Chatted',
    `Moderator` text NOT NULL DEFAULT 0 COMMENT 'Is Moderator',
    `Banned` text NOT NULL DEFAULT 0 COMMENT 'Is Banned',
    `PermaBan` text NOT NULL DEFAULT 0 COMMENT 'Is Banned Forever',
    `Color` text NOT NULL COMMENT 'Penguin Color',
    `Coins` text NOT NULL DEFAULT 500 COMMENT 'Penguin Coins',
    `Head` text NOT NULL DEFAULT 0 COMMENT 'Head Item',
    `Face` text NOT NULL DEFAULT 0 COMMENT 'Face Item',
    `Neck` text NOT NULL DEFAULT 0 COMMENT 'Neck Item',
    `Body` text NOT NULL DEFAULT 0 COMMENT 'Body Item',
    `Hand` text NOT NULL DEFAULT 0 COMMENT 'Hand Item',
    `Feet` text NOT NULL DEFAULT 0 COMMENT 'Feet Item',
    `Photo` text NOT NULL DEFAULT 0 COMMENT 'Background Item',
    `Flag` text NOT NULL DEFAULT 0 COMMENT 'Pin Item',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='penguins';