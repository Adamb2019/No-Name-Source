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
    `Night_Club` text NOT NULL DEFAULT 0 COMMENT 'Dance Club',
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
    `Gold_Mine` text NOT NULL DEFAULT 0 COMMENT 'Gold Mine',
    `Lake` text NOT NULL DEFAULT 0 COMMENT 'Lake',
    `Underwater` text NOT NULL DEFAULT 0 COMMENT 'Underwater',
    `Sound_Room` text NOT NULL DEFAULT 0 COMMENT 'Sound Room'
    `Party` text NOT NULL DEFAULT 0 COMMENT 'Party',
    `Party1` text NOT NULL DEFAULT 0 COMMENT 'Party1',
    `Party2` text NOT NULL DEFAULT 0 COMMENT 'Party2',
    `Party3` text NOT NULL DEFAULT 0 COMMENT 'Party3',
    `Party4` text NOT NULL DEFAULT 0 COMMENT 'Party4',
    `Party5` text NOT NULL DEFAULT 0 COMMENT 'Party5',
    `Party6` text NOT NULL DEFAULT 0 COMMENT 'Party6',
    `Party7` text NOT NULL DEFAULT 0 COMMENT 'Party7',
    `Party8` text NOT NULL DEFAULT 0 COMMENT 'Party8',
    `Party9` text NOT NULL DEFAULT 0 COMMENT 'Party9',
    `Party10` text NOT NULL DEFAULT 0 COMMENT 'Party10',
    `Party11` text NOT NULL DEFAULT 0 COMMENT 'Party11',
    `Party12` text NOT NULL DEFAULT 0 COMMENT 'Party12',
    `Party13` text NOT NULL DEFAULT 0 COMMENT 'Party13',
    `Party14` text NOT NULL DEFAULT 0 COMMENT 'Party14',
    `Party15` text NOT NULL DEFAULT 0 COMMENT 'Party15',
    `Party16` text NOT NULL DEFAULT 0 COMMENT 'Party16',
    `Party17` text NOT NULL DEFAULT 0 COMMENT 'Party17',
    `Party18` text NOT NULL DEFAULT 0 COMMENT 'Party18',
    `Party19` text NOT NULL DEFAULT 0 COMMENT 'Party19',
    `Party20` text NOT NULL DEFAULT 0 COMMENT 'Party20',
    `Party21` text NOT NULL DEFAULT 0 COMMENT 'Party21',
    `Party22` text NOT NULL DEFAULT 0 COMMENT 'Party22',
    `Party23` text NOT NULL DEFAULT 0 COMMENT 'Party23',
    `Party24` text NOT NULL DEFAULT 0 COMMENT 'Party24',
    `Party25` text NOT NULL DEFAULT 0 COMMENT 'Party25',
    `Party26` text NOT NULL DEFAULT 0 COMMENT 'Party26',
    `Party27` text NOT NULL DEFAULT 0 COMMENT 'Party27',
    `Party28` text NOT NULL DEFAULT 0 COMMENT 'Party28',
    `Party99` text NOT NULL DEFAULT 0 COMMENT 'Party99',
    `Party_Solo_1` text NOT NULL DEFAULT 0 COMMENT 'Party_Solo_1',
    `Party_Solo_2` text NOT NULL DEFAULT 0 COMMENT 'Party_Solo_2',
    `Astro_Barrier` text NOT NULL DEFAULT 0 COMMENT 'Astro Barrier',
    `Bean_Counters` text NOT NULL DEFAULT 0 COMMENT 'Bean Counters',
    `Roundup` text NOT NULL DEFAULT 0 COMMENT 'Roundup',
    `Hydro_Hopper` text NOT NULL DEFAULT 0 COMMENT 'Hydro Hopper',
    `Ice_Fishing` text NOT NULL DEFAULT 0 COMMENT 'Ice Fishing',
    `Bean_Counters` text NOT NULL DEFAULT 0 COMMENT 'Bean Counters',
    `Cart_Surfer` text NOT NULL DEFAULT 0 COMMENT 'Cart Surfer',
    `Sled_Racing` text NOT NULL DEFAULT 0 COMMENT 'Sled Racing',
    `Jet_Pack` text NOT NULL DEFAULT 0 COMMENT 'Jet Pack',
    `Mission1` text NOT NULL DEFAULT 0 COMMENT 'Mission1',
    `Mission2` text NOT NULL DEFAULT 0 COMMENT 'Mission2',
    `Thin_Ice` text NOT NULL DEFAULT 0 COMMENT 'Thin Ice',
    `Pizzatron` text NOT NULL DEFAULT 0 COMMENT 'Pizzatron',
    `Mission3` text NOT NULL DEFAULT 0 COMMENT 'Mission3',
    `Wave` text NOT NULL DEFAULT 0 COMMENT 'Wave',
    `Mission4` text NOT NULL DEFAULT 0 COMMENT 'Mission4',
    `Mission5` text NOT NULL DEFAULT 0 COMMENT 'Mission5',
    `Mission6` text NOT NULL DEFAULT 0 COMMENT 'Mission6',
    `Aqua_Grabber` text NOT NULL DEFAULT 0 COMMENT 'Aqua Grabber',
    `Book1` text NOT NULL DEFAULT 0 COMMENT 'Book1',
    `Book2` text NOT NULL DEFAULT 0 COMMENT 'Book2',
    `Book3` text NOT NULL DEFAULT 0 COMMENT 'Book3',
    `Mission7` text NOT NULL DEFAULT 0 COMMENT 'Mission7',
    `Mission8` text NOT NULL DEFAULT 0 COMMENT 'Mission8',
    `Mission9` text NOT NULL DEFAULT 0 COMMENT 'Mission9',
    `Mission10` text NOT NULL DEFAULT 0 COMMENT 'Mission10',
    `Game24` text NOT NULL DEFAULT 0 COMMENT 'Game24',
    `Game25` text NOT NULL DEFAULT 0 COMMENT 'Game25',
    `DJ3K` text NOT NULL DEFAULT 0 COMMENT 'DJ3K',
    `Mission11` text NOT NULL DEFAULT 0 COMMENT 'Mission11',
    `Puffle_Soaker` text NOT NULL DEFAULT 0 COMMENT 'Puffle Soaker',
    `Balloon_Pop` text NOT NULL DEFAULT 0 COMMENT 'Balloon Pop',
    `Ring_the_Bell` text NOT NULL DEFAULT 0 COMMENT 'Ring The Bell',
    `Feed-A-Puffle` text NOT NULL DEFAULT 0 COMMENT 'Feed A Puffle',
    `Memory_Game` text NOT NULL DEFAULT 0 COMMENT 'Memory Game',
    `Puffle_Paddle` text NOT NULL DEFAULT 0 COMMENT 'Puffle Paddle',
    `Puffle_Shuffle` text NOT NULL DEFAULT 0 COMMENT 'Puffle Shuffle',
    `Spin_To_Win` text NOT NULL DEFAULT 0 COMMENT 'Spin To Win',
    `Puffle_Rescue` text NOT NULL DEFAULT 0 COMMENT 'Puffle Rescue',
    `System_Defender` text NOT NULL DEFAULT 0 COMMENT 'System Defender',
    `Ninja_Training` text NOT NULL DEFAULT 0 COMMENT 'Ninja Training',
    `Dance_Contest` text NOT NULL DEFAULT 0 COMMENT 'Dance Contest',
    `Fire_Training` text NOT NULL DEFAULT 0 COMMENT 'Fire Training',
    `Water_Training` text NOT NULL DEFAULT 0 COMMENT 'Water Training',
    `Snow_Training` text NOT NULL DEFAULT 0 COMMENT 'Snow Training',
    `Puffle_Launch` text NOT NULL DEFAULT 0 COMMENT 'Puffle Launch',
    `Bits_&_Bolts` text NOT NULL DEFAULT 0 COMMENT 'Bits & Bolts',
    `Rollerscape` text NOT NULL DEFAULT 0 COMMENT 'Rollerscape',
    `Scorn_Battle` text NOT NULL DEFAULT 0 COMMENT 'Scorn Battle',
    `Smoothie` text NOT NULL DEFAULT 0 COMMENT 'Smoothie',
    `Ice_Jam` text NOT NULL DEFAULT 0 COMMENT 'Ice Jam',
    `DinoDig` text NOT NULL DEFAULT 0 COMMENT 'DinoDig',
    `Party_Game` text NOT NULL DEFAULT 0 COMMENT 'Party Game',
    `SpyDrills` text NOT NULL DEFAULT 0 COMMENT 'SpyDrills',
    `Igloo_Card` text NOT NULL DEFAULT 0 COMMENT 'Igloo Card',
    `Water` text NOT NULL DEFAULT 0 COMMENT 'Card Jistu Water',
    `Snow` text NOT NULL DEFAULT 0 COMMENT 'Card Jistu Snow',
    `Fire` text NOT NULL DEFAULT 0 COMMENT 'Card Jistu Fire',
    `Card_Jistu` text NOT NULL DEFAULT 0 COMMENT 'Card Jistu',
    `My_Penguin` text NOT NULL DEFAULT 0 COMMENT 'My Penguin',
    `Gold_Mine` text NOT NULL DEFAULT 0 COMMENT 'Gold Mine',
    `Welcome` text NOT NULL DEFAULT 0 COMMENT 'Welcome Solo',
    `hideout` text NOT NULL DEFAULT 0 COMMENT 'Ninja Hideout',
    `stage` text NOT NULL DEFAULT 0 COMMENT 'The Stage',
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COMMENT='Rooms';

INSERT INTO `Rooms` (`ID`) VALUES
(1)