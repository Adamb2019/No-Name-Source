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
(1, '1', 'Adam', '102'),
(2, '1', 'Adam', '414'),
(3, '1', 'Adam', '5'),
(4, '1', 'Adam', '173'),
(5, '1', 'Adam', '221'),
(6, '1', 'Adam', '352'),
(7, '1', 'Adam', '959'),
(8, '1', 'Adam', '566');

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
    `Room` text NOT NULL DEFAULT 0 COMMENT 'Current Room',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='penguins';

INSERT INTO `penguins` (`ID`, `Username`, `Nickname`, `Password`, `Email`, `Created`, `LoginKey`, `Approved`, `Active`, `SafeChat`, `Moderator`, `Banned`, `PermaBan`, `Color`, `Coins`, `Head`, `Face`, `Neck`, `Body`, `Hand`, `Feet`, `Photo`, `Flag`, `Rank`) VALUES
(1, 'Adam', 'adam', '$2b$12$XRECcqgjoQ70vjw9XugPW.5uOZ6cB6AiFJP0xY/AOfqS7BFaZMUJe', 'Adam@gmail.com', '2020-06-08 23:44:07', '78d6d71da776e46d20b5f7481cb40d81c9fac8a2', '0', '1', '0', '0', '0', '0', '5', '9999', '414', '0', '173', '221', '0', '352', '959', '566', '6');

DROP TABLE IF EXISTS `Igloo`;
CREATE TABLE `Igloo` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of Igloos',
    `PenguinID` text NOT NULL COMMENT 'Penguin ID',
    `Type` text NOT NULL DEFAULT 0 COMMENT 'Igloo Type',
    `Music` text NOT NULL DEFAULT 0 COMMENT 'Igloo Music',
    `Floor` text NOT NULL DEFAULT 0 COMMENT 'Igloo Floor',
    `Furniture` text NOT NULL DEFAULT 0 COMMENT 'Igloo Furniture',
    `Locked` text NOT NULL DEFAULT 1 COMMENT 'Is Igloo Locked',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='Penguin Igloos';

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

DROP TABLE IF EXISTS `Ip_Bans`;
CREATE TABLE `Ip_Bans` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of Logins',
    `IPAddress` text NOT NULL COMMENT 'Penguin IP Address',
    PRIMARY KEY(`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='IP Ban Records';

INSERT INTO `Ip_Bans` (`IPAddress`) VALUES
('127.0.0.1'); -- also my ip address

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

DROP TABLE IF EXISTS `Rooms`;
CREATE TABLE `Rooms` (
    `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Number of tables',
    `Town` text NOT NULL DEFAULT 0 COMMENT 'Town Center',
    `Coffee_Shop` text NOT NULL DEFAULT 0 COMMENT 'Coffee Shop',
    `Book_Room` text NOT NULL DEFAULT 0 COMMENT 'Book Room',
    `Night Club` text NOT NULL DEFAULT 0 COMMENT 'Dance Club',
    `Arcade` text NOT NULL DEFAULT 0 COMMENT 'Arcade',
    `Clothes_Shop` text NOT NULL DEFAULT 0 COMMENT 'Clothes Shop',
    `Ski_Village` text NOT NULL DEFAULT 0 COMMENT 'Ski Village',
    `Sports_Shop` text NOT NULL DEFAULT 0 COMMENT 'Sports Shop',
    `EPF_Only` text NOT NULL DEFAULT 0 COMMENT 'EPF Room',
    `Ski_Lodge` text NOT NULL DEFAULT 0 COMMENT 'Ski Lodge',
    `Attic` text NOT NULL DEFAULT 0 COMMENT 'Attic',
    `Ski_Hill` text NOT NULL DEFAULT 0 COMMENT 'Ski Hill',
    `Plaza` text NOT NULL DEFAULT 0 COMMENT 'Plaza',
    `Pet_Shop` text NOT NULL DEFAULT 0 COMMENT 'Pet Shop',
    `Dojo` text NOT NULL DEFAULT 0 COMMENT 'Dojo',
    `Dojo_Front` text NOT NULL DEFAULT 0 COMMENT 'Dojo Front',
    `Agent_Command` text NOT NULL DEFAULT 0 COMMENT 'Agent Room',
    `Agent_Solo` text NOT NULL DEFAULT 0 COMMENT 'Agent Solo',
    `Pizza` text NOT NULL DEFAULT 0 COMMENT 'Pizza Parlor',
    `Beach` text NOT NULL DEFAULT 0 COMMENT 'Beach',
    `Lighthouse` text NOT NULL DEFAULT 0 COMMENT 'Light House',
    `Beacon` text NOT NULL DEFAULT 0 COMMENT 'Beacon',
    `Migrator` text NOT NULL DEFAULT 0 COMMENT 'Migrator',
    `Ship_Hold` text NOT NULL DEFAULT 0 COMMENT 'Ship Hold',
    `Quarters` text NOT NULL DEFAULT 0 COMMENT 'Quarters',
    `Crow_Nest` text NOT NULL DEFAULT 0 COMMENT 'Crow Nest',
    `Dock` text NOT NULL DEFAULT 0 COMMENT 'Dock',
    `Snow_Forts` text NOT NULL DEFAULT 0 COMMENT 'Snow Forts',
    `Stadium` text NOT NULL DEFAULT 0 COMMENT 'Stadium',
    `HQ` text NOT NULL DEFAULT 0 COMMENT 'HQ',
    `Boiler` text NOT NULL DEFAULT 0 COMMENT 'Boiler',
    `Iceberg` text NOT NULL DEFAULT 0 COMMENT 'Iceberg',
    `Pool` text NOT NULL DEFAULT 0 COMMENT 'Pool',
    `Mine_Shack` text NOT NULL DEFAULT 0 COMMENT 'Mine Shack',
    `Mine` text NOT NULL DEFAULT 0 COMMENT 'Mine',
    `Forest` text NOT NULL DEFAULT 0 COMMENT 'Forest',
    `Cove` text NOT NULL DEFAULT 0 COMMENT 'Cove',
    `???` text NOT NULL DEFAULT 0 COMMENT '???',
    `Fire_Dojo` text NOT NULL DEFAULT 0 COMMENT 'Fire Dojo',
    `Water_Dojo` text NOT NULL DEFAULT 0 COMMENT 'Water Dojo',
    `Snow_Dojo` text NOT NULL DEFAULT 0 COMMENT 'Snow Dojo',
    `Lake` text NOT NULL DEFAULT 0 COMMENT 'Lake',
    `Underwater` text NOT NULL DEFAULT 0 COMMENT 'Underwater',
    `Astro_Barrier` text NOT NULL DEFAULT 0 COMMENT 'Astro Barrier',
    `Bean_Counters` text NOT NULL DEFAULT 0 COMMENT 'Bean Counters',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='Rooms';

INSERT INTO `Rooms` (`ID`) VALUES
(1)