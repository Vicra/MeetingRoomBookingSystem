# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 10.102.1.183 (MySQL 5.7.17)
# Database: crud
# Generation Time: 2018-04-12 22:11:29 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Department`;

CREATE TABLE `Department` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

LOCK TABLES `Department` WRITE;
/*!40000 ALTER TABLE `Department` DISABLE KEYS */;

INSERT INTO `Department` (`ID`, `Name`, `ImageUrl`)
VALUES
	(1,'Adminstration','http://achatpublicppp.kiubi-web.com/media/592/27420429-administration.jpg'),
	(2,'Beverages','https://thumbs.dreamstime.com/x/soft-drinks-juice-supermarket-21488047.jpg'),
	(3,'Bread/Bakery','http://www.williessupervalu.com/files/williessupervalu/9913/0392/8315/willies_bakery_dept.jpg'),
	(4,'Dairies','https://lh3.googleusercontent.com/-0QoRQWE1MzY/VQMj9TIutbI/AAAAAAAAJuo/D3CaYeiToSM/s640/blogger-image--1981973590.jpg'),
	(5,'Pastas','http://dangerousintersection.org/wp-content/uploads/2008/02/pasta-aisle-lo-res.jpg'),
	(6,'Meats','http://centralfreshmarket.com/wp-content/uploads/sites/7/photo-gallery/meat/meat-001.jpg'),
	(7,'Fruits','http://www.freightncargo.com/sites/default/files/field/image/fruit.png'),
	(8,'Vegetables','https://s-media-cache-ak0.pinimg.com/564x/62/5d/00/625d00e20f70d7e9a7f5974359dbfe32.jpg');

/*!40000 ALTER TABLE `Department` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Logs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Logs`;

CREATE TABLE `Logs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Log` varchar(255) NOT NULL,
  `Time` time NOT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;

INSERT INTO `Logs` (`ID`, `Log`, `Time`, `Date`)
VALUES
	(7,'Table Products Altered : Updated Product Id: 4','08:17:18','2017-02-08'),
	(8,'Table Products Altered : Added Product Name:Mac & Cheese','01:37:04','2017-02-08'),
	(9,'Table Products Altered : Updated Product Id: 10','01:37:17','2017-02-08'),
	(10,'Table Products Altered : Updated Product Id: 6','01:40:23','2017-02-08'),
	(11,'Table Products Altered : Updated Product Id: 6','01:41:00','2017-02-08'),
	(12,'Table Employees Altered : Added Employee Name: Carlos Varela','02:27:42','2017-02-08'),
	(13,'Table Employees Altered : Deleted Employee Id: 16','07:03:10','2017-02-09'),
	(14,'Table Employees Altered : Added Employee Name: Javier Montoya','08:03:21','2017-02-10'),
	(15,'Table Products Altered : Updated Product Id: 1','11:01:24','2017-02-10'),
	(16,'Table Products Altered : Updated Product Id: 1','11:01:33','2017-02-10'),
	(17,'Table Products Altered : Added Product Name:todeletee','11:01:48','2017-02-10'),
	(18,'Table Products Altered : Deleted Product Id: 11','11:01:50','2017-02-10'),
	(19,'Table Employees Altered : Added Employee Name: Carlos Griffin','01:52:53','2017-02-10'),
	(20,'Table Employees Altered : Deleted Employee Id: 15','02:00:39','2017-02-10'),
	(21,'Table Products Altered : Added Product Name:1','04:17:24','2017-09-28'),
	(22,'Table Products Altered : Updated Product Id: 15','04:17:40','2017-09-28'),
	(23,'Table Employees Altered : Deleted Employee Id: 21','04:18:41','2017-09-28');

/*!40000 ALTER TABLE `Logs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `OutOfStock` tinyint(1) DEFAULT '0',
  `Quantity` int(11) NOT NULL,
  `Price` float NOT NULL,
  `DepartmentId` int(11) NOT NULL,
  `ImageUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `DepartmentId` (`DepartmentId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`DepartmentId`) REFERENCES `Department` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`ID`, `Name`, `OutOfStock`, `Quantity`, `Price`, `DepartmentId`, `ImageUrl`)
VALUES
	(1,'Milk',0,100,4.55,4,'http://zdravkom.ru/images/lenta/1807/1/big/moloko_kuvshin_stakan=.jpg'),
	(2,'Apple Juice',0,100,1.55,2,'https://s-media-cache-ak0.pinimg.com/originals/14/43/68/1443687dcefeb1b5c61eea00b93417de.jpg'),
	(3,'Beef',0,100,3.55,6,'http://images.wisegeek.com/raw-beef-with-garnish.jpg'),
	(4,'Bacon',0,100,2.67,6,'http://theheritagecook.com/wp-content/uploads/2010/09/Raw-Thick-Cut-Bacon-iStock.jpg'),
	(5,'Chesse',0,80,2.45,4,'http://www.dairyinstitute.org/wp-content/uploads/2015/02/cheese.jpg'),
	(6,'Orange Juice',0,86,1.45,2,'http://bmedia.fooducate.com/wp-content/uploads/2013/07/Tropicana-Label-Closeup.jpg'),
	(10,'Mac & Cheese',0,80,2.45,5,'http://i2.cdn.turner.com/money/dam/assets/160308090602-kraft-mac-and-chance-780x439.png'),
	(12,'tomatoes',1,100,12.32,3,'http://www.tomatodirt.com/images/homegrown-tomatoes-basket.jpg'),
	(13,'bannanas',1,100,2.34,7,'http://20n75y2uljmj2d1ol13jr210ljx.wpengine.netdna-cdn.com/wp-content/uploads/2014/11/banana_desibantu-1024x400.jpg'),
	(14,'Oranges',0,100,1.34,7,'http://www.onlineguineapigcare.com/wp-content/uploads/2013/08/136863330_3bc6af5174_o.jpg'),
	(15,'1',1,0,1,2,'1');

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Roles`;

CREATE TABLE `Roles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Role` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;

INSERT INTO `Roles` (`ID`, `Role`)
VALUES
	(1,'Admin'),
	(2,'Employee');

/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Salary` float NOT NULL,
  `StartingDate` date NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `DepartmentId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `Salt` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DepartmentId` (`DepartmentId`),
  KEY `RoleId` (`RoleId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`DepartmentId`) REFERENCES `Department` (`ID`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`ID`, `Name`, `Salary`, `StartingDate`, `Email`, `Password`, `DepartmentId`, `RoleId`, `Salt`)
VALUES
(25,'admin',20000,'2018-04-10','admin@gmail.com','81585226e85402edac2bae633d6ee057',1,1,'9ed63d5d-c16a-492e-814e-276ba909093c');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
