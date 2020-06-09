DROP DATABASE IF EXISTS `clubPenguin`;
CREATE DATABASE `clubPenguin`;
USE `clubPenguin`;

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE `inventory` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of tables',
    `PenguinID` int(10) unsigned NOT NULL COMMENT 'Penguin ID',
    `Username` text NOT NULL COMMENT 'Penguin Username',
    `ItemID` text NOT NULL COMMENT 'Clothing Item ID',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='inventory';

INSERT INTO `inventory` (`ID`, `PenguinID`, `Username`, `ItemID`) VALUES
(1, '1', 'Adam', '102');

DROP TABLE IF EXISTS `penguins`;
CREATE TABLE `penguins` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Penguin ID',
    `Username` text NOT NULL COMMENT 'Usernames',
    `Nickname` text NOT NULL COMMENT 'Nicknames',
    `Password` text NOT NULL COMMENT 'Passwords',
    `Email` text NOT NULL COMMENT 'Emails',
    `Created` text NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Date Created',
    `LoginKey` text NOT NULL COMMENT 'Login Key',
    `Approved` text NOT NULL DEFAULT 0 COMMENT 'Is Approved',
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
    `Rank` text NOT NULL DEFAULT 0 COMMENT 'Membership Rank',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='penguins';

INSERT INTO `penguins` (`ID`, `Username`, `Nickname`, `Password`, `Email`, `Created`, `LoginKey`, `Approved`, `Active`, `SafeChat`, `Moderator`, `Banned`, `PermaBan`, `Color`, `Coins`, `Head`, `Face`, `Neck`, `Body`, `Hand`, `Feet`, `Photo`, `Flag`) VALUES
(1, 'Adam', 'adam', '$2b$12$XRECcqgjoQ70vjw9XugPW.5uOZ6cB6AiFJP0xY/AOfqS7BFaZMUJe', 'Adam@gmail.com', '2020-06-08 23:44:07', '78d6d71da776e46d20b5f7481cb40d81c9fac8a2', '0', '1', '0', '0', '0', '0', '3', '9999', '414', '0', '170', '0', '321', '358', '9051', '527');

DROP TABLE IF EXISTS `Login`;
CREATE TABLE `Login` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of Logins',
    `PenguinID` text NOT NULL COMMENT 'Penguin ID',
    `Username` text not NULL COMMENT 'Penguin Username',
    `Date` text NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Login Date',
    `IPAddress` text NOT NULL COMMENT 'Penguins IP Address',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='Penguin Login Records';

INSERT INTO `login` (`PenguinID`, `Username`, `Date`, `IPAddress`) VALUES
(1, 'Adam', '2020-06-08 23:44:07', '127.0.0.1'); -- 127.0.0.1 my is my ip address br0

DROP TABLE IF EXISTS `Redemption_Code`;
CREATE TABLE `Redemption_Code` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of tables',
    `Code` text NOT NULL COMMENT 'Redemption Code',
    `Awards` text NOT NULL DEFAULT 1 COMMENT 'Redemption Awards',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='Redemption Code';

INSERT INTO `Redemption_Code` (`Code`, `Awards`) VALUES
('FIRSTCODETEST', '413');

DROP TABLE IF EXISTS `Penguin_Redemption`;
CREATE TABLE `Penguin_Redemption` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of tables',
    `Username` text NOT NULL COMMENT 'Penguin Username',
    `Code` text NOT NULL COMMENT 'Redemption Code',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='Penguin Redemption';

INSERT INTO `Penguin_Redemption` (`Username`, `Code`) VALUES
('Adam', 'FIRSTCODETEST');