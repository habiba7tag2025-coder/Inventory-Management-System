-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory_db
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typename` varchar(255) NOT NULL,
  `Model` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Smartphone','Samsung Galaxy S24 Ultra','Electronics',800.00,15),(2,'Laptop','Samsung Galaxy Book4','Computers',730.00,10),(3,'Smartwatch','Samsung Galaxy Watch 6','Wearables',295.00,25),(4,'Wireless Earbuds','Samsung Galaxy Buds 3','Accessories',150.00,40),(5,'Smartphone','Apple iPhone 15 Pro','Electronics',999.00,12),(6,'Laptop','Apple MacBook Air M3','Computers',1099.00,8),(7,'Smartwatch','Apple Watch Series 9','Wearables',399.00,20),(8,'Wireless Earbuds','Apple AirPods Pro 2','Accessories',249.00,30),(9,'Tablet','Apple iPad Air 11-inch','Tablets',599.00,14),(10,'Smartphone','Google Pixel 8 Pro','Electronics',799.00,18),(11,'Smartwatch','Google Pixel Watch 2','Wearables',349.00,22),(12,'Wireless Earbuds','Google Pixel Buds Pro','Accessories',199.00,35),(13,'Laptop','Dell XPS 14','Computers',1299.00,7),(14,'Monitor','Dell UltraSharp 27 4K','Displays',450.00,12),(15,'Keyboard','Logitech MX Mechanical','Accessories',170.00,25),(16,'Mouse','Logitech MX Master 3S','Accessories',100.00,50),(17,'Laptop','Lenovo ThinkPad X1 Carbon','Computers',1350.00,9),(18,'Tablet','Lenovo Tab P12','Tablets',350.00,16),(19,'Gaming Console','Sony PlayStation 5','Gaming',499.00,11),(20,'Wireless Earbuds','Sony WF-1000XM5','Accessories',278.00,28),(21,'Headphones','Sony WH-1000XM5','Accessories',399.00,19),(22,'Gaming Console','Microsoft Xbox Series X','Gaming',499.00,10),(23,'Handheld Console','ASUS ROG Ally','Gaming',699.00,15),(24,'Monitor','LG UltraGear 32-inch OLED','Displays',899.00,8),(25,'Smart TV','LG C3 55-inch OLED TV','Displays',1299.00,6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-01 15:46:27
