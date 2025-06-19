CREATE DATABASE  IF NOT EXISTS `organmart` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `organmart`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: organmart
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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cart_id` bigint DEFAULT NULL,
  `product_id` bigint unsigned DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (32,2,11,1,'2025-06-14 01:52:27','2025-06-14 01:52:27'),(33,2,12,1,'2025-06-14 01:52:30','2025-06-14 01:52:30');
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,11,'2025-05-10 07:28:30','2025-05-10 07:28:30'),(2,14,'2025-06-09 20:39:22','2025-06-09 20:39:22');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `image_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Rau lá','storage/images/category_680146c86994a.png','2025-04-17 11:22:00','2025-04-17 11:25:38'),(3,'Củ quả','storage/images/category_680147b6a9333.png','2025-04-17 11:25:58','2025-04-17 11:25:58'),(4,'Trái cây','storage/images/category_680147d80b8ef.png','2025-04-17 11:26:32','2025-04-17 11:26:32'),(5,'Hạt','storage/images/category_680147f33ee98.png','2025-04-17 11:26:59','2025-04-17 11:26:59'),(6,'Nấm','storage/images/category_6801484760b2c.png','2025-04-17 11:28:23','2025-06-01 23:51:58');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_items`
--

DROP TABLE IF EXISTS `library_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `recipe_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_library_user_idx` (`user_id`),
  KEY `fk_library_recipe_idx` (`recipe_id`),
  CONSTRAINT `fk_library_recipe` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_library_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_items`
--

LOCK TABLES `library_items` WRITE;
/*!40000 ALTER TABLE `library_items` DISABLE KEYS */;
INSERT INTO `library_items` VALUES (1,11,7,'2025-05-14 20:48:06','2025-05-14 20:48:06'),(3,11,4,'2025-05-21 21:12:08','2025-05-21 21:12:08'),(4,11,3,'2025-06-02 21:08:54','2025-06-02 21:08:54'),(5,14,9,'2025-06-09 20:40:01','2025-06-09 20:40:01'),(6,14,7,'2025-06-09 20:40:15','2025-06-09 20:40:15');
/*!40000 ALTER TABLE `library_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(5,'2014_10_12_100000_create_password_resets_table',2),(6,'2019_08_19_000000_create_failed_jobs_table',2),(7,'2019_12_14_000001_create_personal_access_tokens_table',2),(8,'2025_05_07_090014_add_expires_at_to_personal_access_tokens_table',3),(9,'2025_05_15_034712_add_timestamps_to_library_items_table',4),(10,'2025_05_30_063902_add_payment_and_address_to_orders_table',5),(11,'2025_05_30_101226_create_permission_tables',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (2,'App\\Models\\User',11),(1,'App\\Models\\User',13),(2,'App\\Models\\User',14),(2,'App\\Models\\User',15);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`),
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (34,16,9,1,10000,'2025-05-29 23:41:30','2025-05-29 23:41:30'),(35,17,8,2,30000,'2025-05-30 00:06:35','2025-05-30 00:06:35'),(36,18,11,1,10000,'2025-05-30 00:10:12','2025-05-30 00:10:12'),(37,19,9,3,10000,'2025-05-30 00:13:28','2025-05-30 00:13:28'),(38,20,5,2,38000,'2025-05-30 00:23:44','2025-05-30 00:23:44'),(39,20,6,2,40000,'2025-05-30 00:23:44','2025-05-30 00:23:44'),(40,21,6,1,40000,'2025-05-30 00:25:21','2025-05-30 00:25:21'),(41,21,5,1,38000,'2025-05-30 00:25:21','2025-05-30 00:25:21'),(42,22,10,1,16500,'2025-05-30 00:32:03','2025-05-30 00:32:03'),(43,23,10,1,16500,'2025-05-30 02:49:32','2025-05-30 02:49:32'),(44,24,11,1,10000,'2025-06-01 19:53:27','2025-06-01 19:53:27'),(45,24,10,1,16500,'2025-06-01 19:53:27','2025-06-01 19:53:27'),(46,24,8,1,30000,'2025-06-01 19:53:27','2025-06-01 19:53:27'),(47,24,7,1,25000,'2025-06-01 19:53:27','2025-06-01 19:53:27'),(48,25,13,2,6500,'2025-06-02 21:11:28','2025-06-02 21:11:28'),(49,25,12,1,11000,'2025-06-02 21:11:28','2025-06-02 21:11:28'),(50,25,5,1,38000,'2025-06-02 21:11:28','2025-06-02 21:11:28'),(51,26,13,2,6500,'2025-06-09 20:39:38','2025-06-09 20:39:38'),(52,26,12,1,11000,'2025-06-09 20:39:38','2025-06-09 20:39:38');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `total` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `delivery_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (16,11,'canceled',10000,'2025-05-29 23:41:30','2025-05-30 00:02:27','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(17,11,'canceled',60000,'2025-05-30 00:06:35','2025-05-30 00:06:52','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(18,11,'canceled',10000,'2025-05-30 00:10:12','2025-05-30 00:10:26','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(19,11,'completed',30000,'2025-05-30 00:13:28','2025-06-02 21:05:47','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(20,11,'completed',156000,'2025-05-30 00:23:44','2025-06-02 21:05:44','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(21,11,'completed',78000,'2025-05-30 00:25:21','2025-06-02 21:05:41','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(22,11,'completed',16500,'2025-05-30 00:32:03','2025-06-02 21:05:38','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(23,11,'completed',16500,'2025-05-30 02:49:32','2025-06-02 21:05:33','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(24,11,'completed',81500,'2025-06-01 19:53:27','2025-06-02 21:11:03','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(25,11,'completed',62000,'2025-06-02 21:11:28','2025-06-09 18:28:40','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam'),(26,14,'pending',24000,'2025-06-09 20:39:38','2025-06-09 20:39:38','COD','17/5D Bình Lợi, Phường 13, Bình Thạnh, Hồ Chí Minh, Việt Nam');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'manage.categories','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(2,'manage.products','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(3,'manage.recipes','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(4,'manage.cart','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(5,'manage.orders','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(6,'manage.library_items','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(7,'dashboard.view','web','2025-05-30 03:18:00','2025-05-30 03:18:00');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',11,'mobile','0e0d526794aaa1d511ded6e0de2e6ccab19e340079e512cca4d517f8e8faa94a','[\"*\"]',NULL,'2025-05-07 02:01:02','2025-05-07 02:01:02',NULL),(2,'App\\Models\\User',12,'mobile','f47772684fe2bcd042c2e462572639e90fa04aedc7c65700ef38509a5215880a','[\"*\"]',NULL,'2025-05-07 02:01:18','2025-05-07 02:01:18',NULL),(3,'App\\Models\\User',11,'mobile','cc3dd79e06a0a69ef8907da52dc21807b385f6b677fd11db894417aae8d14995','[\"*\"]','2025-05-07 02:43:54','2025-05-07 02:43:54','2025-05-07 02:43:54',NULL),(4,'App\\Models\\User',11,'mobile','c604a5c8b377310ade95c7ad203d9f91026e84479f4f8e96c1d05b65b97caa09','[\"*\"]','2025-05-07 03:18:41','2025-05-07 03:18:41','2025-05-07 03:18:41',NULL),(5,'App\\Models\\User',11,'mobile','a3033c66e4155763242a6a1ffc74adc5c1a9a04c4faa7d87289844602ea049c8','[\"*\"]','2025-05-10 18:13:14','2025-05-10 07:19:29','2025-05-10 18:13:14',NULL),(6,'App\\Models\\User',11,'mobile','2fd0883dc4d2e2981f923544d825c0b352262bcb57bbdfb2f7fcb15e5dbb98c0','[\"*\"]','2025-05-13 23:48:42','2025-05-10 18:22:48','2025-05-13 23:48:42',NULL),(7,'App\\Models\\User',11,'mobile','4e9bcfbd719c6e22e5a28c643300f7a3d6035695fa2a8490f91e290c4ea727a0','[\"*\"]','2025-05-14 01:36:31','2025-05-13 23:58:03','2025-05-14 01:36:31',NULL),(8,'App\\Models\\User',11,'mobile','4de587b2fabb97b494ad11306343a3ed0adb08dc339f0ebb92381284ee5ab9a8','[\"*\"]','2025-05-14 01:53:28','2025-05-14 01:38:17','2025-05-14 01:53:28',NULL),(9,'App\\Models\\User',11,'mobile','dd0709f78c258255dbd5323f57dbf4a1aea7b97e527ff41ba2000195e76b090b','[\"*\"]','2025-05-14 19:19:29','2025-05-14 19:19:29','2025-05-14 19:19:29',NULL),(10,'App\\Models\\User',11,'mobile','64b3c251f03d8b46dfc9bd950c73df78178119612733dfc24abc8e14a972f4bf','[\"*\"]','2025-05-14 19:19:31','2025-05-14 19:19:30','2025-05-14 19:19:31',NULL),(11,'App\\Models\\User',11,'mobile','7aca08b15f778b9336e0719457c85792ae579bb2dfb94e14e4fa98d139601140','[\"*\"]','2025-05-14 20:37:23','2025-05-14 19:21:36','2025-05-14 20:37:23',NULL),(12,'App\\Models\\User',11,'mobile','a1efd450aa25f0dd5918358cc4560d60cae2e5e2f986815fa9b0acbaba3d695e','[\"*\"]','2025-06-03 00:46:25','2025-05-14 20:38:08','2025-06-03 00:46:25',NULL),(13,'App\\Models\\User',13,'mobile','a605c4cd4c99a3c490125ea52233da5f2be3c40b69b307a2d392e01c9982ae2a','[\"*\"]',NULL,'2025-05-31 01:41:45','2025-05-31 01:41:45',NULL),(14,'App\\Models\\User',13,'mobile','8521684ab5534f59adc9e8869eb834033012b6efb1df87a4541fc2c45dd42c32','[\"*\"]',NULL,'2025-05-31 18:16:20','2025-05-31 18:16:20',NULL),(15,'App\\Models\\User',13,'mobile','5d3713a5c18d9ef238888e10074bfea47d3db7fcd738156b53b438980b5de6b0','[\"*\"]',NULL,'2025-05-31 18:18:47','2025-05-31 18:18:47',NULL),(16,'App\\Models\\User',13,'mobile','3e8f668a0a73096a4c93b3bc3b1fd1bb4f6ba6b34b636fe6c49ec29c0f75c6aa','[\"*\"]',NULL,'2025-05-31 18:18:49','2025-05-31 18:18:49',NULL),(17,'App\\Models\\User',13,'mobile','133ceb7adbb42ad64c3eae3af5caa343d2d2e36fba8749ff82a36a40b9625c59','[\"*\"]',NULL,'2025-05-31 18:18:54','2025-05-31 18:18:54',NULL),(18,'App\\Models\\User',13,'mobile','f449fe9a3214088047e82e549dcfc8d3f2380fe02c8a50f2fca8107174d042db','[\"*\"]',NULL,'2025-05-31 18:39:25','2025-05-31 18:39:25',NULL),(19,'App\\Models\\User',13,'mobile','e06e10f5e22d70165c58a8f29a8dd5d167c2621726abfe65b3978966868a1b26','[\"*\"]',NULL,'2025-05-31 18:40:54','2025-05-31 18:40:54',NULL),(20,'App\\Models\\User',13,'mobile','9c1e27d992f2fc582b3fb6e9e34fc940e7cfa3fc7ff36a28521d3703f4e16f8d','[\"*\"]',NULL,'2025-05-31 18:40:57','2025-05-31 18:40:57',NULL),(21,'App\\Models\\User',13,'mobile','8b9bd739b35d5abcc4190e892b49cb4f9fa5c213c68e26fcea92c090defe1ed1','[\"*\"]',NULL,'2025-05-31 18:40:57','2025-05-31 18:40:57',NULL),(22,'App\\Models\\User',13,'mobile','d033893e55ca7c6752b9f130de8da19b10b861c08dede7b12511fe1f1a6e0f96','[\"*\"]',NULL,'2025-05-31 18:40:58','2025-05-31 18:40:58',NULL),(23,'App\\Models\\User',13,'mobile','c501686fff28f0e31863bcc3ed258a9f8fd8571c6cf23727719a2eaa4f37e4e8','[\"*\"]',NULL,'2025-05-31 18:41:18','2025-05-31 18:41:18',NULL),(24,'App\\Models\\User',13,'mobile','15b3d285e555a88c567d8dd451c35bbd43e991cb109281f217fcddcc43d1483c','[\"*\"]',NULL,'2025-05-31 18:41:21','2025-05-31 18:41:21',NULL),(25,'App\\Models\\User',13,'mobile','45145560f67dd7f7229ae067715095e330fe4c3e0189cfeef786e9e0ab822db3','[\"*\"]',NULL,'2025-05-31 18:43:28','2025-05-31 18:43:28',NULL),(26,'App\\Models\\User',13,'mobile','bfddf075cd474b81caa9755eabc5a4f7ed1f4c025b7223f9496dca17a3309a26','[\"*\"]',NULL,'2025-05-31 18:56:39','2025-05-31 18:56:39',NULL),(27,'App\\Models\\User',13,'mobile','75852d1281d7c4e7a0603738a8e44ff53608885f10705f558726c195ffdfaa7e','[\"*\"]',NULL,'2025-05-31 18:56:54','2025-05-31 18:56:54',NULL),(28,'App\\Models\\User',13,'mobile','44393d569d75dcd8345e5c7ad53088afe10654d28379893bc63cabe8733d64fb','[\"*\"]',NULL,'2025-05-31 18:57:10','2025-05-31 18:57:10',NULL),(29,'App\\Models\\User',13,'mobile','02b5a961ca7ccc4a2fceb839e93a7c3120cf77eaf696b780f41a7558eee66035','[\"*\"]',NULL,'2025-05-31 19:02:13','2025-05-31 19:02:13',NULL),(30,'App\\Models\\User',13,'mobile','0be920152f48deb5adcd30bcff98bcf433b7f304a66175859da604fe16d70002','[\"*\"]',NULL,'2025-05-31 19:02:34','2025-05-31 19:02:34',NULL),(31,'App\\Models\\User',13,'mobile','e2b9a9b05972ed3372115707b1443d82ab747639c5497f536db590eae5c66e74','[\"*\"]',NULL,'2025-05-31 19:03:05','2025-05-31 19:03:05',NULL),(32,'App\\Models\\User',13,'mobile','ef96b59d0606432fbafec41781fdcd36f9ae3a59c08c65a42b8de93104afa919','[\"*\"]',NULL,'2025-05-31 19:23:38','2025-05-31 19:23:38',NULL),(33,'App\\Models\\User',13,'mobile','a0c009c5f3313be5d763daf344215a6aefc6637ce5cf7302778c51159bd1da88','[\"*\"]',NULL,'2025-05-31 19:23:38','2025-05-31 19:23:38',NULL),(34,'App\\Models\\User',13,'mobile','5aad393a3fbd444fb7a3951fd423f29cc4a0e6c94948bc333b195ce7167c94d5','[\"*\"]',NULL,'2025-05-31 19:23:38','2025-05-31 19:23:38',NULL),(35,'App\\Models\\User',13,'mobile','47d3db74b99b7e96559db66394fbbf52e304c5386cac72734e1a38b060e3008d','[\"*\"]',NULL,'2025-05-31 19:29:20','2025-05-31 19:29:20',NULL),(36,'App\\Models\\User',13,'mobile','9a5e25f49a07163e798d94271965327378528fa3c005c3a6ce89fd469d9ceac7','[\"*\"]',NULL,'2025-05-31 19:32:24','2025-05-31 19:32:24',NULL),(37,'App\\Models\\User',13,'mobile','6fdcf12364c4c3efff3edff165d755e4a499ab254a6450ad7c577261c674dfe2','[\"*\"]',NULL,'2025-05-31 19:36:59','2025-05-31 19:36:59',NULL),(38,'App\\Models\\User',13,'mobile','0e2c6186d8d927babd45e402867b564fd6e295debfcc541787ce54ddef24b7b0','[\"*\"]',NULL,'2025-05-31 19:39:33','2025-05-31 19:39:33',NULL),(39,'App\\Models\\User',13,'mobile','b8c5b6cacb3251b7afb3d67e9ee97a7be635868d5507547b0cc3788736884f3b','[\"*\"]',NULL,'2025-05-31 19:39:36','2025-05-31 19:39:36',NULL),(40,'App\\Models\\User',13,'mobile','2e9570309f6585bf3bbec1955426dd90245afb0a98ab81e59257c865b53e9937','[\"*\"]',NULL,'2025-05-31 19:39:48','2025-05-31 19:39:48',NULL),(41,'App\\Models\\User',13,'admin-token','09ff86ba81a6a2e93430356588126e2dbc075df189937aaaf31fef45712a5270','[\"*\"]',NULL,'2025-05-31 19:59:08','2025-05-31 19:59:08',NULL),(42,'App\\Models\\User',13,'admin-token','e9d7b9f6def92e056a179e2d49d0819bc6a39218d35172d8c1709a123e56b4ba','[\"*\"]',NULL,'2025-05-31 20:07:57','2025-05-31 20:07:57',NULL),(43,'App\\Models\\User',13,'admin-token','3e1a2e93931cca06f6894977b2d84afdb1b21fbc7b8e8d8d372a0c7203f3597b','[\"*\"]',NULL,'2025-05-31 20:13:13','2025-05-31 20:13:13',NULL),(44,'App\\Models\\User',13,'admin-token','d0bd49d9f008fc0e40793c3829ee314957c68cfd1205cc4400a6c1a670a8c86b','[\"*\"]',NULL,'2025-05-31 20:47:33','2025-05-31 20:47:33',NULL),(45,'App\\Models\\User',13,'admin-token','ee9d3804099e01518909d3063ea18ff64da3aef9eb1f95804b6ed0ecf0164502','[\"*\"]',NULL,'2025-05-31 20:47:34','2025-05-31 20:47:34',NULL),(46,'App\\Models\\User',13,'admin-token','20a1a29992bbbfcebe9bb7c8b9a75352b2d07d9b7455a9cf59b2ef5bfdcf7294','[\"*\"]',NULL,'2025-05-31 22:00:01','2025-05-31 22:00:01',NULL),(47,'App\\Models\\User',13,'admin-token','ae6d7eb7ff5a618ef97d20b9f49ab409d9e4094f115dc97d6b3f8dcdce982d3d','[\"*\"]',NULL,'2025-05-31 22:03:47','2025-05-31 22:03:47',NULL),(48,'App\\Models\\User',13,'admin-token','c6382822ebefc84d586688d02c3cc5c48dc81d286a85d6826fd2d3b57ec79a1f','[\"*\"]',NULL,'2025-05-31 22:07:01','2025-05-31 22:07:01',NULL),(49,'App\\Models\\User',14,'mobile','a8be663c6717a781413722e93c321875160a4973b8b5a8631bf47829ea8a57aa','[\"*\"]','2025-06-14 02:09:15','2025-06-09 19:06:40','2025-06-14 02:09:15',NULL);
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_supplier`
--

DROP TABLE IF EXISTS `product_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_supplier` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  `supply_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_supplier`
--

LOCK TABLES `product_supplier` WRITE;
/*!40000 ALTER TABLE `product_supplier` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int DEFAULT NULL,
  `image_url` text,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'Cà rốt','Cà rốt tươi ngon, màu cam tươi, vỏ trơn láng, có màu sáng. Cà rốt không bị mềm, dập hay bị héo. Cà rốt giòn ngọt, được lựa chọn cho nhiều món ngon.',12000.00,15,'storage/images/product_68014c014be8f.png',3,'2025-04-17 11:44:17','2025-04-17 19:13:34'),(4,'Hành tây','Hành tây là loại củ mọc dưới lòng đất, được trồng phổ biến trên toàn thế giới và có quan hệ gần với hẹ, tỏi và hành lá. Đây là nguyên liệu chủ yếu trong nhiều món ăn, được chế biến rất đa dạng, từ nướng, luộc, chiên, rang, xào, lăn bột hoặc thậm chí là ăn sống. Hành tây chứa khá nhiều vitamin và khoáng chất có công dụng cho sức khỏe như: giúp điều hòa đường huyết, cải thiện sức khỏe xương, ngăn ngừa ung thư, tăng cường hệ miễn dịch.',35000.00,15,'storage/images/product_68196fa307b9a.png',3,'2025-05-05 19:10:43','2025-05-05 19:10:43'),(5,'Bắp cải trắng','Bắp cải trắng (bắp sú) luôn là nguyên liệu quen thuộc trong căn bếp của mọi gia đình Việt. Bắp cải có vị ngọt thanh đặc trưng và độ giòn nhất định. Không những thế chúng còn được xem như một nam châm hút bệnh ra khỏi cơ thể, nhất là giúp cơ thể giảm đau, trị ho, đờm, loét dạ dày… Theo các nghiên cứu y học thì bắp cải là loại củ giàu hàm lượng vitamin A, C, chất chống ung thư giúp gia tăng các tế bào hồng cầu, giải độc cơ thể.',38000.00,15,'storage/images/product_68197028a645e.png',3,'2025-05-05 19:12:56','2025-05-05 19:12:56'),(6,'Bắp cải thảo','Cải thảo là một loại rau gần như là phổ biến đối với tất cả mọi người. Bắp cải thảo còn có nhiều tên gọi khác như: cải bao, cải cuốn, bắp cải tây,..\nCải thảo có kích thước khá dài khoảng 20 - 30cm, lá mọc cuộn vào nhau thành một kết cấu chặt chẽ và chụm lại ở gốc khá giống với bắp cải (bắp sú) Kết cấu của một cây cải thảo hình trụ dài, hơi thuôn nhọn ở phần đầu.',40000.00,12,'storage/images/product_6819707ccf1f3.png',3,'2025-05-05 19:14:20','2025-05-05 19:14:20'),(7,'Bí xanh','Bí xanh hay còn gọi là bí đao, bí phấn, bí dài, bí chanh, bí đá, bí gối, bù rợ, đông qua… là một loại củ dùng để làm nấu ăn và đặc biệt hơn là có thể làm mứt. Bí xanh là một dạng dây leo, khi già trái sẽ dài và xuất hiện lớp phấn và lông cứng bao quanh. Bí ngon, ngọt và thơm.',25000.00,13,'storage/images/product_68197114542e5.png',3,'2025-05-05 19:16:52','2025-05-06 19:02:27'),(8,'Khoai tây','Khoai tây thuộc họ cà, là một loại củ đa năng có hàm lượng chất dinh dưỡng cao, vì vậy nhiều hộ gia đình tại Việt Nam đã lựa chọn khoai tây như một món ăn chính trong các bữa ăn hàng ngày. Sở hữu nguồn vitamin và khoáng chất phong phú, khoai tây mang lại nhiều lợi ích cho sức khỏe như kháng viêm, giảm đau, tăng cường hệ miễn dịch, kích thích tiêu hóa.',30000.00,12,'storage/images/product_681971501a776.png',3,'2025-05-05 19:17:52','2025-05-05 19:17:52'),(9,'Cải bẹ dún','Hàng đảm bảo tươi ngon, không dập nát: Cải được chọn lọc kỹ, lá xanh mướt, giòn, không úa vàng hay hư hỏng.\n\nĐảm bảo nguồn gốc xuất xứ rõ ràng: Cam kết thông tin minh bạch về nơi trồng, số lượng và khối lượng sản phẩm.\n\nĐặt hàng và giao nhanh: Bạn có thể đặt online và nhận rau tươi trong ngày, tiện lợi và tiết kiệm thời gian.',10000.00,12,'storage/images/product_681987273d382.png',2,'2025-05-05 20:51:03','2025-05-05 20:51:03'),(10,'Mướp hương','Mướp hương có màu xanh đậm hoặc xanh nhạt, vỏ thô ráp. Mướp hương ngọt, ngon và thơm nhẹ.\nMướp hương được đảm bảo nguồn gốc xuất xứ.',16500.00,12,'storage/images/product_683d5d10602b2.png',3,'2025-05-06 19:44:39','2025-06-02 01:13:04'),(11,'Dưa leo','Dưa leo tươi, ngon, căng, mập mạp. Dưa leo giòn, ngọt cực kỳ ngon và chất lượng.\nDưa leo đảm bảo nguồn gốc xuất xứ rõ ràng.',10000.00,12,'storage/images/product_683d5d1b16920.png',3,'2025-05-06 19:45:53','2025-06-02 01:13:15'),(12,'Rau mồng tơi','Rau mồng tơi có nhiều công dụng tốt cho sức khỏe nhờ vào hàm lượng calo và chất béo thấp, nhưng lại chứa lượng lớn vitamin, khoáng chất thiết yếu như kali, canxi, magie, đồng, sắt,...và chứa nhiều chất chống oxy hóa.',11000.00,12,'storage/images/product_683e558539901.png',2,'2025-06-02 18:45:09','2025-06-02 18:55:16'),(13,'Rau cần tàu (cần ta)','Rau cần tàu, hay còn gọi là cần ta, là một loại rau thơm quen thuộc trong ẩm thực Việt Nam, đặc biệt là ở các vùng quê. Với thân cây nhỏ, lá xanh mướt và hương thơm đặc trưng, hơi hăng nhẹ, rau cần tàu (cần ta) không chỉ là một loại rau ăn kèm mà còn là nguyên liệu không thể thiếu trong nhiều món ăn truyền thống.',6500.00,12,'storage/images/product_683e565d49bb4.png',2,'2025-06-02 18:56:45','2025-06-02 18:56:45');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `instructions` text,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ingredients` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Gà kho gừng','<p><strong>Bước 1</strong>: Sơ chế thịt gà cho sạch và chặt thành từng cục vừa ăn. Gừng cạo sạch vỏ và thái sợi.</p><p><strong>Bước 2</strong>: Ướp thịt gà trong một cái tô cùng với một ít bột ngọt, hạt nêm, muối, nước mắm, đường, tương ớt, nước màu trong 10 -15 phút.</p><p><strong>Bước 3</strong>: Bắt nồi lên bếp, phi vàng tỏi rồi cho thịt gà đã ướp vào nấu trong 2 phút cho thêm nước lọc vào vừa ngập thịt gà. Tiếp tục nấu trong khoảng 20 phút ở lửa vừa, nêm nếm lại cho vừa ăn rồi cho gừng và tiêu vào hoàn thành món ăn.</p>','storage/images/recipe_683e60fb1e87a.png','2025-05-06 00:14:03','2025-06-02 19:44:14','<ul><li>500g thịt gà</li><li>Gừng, tỏi, ớt</li><li>Gia vị: Bột ngọt, hạt nêm, muối, nước mắm, đường, tương ớt, nước màu, tiêu</li></ul>'),(3,'Thịt heo kho thơm','<p><strong>Bước 1:</strong> Sơ chế thịt heo sạch rồi thái thành từng miếng vừa ăn tầm 0.5cm. Dứa thì ta sẽ cắt bỏ bớt phần cùi, sau đó thái lát dày tầm 1cm nhé. Còn tỏi, ớt (chỉ lấy 1 trái) và hành tím thì sẽ băm nhuyễn.</p><p><strong>Bước 2:</strong> Ướp thịt với nước tương, hạt nêm, tiêu, ớt bột, ½ muỗng canh đường và tỏi, ớt, hành tím băm trong 30 phút. Thơm miếng ướp với 3/2 muỗng canh đường trong 20 phút.</p><p><strong>Bước 3: </strong>Cho dứa lên bếp và sên với đường ở lửa vừa để cho đường thấm vào bên trong dứa, đến khi nào phần nước hơi khô lại thì tắt bếp (khoảng 5 phút).</p><p><strong>Bước 4:</strong> Bắt nồi lên bếp cho ½ thìa cà phê tỏi, ớt và hành tím băm nhuyễn vào phi vàng thơm. Cho phần thịt đã được ướp gia vị vào trong nồi, xào đến khi săn lại rồi cho nước dừa và thơm đã sên vào. Sau đó hạ lửa nhỏ và kho trong 20 phút rồi nêm nếm lại rồi tắt bếp.</p>','storage/images/recipe_68244ed9558ed.png','2025-05-14 01:05:45','2025-05-14 01:05:45','<ul><li>300g thịt ba rọi (thịt ba chỉ)</li><li>150g dứa</li><li>2 trái ớt</li><li>2 tép tỏi</li><li>3 củ hành tím</li><li>300ml nước dừa tươi</li><li>1 muỗng canh hành lá cắt nhỏ</li><li>Gia vị: Hạt nêm, đường, nước tương, dầu ăn, tiêu</li></ul>'),(4,'Thịt heo kho sả ớt','<p><strong>Bước 1:</strong> Thịt heo sơ chế sạch, cắt thành từng miếng vừa ăn. Sả rửa sạch, hành tím lột vỏ rồi để ráo và đem đi băm nhuyễn.</p><p><strong>Bước 2:</strong> Ướp thịt với hạt nêm, đường, bột ngọt, tiêu, tương ớt, hành tím và phần sả băm rồi đảo đều, để thấm gia vị trong 30 phút.</p><p><strong>Bước 3:</strong> Bắc chảo lên bếp cho 2 muỗng canh dầu ăn, 2 muỗng canh đường để làm nước màu. Sau đó, cho thịt heo vào đảo đều đến khi săn lại, cho thêm 3 muỗng canh nước mắm và một ít nước kho ở lửa vừa trong 15 phút, nêm nếm lại cho vừa ăn, rồi tắt bếp.</p>','storage/images/recipe_68244f2da9222.png','2025-05-14 01:07:09','2025-05-14 01:07:09','<ul><li>200g thịt heo</li><li>2 cây sả</li><li>1 củ hành tím</li><li>Gia vị: Đường, muối, hạt nêm, bột ngọt, nước mắm, tiêu</li></ul>'),(5,'Cá mối khô chiên đường','<p><strong>Bước 1:</strong> Làm sạch cá mối và cắt thành khúc vừa ăn. Sau đó, chiên sơ cá mối cho vàng đều.</p><p><strong>Bước 2:</strong> Pha hỗn hợp nước đường với ½ chén nước lọc, cho vào 3 muỗng canh đường, ½ muỗng cà phê muối, ½ muỗng cà phê bột ngọt, sau đó khuấy đều cho tan.</p><p><strong>Bước 3: </strong>Từ chảo dầu chiên ban đầu bạn cho toàn bộ hỗn hợp nước đường vào khuấy đều cho sệt và khi chuyển sang màu vàng thì cho cá mối vào đảo đều là được.</p>','storage/images/recipe_68244f7875d39.png','2025-05-14 01:08:24','2025-05-14 01:08:24','<ul><li>2 con cá mối khô</li><li>Gia vị: Đường, dầu ăn, muối, bột ngọt</li></ul>'),(6,'Cá bạc má chiên giấm','<p><strong>Bước 1:</strong> Cá bạc má làm sạch. Tỏi bạn lột vỏ và băm nhỏ. Hành lá rửa sạch và cắt khúc nhỏ.</p><p><strong>Bước 2:</strong>Làm nước sốt giấm với 3 muỗng canh giấm, 2.5 muỗng canh đường, 1 muỗng cà phê muối, 1/2 muỗng cà phê bột ngọt và khuấy đều.</p><p><strong>Bước 3:</strong> Bắc chảo lên bếp phi thơm tỏi và cho cá vào chiên. Sau đó, cho nước giấm đã pha vào và nấu đến khi sệt lại, nêm cho vừa ăn rồi rắc hành lá lên.</p>','storage/images/recipe_68244fc005374.png','2025-05-14 01:09:36','2025-05-14 01:09:36','<ul><li>2 con cá bạc má</li><li>Hành lá, tỏi</li><li>Gia vị: Giấm, dầu ăn, đường, bột ngọt, muối</li></ul>'),(7,'Cà tím xào tôm thịt','<p><strong>Bước 1:</strong> Sơ chế cà tím, cắt thành khúc khoảng 3cm. Tôm sú sơ chết sạch, lột vỏ để ráo. Thịt rửa sạch cắt thành từng khúc vừa ăn. Lá lốt và tía tô lặt lá héo xong rồi thì bạn cắt nhỏ, cà chua bi bạn rửa sạch cắt làm đôi còn ớt thì bạn đập dập khoảng 2 trái.</p><p><strong>Bước 2:</strong> Chia thịt và tôm là 2 phần và ướp với 1/2 muỗng cà phê bột ngọt, 1/2 muỗng cà phê hạt nêm, 1/4 muỗng cà phê tiêu xay, 1/2 muỗng cà phê bột nghệ và 1 muỗng canh hành tím và tỏi băm, trộn đều các nguyên liệu lại.</p><p><strong>Bước 3:</strong> Chần sơ cà tím qua nước sôi. Sau đó bắt chảo phi thơm hành tỏi và cho phần thịt ba chỉ, tôm sú, tiếp đến là cà tím, cà bi rồi nêm nếm lại cho vừa ăn.</p>','storage/images/recipe_68245081a568f.png','2025-05-14 01:12:49','2025-05-14 01:12:49','<ul><li>200gr cà tím</li><li>200gr tôm sú</li><li>100gr thịt ba chỉ</li><li>150gr cà chua bi</li><li>20gr rau tía tô</li><li>20gr lá lốt</li><li>Nguyên liệu khác: Hành tím băm, tỏi băm, ớt</li><li>Gia vị: Dầu ăn, tiêu xay, bột nghệ, đường, giấm, hạt nêm, bột ngọt</li></ul>'),(8,'Canh cua rau ngót','<p><strong>Bước 1</strong>: Sơ chế cua và đem xay nhuyễn, lượt qua rây để lấy thịt cua. Rau ngót bạn tuốt lấy lá và đem rửa sạch. Vớt ra rồi dùng tay vò sơ qua để rau ngót được mềm.</p><p><strong>Bước 2:</strong> Đun sôi nước lọc cua nêm thêm các loại gia vị gồm muối, hạt nêm, bột ngọt và nước mắm. Khi thịt và gạch cua nổi lên trên thì cho rau ngót vào.</p><p><strong>Bước 3:</strong> Đun sôi thêm một lúc cho nước sôi lại thì tắt bếp.</p>','storage/images/recipe_682451e029009.png','2025-05-14 01:18:40','2025-05-14 01:18:40','<ul><li>300 gam cua đồng</li><li>1 bó rau ngót</li><li>Gia vị: 1/2 thìa muối, 1 thìa hạt nêm, 1/2 thìa bột ngọt, 1 thìa nước mắm</li></ul>'),(9,'Nem nướng chay','<p><strong>Bước 1:</strong> Các bạn chiên bột khoai ở lửa vừa cho nở ra. Sau đó ngâm vào tô nước lạnh và cắt thành từng khúc khoảng 1 lóng tay.</p><p><strong>Bước 2: </strong>Xay nhuyễn heo lát, trộn với 3 muỗng cà phê đường, 2 muỗng cà phê hạt nêm chay, 1 muỗng cà phê mè rang, 1/2 muỗng cà phê muối, 1/2 muỗng cà phê bột quế và bột khoai vào trộn đều đến khi dẻo lại thì nắn thành que nem.</p><p><strong>Bước 3:</strong> Bạn chuẩn bị 1 cái chén cho vào 1 muỗng canh dầu ăn, 1 muỗng cà phê sốt ướp đồ nướng, 1 muỗng cà phê mè rang rồi khuấy đều để là nước sốt. Khi nước nem thì quét sốt này lên là được</p>','storage/images/recipe_683e62843bba1.png','2025-06-02 19:48:36','2025-06-02 21:08:02','<ul><li>Heo lát chay: 20g</li><li>Bột khoai: 15 cọng</li><li>Bột mì: 50g</li><li>Gia vị: Đường, hạt nêm chay, dầu ăn, muối, bột quế (có thể thay bột quế bằng bột ngũ vị hương), mè rang, sốt ướp đồ nướng</li></ul>');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','web','2025-05-30 03:18:00','2025-05-30 03:18:00'),(2,'client','web',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'user1','080695221@example.com',NULL,'$2y$10$bGtog.dvHG6LcYHMTcZv6.riZ/1PX/yKUsCLha1MMtz0DrIFWpEla',NULL,'2025-05-07 02:01:02','2025-05-07 02:01:02','080695221'),(13,'admin','admin@example.com',NULL,'$2y$10$fF35rT8VPoXuJJ0/QGyIv.QqbMzUm72cOiEuuoAJFhMmuCI2jO3.i',NULL,'2025-05-30 03:18:00','2025-05-30 03:18:00','0123456789'),(14,'user3','11222344463@example.com',NULL,'$2y$10$IFXddL9WW.UhFRz7YK/Fb.Z5ISr2Vr/ys7CnLr9G8JF8wqbHdNwsC',NULL,'2025-06-09 19:06:40','2025-06-09 19:06:40','11222344463'),(15,'test','test@gmail.com',NULL,'$2y$10$yTDeaqqysTHLTsYUOnZs8.nQRL26GjpZbNCS0yBpgcnIITwgPk5WG',NULL,'2025-06-09 19:52:27','2025-06-09 19:52:27','99274927912');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-18 16:44:09
