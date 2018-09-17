-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `auth`;
CREATE TABLE `auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth` (`id`, `username`, `password`) VALUES
(1,	'bob',	'202cb962ac59075b964b07152d234b70');

DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `city` (`id`, `name`) VALUES
(1,	'Gwenborough'),
(2,	'Wisokyburgh'),
(3,	'McKenziehaven'),
(4,	'South Elvis'),
(5,	'Roscoeview'),
(6,	'South Christy');

DROP TABLE IF EXISTS `street`;
CREATE TABLE `street` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `street` (`id`, `name`) VALUES
(1,	'Kulas Light'),
(2,	'Victor Plains'),
(3,	'Douglas Extension'),
(4,	'Hoeger Mall'),
(5,	'Skiles Walks'),
(6,	'Norberto Crossing'),
(7,	'Rex Trail');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `cityId` int(11) DEFAULT NULL,
  `streetId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_beb5846554bec348f6baf449e83` (`cityId`),
  KEY `FK_416b81c6b280f835efb84a2cd9d` (`streetId`),
  CONSTRAINT `FK_416b81c6b280f835efb84a2cd9d` FOREIGN KEY (`streetId`) REFERENCES `street` (`id`),
  CONSTRAINT `FK_beb5846554bec348f6baf449e83` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`id`, `name`, `username`, `email`, `phone`, `cityId`, `streetId`) VALUES
(1,	'Bret Hart',	'BH123',	'bretH@mail.com',	'1-770-736-8031 x56442',	6,	7),
(2,	'Samanta Johnes',	'Antonette',	'Shanna@melissa.tv',	'010-692-6593 x09125',	2,	2),
(3,	'Clementine Bauch',	'Samantha',	'Nathan@yesenia.net',	'1-463-123-4447',	3,	3),
(4,	'Patricia Lebsack',	'Karianne',	'Julianne.OConner@kory.org',	'493-170-9623 x156',	4,	5),
(5,	'Chelsey Dietrich',	'Kamren',	'Lucio_Hettinger@annie.ca',	'(254)954-1289',	2,	4),
(6,	'Mrs. Dennis Schulist',	'Leopoldo_Corkery',	'Karley_Dach@jasper.info',	'1-477-935-8478 x6430',	1,	3),
(7,	'Kurtis Weissnat',	'Elwyn.Skiles',	'Telly.Hoeger@billy.biz',	'210.067.6132',	4,	2),
(8,	'Nicholas Runolfsdottir V',	'Maxime_Nienow',	'Sherwood@rosamond.me',	'586.493.6943 x140',	2,	1),
(9,	'Glenna Reichert',	'Delphine',	'Chaim_McDermott@dana.io',	'(775)976-6794 x41206',	1,	2),
(10,	'Clementina DuBuque',	'Moriah.Stanton',	'Rey.Padberg@karina.biz',	'024-648-3804',	5,	4);

-- 2018-09-14 14:39:24
