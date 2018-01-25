/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : russell

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 23/01/2018 22:00:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blg_article
-- ----------------------------
DROP TABLE IF EXISTS `blg_article`;
CREATE TABLE `blg_article`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `click_count` int(11) NULL DEFAULT NULL,
  `is_recommend` tinyint(1) NULL DEFAULT NULL,
  `date_publish` datetime(0) NULL DEFAULT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `blg_article_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `blg_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `blg_article_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `blg_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blg_article
-- ----------------------------
INSERT INTO `blg_article` VALUES (1, '简评Vue', '对Vue的简单评鉴', 'Vue是React的低等模仿者', NULL, NULL, '2018-01-23 16:51:20', 26, 1);

-- ----------------------------
-- Table structure for blg_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `blg_article_tag`;
CREATE TABLE `blg_article_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NULL DEFAULT NULL,
  `tag_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `tag_id`(`tag_id`) USING BTREE,
  INDEX `article_id`(`article_id`) USING BTREE,
  CONSTRAINT `blg_article_tag_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `blg_tag` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `blg_article_tag_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `blg_article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blg_category
-- ----------------------------
DROP TABLE IF EXISTS `blg_category`;
CREATE TABLE `blg_category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` tinyint(2) NULL DEFAULT NULL,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `father_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `index`(`father_id`) USING BTREE,
  CONSTRAINT `blg_category_ibfk_1` FOREIGN KEY (`father_id`) REFERENCES `blg_category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 39 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blg_category
-- ----------------------------
INSERT INTO `blg_category` VALUES (0, 0, 'Russell', NULL);
INSERT INTO `blg_category` VALUES (1, 1, '数学', 0);
INSERT INTO `blg_category` VALUES (2, 1, '计算机科学', 0);
INSERT INTO `blg_category` VALUES (3, 1, '哲学', 0);
INSERT INTO `blg_category` VALUES (4, 1, '宇宙', 0);
INSERT INTO `blg_category` VALUES (5, 2, '基础数学', 1);
INSERT INTO `blg_category` VALUES (6, 2, '高等数学', 1);
INSERT INTO `blg_category` VALUES (7, 2, '线性代数', 1);
INSERT INTO `blg_category` VALUES (8, 2, '概率论与数理统计', 1);
INSERT INTO `blg_category` VALUES (9, 2, '其他', 1);
INSERT INTO `blg_category` VALUES (10, 2, 'AI', 2);
INSERT INTO `blg_category` VALUES (11, 2, '前端', 2);
INSERT INTO `blg_category` VALUES (12, 2, '后端', 2);
INSERT INTO `blg_category` VALUES (13, 2, 'Linux', 2);
INSERT INTO `blg_category` VALUES (14, 2, '数据库', 2);
INSERT INTO `blg_category` VALUES (16, 2, '其他', 2);
INSERT INTO `blg_category` VALUES (17, 2, 'Bertrand.Russell', 3);
INSERT INTO `blg_category` VALUES (18, 2, '量子物理', 4);
INSERT INTO `blg_category` VALUES (20, 3, '机器学习', 10);
INSERT INTO `blg_category` VALUES (21, 3, '深度学习', 10);
INSERT INTO `blg_category` VALUES (22, 3, 'Angualr', 11);
INSERT INTO `blg_category` VALUES (23, 3, 'CSS', 11);
INSERT INTO `blg_category` VALUES (24, 3, 'ECMAScript', 11);
INSERT INTO `blg_category` VALUES (25, 3, 'jquery', 11);
INSERT INTO `blg_category` VALUES (26, 3, 'React', 11);
INSERT INTO `blg_category` VALUES (27, 3, 'TypeScript', 11);
INSERT INTO `blg_category` VALUES (28, 3, 'Sass', 11);
INSERT INTO `blg_category` VALUES (29, 3, '工具', 11);
INSERT INTO `blg_category` VALUES (30, 3, '前端各种病', 11);
INSERT INTO `blg_category` VALUES (31, 3, 'Java', 12);
INSERT INTO `blg_category` VALUES (32, 3, 'Python', 12);
INSERT INTO `blg_category` VALUES (33, 3, 'Crawler', 12);
INSERT INTO `blg_category` VALUES (34, 3, 'Nodejs', 12);
INSERT INTO `blg_category` VALUES (35, 3, '其他', 12);
INSERT INTO `blg_category` VALUES (36, 3, '常用用命令', 13);
INSERT INTO `blg_category` VALUES (37, 3, 'MySQL', 14);
INSERT INTO `blg_category` VALUES (38, 3, 'Go Lang', 16);

-- ----------------------------
-- Table structure for blg_comment
-- ----------------------------
DROP TABLE IF EXISTS `blg_comment`;
CREATE TABLE `blg_comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `date_publish` datetime(0) NULL DEFAULT NULL,
  `comment_id` int(11) NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `article_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `comment_id`(`comment_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `article_id`(`article_id`) USING BTREE,
  CONSTRAINT `blg_comment_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `blg_comment` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `blg_comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `blg_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `blg_comment_ibfk_3` FOREIGN KEY (`article_id`) REFERENCES `blg_article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blg_links
-- ----------------------------
DROP TABLE IF EXISTS `blg_links`;
CREATE TABLE `blg_links`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `click_count` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blg_tag
-- ----------------------------
DROP TABLE IF EXISTS `blg_tag`;
CREATE TABLE `blg_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for blg_user
-- ----------------------------
DROP TABLE IF EXISTS `blg_user`;
CREATE TABLE `blg_user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `last_login` datetime(0) NULL DEFAULT NULL,
  `is_superuser` tinyint(1) NULL DEFAULT NULL,
  `first_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `last_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `is_staff` tinyint(1) NULL DEFAULT NULL,
  `is_active` tinyint(1) NULL DEFAULT NULL,
  `date_joined` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `qq` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `mobile` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blg_user
-- ----------------------------
INSERT INTO `blg_user` VALUES (1, 'russell', '111111', '2018-01-14 21:20:15', 1, 'Abraham', 'Russell', '1308786830@qq.com', NULL, 0, '2018-01-14 21:19:41', NULL, '1308786830', '18357006605');

SET FOREIGN_KEY_CHECKS = 1;
