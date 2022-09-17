-- MariaDB dump 10.19  Distrib 10.4.19-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: saladejuntas
-- ------------------------------------------------------
-- Server version	10.4.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detalles_usuario`
--

DROP TABLE IF EXISTS `detalles_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalles_usuario` (
  `id_detalles_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_detalles_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_usuario`
--

LOCK TABLES `detalles_usuario` WRITE;
/*!40000 ALTER TABLE `detalles_usuario` DISABLE KEYS */;
INSERT INTO `detalles_usuario` VALUES (1,'Jesus','Montalvo','Zacatecas','4929054346',29,'2022-09-13 14:19:02',NULL,NULL,1);
/*!40000 ALTER TABLE `detalles_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservacion`
--

DROP TABLE IF EXISTS `reservacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservacion` (
  `id_reservacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `hora_inicial` time DEFAULT NULL,
  `hora_final` time DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_reservacion`),
  KEY `reservacion_FK` (`id_usuario`),
  KEY `reservacion_FK_1` (`id_salon`),
  CONSTRAINT `reservacion_FK` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `reservacion_FK_1` FOREIGN KEY (`id_salon`) REFERENCES `salon` (`id_salon`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservacion`
--

LOCK TABLES `reservacion` WRITE;
/*!40000 ALTER TABLE `reservacion` DISABLE KEYS */;
INSERT INTO `reservacion` VALUES (1,1,1,'09:00:00','11:00:00','2022-09-13',NULL,NULL,0),(4,1,1,'12:00:00','02:00:00','2022-09-14',NULL,NULL,0),(5,1,1,'03:00:00','05:00:00','2022-09-14',NULL,NULL,0),(8,1,2,'00:00:00','00:00:00','2022-09-15',NULL,NULL,0),(9,1,2,'13:00:00','15:00:00','2022-09-15',NULL,NULL,0),(10,1,1,'10:00:00','00:28:00','2022-09-15',NULL,NULL,0),(11,1,2,'11:00:00','00:28:00','2022-09-15',NULL,NULL,0),(12,1,1,'17:15:00','00:28:00','2022-09-15',NULL,NULL,0),(13,1,1,'17:00:00','09:16:00','2022-09-15',NULL,NULL,0),(14,1,4,'01:00:00','09:16:00','2022-09-16',NULL,NULL,0),(15,1,4,'02:00:00','09:16:00','2022-09-16',NULL,NULL,0),(16,1,1,'01:00:00','09:16:00','2022-09-16',NULL,NULL,0),(17,1,3,'05:00:00','09:16:00','2022-09-16',NULL,NULL,0),(18,1,2,'10:00:00','09:16:00','2022-09-16',NULL,NULL,0),(19,1,1,'06:00:00','09:16:00','2022-09-17',NULL,NULL,0);
/*!40000 ALTER TABLE `reservacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salon`
--

DROP TABLE IF EXISTS `salon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon` (
  `id_salon` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_salon` varchar(100) NOT NULL,
  `descripcion_salon` varchar(100) DEFAULT NULL,
  `id_salon_estatus` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_salon`),
  KEY `salon_FK` (`id_salon_estatus`),
  CONSTRAINT `salon_FK` FOREIGN KEY (`id_salon_estatus`) REFERENCES `salon_estatus` (`id_salon_estatus`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salon`
--

LOCK TABLES `salon` WRITE;
/*!40000 ALTER TABLE `salon` DISABLE KEYS */;
INSERT INTO `salon` VALUES (1,'Salon uno de prueba','Este es el primer salon de prueba',1,'2022-09-13 22:50:03',NULL,NULL,1),(2,'Salon uno de prueba numero 2','Este es el segundo salon de prueba',1,'2022-09-14 20:30:57',NULL,NULL,1),(3,'Salon Plata','Este es el salon mas grande de todo el estado',1,'2022-09-15 20:01:31',NULL,NULL,1),(4,'Emporio','Este salon se llama emporio',1,'2022-09-16 21:46:32',NULL,NULL,1);
/*!40000 ALTER TABLE `salon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salon_estatus`
--

DROP TABLE IF EXISTS `salon_estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salon_estatus` (
  `id_salon_estatus` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_estatus` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_salon_estatus`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salon_estatus`
--

LOCK TABLES `salon_estatus` WRITE;
/*!40000 ALTER TABLE `salon_estatus` DISABLE KEYS */;
INSERT INTO `salon_estatus` VALUES (1,'Libre','2022-09-13 17:42:40',NULL,NULL,1),(2,'Ocupado','2022-09-13 17:42:40',NULL,NULL,1);
/*!40000 ALTER TABLE `salon_estatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_usuario`
--

DROP TABLE IF EXISTS `tipos_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_usuario` (
  `id_tipos_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(100) NOT NULL,
  `descripcion_tipo_usuario` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_tipos_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_usuario`
--

LOCK TABLES `tipos_usuario` WRITE;
/*!40000 ALTER TABLE `tipos_usuario` DISABLE KEYS */;
INSERT INTO `tipos_usuario` VALUES (1,'Administrador',NULL,'2022-09-13 14:18:34',NULL,NULL,1),(2,'Invitado',NULL,'2022-09-13 14:18:34',NULL,NULL,1);
/*!40000 ALTER TABLE `tipos_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_detalles_usuario` int(11) NOT NULL,
  `id_tipos_usuario` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `active` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  KEY `usuarios_FK` (`id_tipos_usuario`),
  KEY `usuarios_FK_1` (`id_detalles_usuario`),
  CONSTRAINT `usuarios_FK` FOREIGN KEY (`id_tipos_usuario`) REFERENCES `tipos_usuario` (`id_tipos_usuario`),
  CONSTRAINT `usuarios_FK_1` FOREIGN KEY (`id_detalles_usuario`) REFERENCES `detalles_usuario` (`id_detalles_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'test@test.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',1,1,'2022-09-13 19:23:56',NULL,NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-17 13:36:13
