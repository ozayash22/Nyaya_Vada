-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: law_db
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `law_id` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `chapter_number` int DEFAULT NULL,
  `chapter_title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,1,1,'introduction'),(1,2,2,'general explanations'),(1,3,3,'punishments'),(1,4,4,'general exceptions'),(1,5,5,'abetment'),(1,6,6,'offences against the state'),(1,7,7,'offences relating to the army, navy and air force'),(1,8,8,'offences against the public tranquillity'),(1,9,9,'offences by or relating to public servants'),(1,10,10,'contempt\'s  the lawful authority  public servants'),(1,11,11,'false evidence and offences against public justice'),(1,12,12,'offences relating to coin and government stamps'),(1,13,13,'offences relating to weights and measures'),(1,14,14,'offences affecting the public health, safety, convenience, decency and morals'),(1,15,15,'offences relating to religion'),(1,16,16,'offences affecting the human body'),(1,17,17,'offences against property  theft'),(1,18,18,'offences relating to documents and to property marks'),(1,19,19,'the criminal breach  contracts  service'),(1,20,20,'offences relating to marriage'),(1,21,21,'defamation'),(1,22,22,'criminal intimidation, insult and annoyance'),(1,23,23,'attempts  commit offences'),(3,27,1,'title'),(3,28,2,'title'),(3,29,3,'title'),(3,30,4,'title'),(3,31,5,'title'),(3,32,6,'title'),(3,33,7,'title'),(3,34,8,'title'),(3,35,9,'title'),(3,36,10,'title'),(3,37,11,'title'),(3,38,12,'title'),(3,39,13,'title'),(3,40,14,'title'),(3,41,15,'title'),(3,42,16,'title'),(3,43,17,'title'),(3,44,18,'title'),(3,45,19,'title'),(3,46,20,'title'),(3,47,21,'title'),(3,48,22,'title'),(3,49,23,'title'),(3,50,24,'title'),(3,51,25,'title'),(3,52,26,'title'),(3,53,27,'title'),(3,54,29,'title'),(3,55,30,'title'),(3,56,31,'title'),(3,57,32,'title'),(3,58,34,'title'),(3,59,35,'title'),(3,60,36,'title');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

select * from chapters;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-24  0:54:19
