

DROP TABLE IF EXISTS `Articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Articles`
--

LOCK TABLES `Articles` WRITE;
/*!40000 ALTER TABLE `Articles` DISABLE KEYS */;
INSERT INTO `Articles` VALUES (1,'Datashow','Equipment to show (.ppt)'),(4,'Round table','Great for laptops.'),(5,'Chalkboard','Board that uses only chalk to write in it.'),(6,'Chalk','Equipment to write on chalkboards.'),(7,'Black Marker','Equipment to write on normal boards.'),(8,'Laptop Computer','Laptop for making video calls');
/*!40000 ALTER TABLE `Articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EventTypes`
--

DROP TABLE IF EXISTS `EventTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EventTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EventTypes`
--

LOCK TABLES `EventTypes` WRITE;
/*!40000 ALTER TABLE `EventTypes` DISABLE KEYS */;
INSERT INTO `EventTypes` VALUES (1,'Business Conference','No description'),(2,'SCRUM Meetings','No description'),(3,'Birthdays','No description'),(4,'Team Building','No description'),(12,'Seminars and Conferences','No Description');
/*!40000 ALTER TABLE `EventTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `room_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1,1,'Meeting name','2018-08-13 22:00:00','2018-08-13 22:30:00',28,1),(2,1,'Meeting name 2','2018-08-13 22:31:00','2018-08-13 23:00:00',25,1),(4,1,'Event 2018-08-15 (13:00 - 13:30)','2018-08-15 13:00:00','2018-08-15 13:30:00',25,1),(5,1,'Event 2018-08-15 (12:00 - 12:15)','2018-08-15 12:00:00','2018-08-15 12:15:00',25,1),(6,1,'Event 2018-08-16 (10:00 - 10:15)','2018-08-16 10:00:00','2018-08-16 10:15:00',34,1),(7,1,'Event 2018-08-30 (06:30 - 06:45)','2018-08-30 06:30:00','2018-08-30 06:45:00',34,1),(8,1,'Event 2018-08-17 (06:30 - 06:45)','2018-08-17 06:30:00','2018-08-17 06:45:00',25,1),(9,1,'Event 2018-08-17 (06:45 - 07:00)','2018-08-17 06:45:00','2018-08-17 07:00:00',25,1);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events_Participants`
--

DROP TABLE IF EXISTS `Events_Participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Events_Participants` (
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `confirm_attendance` varchar(45) NOT NULL COMMENT 'yes,no,maybe',
  PRIMARY KEY (`event_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events_Participants`
--

LOCK TABLES `Events_Participants` WRITE;
/*!40000 ALTER TABLE `Events_Participants` DISABLE KEYS */;
INSERT INTO `Events_Participants` VALUES (1,30,'yes'),(1,31,'no'),(1,32,'yes'),(1,33,'maybe'),(2,30,'no'),(2,31,'yes'),(2,32,'maybe'),(2,33,'yes'),(4,25,'no'),(4,30,'no'),(4,31,'no'),(4,33,'no'),(5,25,'no'),(5,30,'no'),(5,31,'no'),(5,33,'no'),(6,33,'no'),(6,34,'no'),(7,31,'no'),(7,33,'no'),(7,34,'no'),(8,25,'no'),(8,34,'no'),(9,25,'no'),(9,34,'no');
/*!40000 ALTER TABLE `Events_Participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logs`
--

DROP TABLE IF EXISTS `Logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Logs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Log` varchar(255) NOT NULL,
  `Time` time NOT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logs`
--

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;
INSERT INTO `Logs` VALUES (7,'Table Products Altered : Updated Product Id: 4','08:17:18','2017-02-08'),(8,'Table Products Altered : Added Product Name:Mac & Cheese','01:37:04','2017-02-08'),(9,'Table Products Altered : Updated Product Id: 10','01:37:17','2017-02-08'),(10,'Table Products Altered : Updated Product Id: 6','01:40:23','2017-02-08'),(11,'Table Products Altered : Updated Product Id: 6','01:41:00','2017-02-08'),(12,'Table Employees Altered : Added Employee Name: Carlos Varela','02:27:42','2017-02-08'),(13,'Table Employees Altered : Deleted Employee Id: 16','07:03:10','2017-02-09'),(14,'Table Employees Altered : Added Employee Name: Javier Montoya','08:03:21','2017-02-10'),(15,'Table Products Altered : Updated Product Id: 1','11:01:24','2017-02-10'),(16,'Table Products Altered : Updated Product Id: 1','11:01:33','2017-02-10'),(17,'Table Products Altered : Added Product Name:todeletee','11:01:48','2017-02-10'),(18,'Table Products Altered : Deleted Product Id: 11','11:01:50','2017-02-10'),(19,'Table Employees Altered : Added Employee Name: Carlos Griffin','01:52:53','2017-02-10'),(20,'Table Employees Altered : Deleted Employee Id: 15','02:00:39','2017-02-10'),(21,'Table Products Altered : Added Product Name:1','04:17:24','2017-09-28'),(22,'Table Products Altered : Updated Product Id: 15','04:17:40','2017-09-28'),(23,'Table Employees Altered : Deleted Employee Id: 21','04:18:41','2017-09-28');
/*!40000 ALTER TABLE `Logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'Admin'),(2,'Employee');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rooms`
--

DROP TABLE IF EXISTS `Rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `people_count` int(11) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rooms`
--

LOCK TABLES `Rooms` WRITE;
/*!40000 ALTER TABLE `Rooms` DISABLE KEYS */;
INSERT INTO `Rooms` VALUES (1,'Meeting Room 1','Room for SCRUM Meetings and Conferences',10,''),(11,'Meeting Room 3','Spare room meeting for social meetings.',5,'');
/*!40000 ALTER TABLE `Rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rooms_Articles`
--

DROP TABLE IF EXISTS `Rooms_Articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rooms_Articles` (
  `room_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`room_id`,`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rooms_Articles`
--

LOCK TABLES `Rooms_Articles` WRITE;
/*!40000 ALTER TABLE `Rooms_Articles` DISABLE KEYS */;
INSERT INTO `Rooms_Articles` VALUES (1,6,5),(1,7,1),(11,1,2),(11,8,1);
/*!40000 ALTER TABLE `Rooms_Articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `salt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `RoleId` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (25,'admin','admin@gmail.com','81585226e85402edac2bae633d6ee057',1,'9ed63d5d-c16a-492e-814e-276ba909093c'),(30,'Mario Nunez','mnunez@sanservices.hn','727a8ec4a74274e5b96353f9c40a46af',2,'7b8e7bd0-9efd-11e8-adec-e194c7915cc1'),(31,'Alejandro Frech','afrech@sanservices.hn','1bea3d6eef15b52efb5fdb0bc828d392',2,'0a023a00-9efe-11e8-adec-e194c7915cc1'),(32,'Jesus Paz','jpaz@sanservices.hn','c20e6bbf41d258a97e0b8c23804f01a9',2,'29417e80-9efe-11e8-adec-e194c7915cc1'),(33,'Alejandro Ferrera','aferrera@sanservices.hn','fcd7d2a0600de2cfad866634d71d716e',2,'3f32b650-9efe-11e8-adec-e194c7915cc1'),(34,'Victor Ramirez','vramirez@sanservices.hn','0dcd153cee44069d32b481c2afe5bd7a',2,'d7006520-a0cc-11e8-b292-110161a84177');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-17 15:28:12
