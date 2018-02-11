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

 Date: 10/02/2018 17:28:13
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
  `avatar` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'author\'s avatar.',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
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
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blg_article
-- ----------------------------
INSERT INTO `blg_article` VALUES (1, '简评Vue', '对Vue的简单评鉴', NULL, 'Vue也已经升级到2.0版本了，到现在为止（2016/11/19）比较流行的MVVM框架有AngularJS（也有人认为其为MVC）、ReactJS和VueJS，这三个框架中，以我现在的情况来说（AngularJS2还没有去接触），ReactJS和VueJS的对比应该是比较适合的，感觉这哥俩就是好基友，不管是单向数据流、组件化思想、还是构建大型应用的路由和状态管理都有些许相似之处。而AngularJS与Jquery对比我个人觉着比较合适。\n\n为什么现在MVVM框架这么火呢？JQuery挺好用的呀，为什么要去代替它？...\n\n可能会产生这样的疑问，在我看来，MVVM框架的流行是因为随着前端技术的发展对于要求越来越高和前端面对的场景越来越复杂导致了现实对于前端性能的要求也越来越高，这样像JQuery那样频繁的操作DOM节点的方式显然就不太合适了。所以MVVM开始逐渐流行开来，另外我认为JQuery目前来看还是不会被代替的，因为对于一些对性能要求不是很高的前端项目，是用JQuery来开发还是非常爽的。\n\n废话有点多了，进入正题。接下来从数据双向绑定、组件及数据流、路由、状态管理等方面来分别对比一下怎样去使用Vue和React。', NULL, NULL, '2018-01-23 16:51:20', 26, 1);
INSERT INTO `blg_article` VALUES (2, 'React简介', '声明式\r\n、组件化\r\n、一次学习，随处编写\r\n', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K', 'React 可以非常轻松地创建用户交互界面。为你应用的每一个状态设计简洁的视图，在数据改变时 React 也可以高效地更新渲染界面。\r\n\r\n以声明式编写UI，可以让你的代码更加可靠，且方便调试。创建好拥有各自状态的组件，再由组件构成更加复杂的界面。\r\n\r\n无需再用模版代码，通过使用JavaScript编写的组件你可以更好地传递数据，将应用状态和DOM拆分开来。无论你现在正在使用什么技术栈，你都可以随时引入 React 开发新特性。\r\n\r\nReact 也可以用作开发原生应用的框架 React Native.', NULL, 1, '2018-01-28 12:09:15', 26, 1);
INSERT INTO `blg_article` VALUES (3, 'React简介', 'React简介React简介React简介React简介React简介', NULL, 'React简介React简介React简介React简介React简介React简介React简介', NULL, 1, '2018-02-01 09:10:48', 26, 1);
INSERT INTO `blg_article` VALUES (7, '我为什么而活着', NULL, NULL, '<p><span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 16px;font-family: Georgia;\">    对爱情的渴望，对知识的追求，对人类苦难不可遏制的同情心，这三种纯洁而无比强烈的激情支配着我的一生。这三种激情，就像飓风一样，在深深的苦海上，肆意地把我吹来吹去，吹到濒临绝望的边缘。  </span><br><br><span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 16px;font-family: Georgia;\">    我寻求爱情，首先因为爱情给我带来狂喜，它如此强烈以致我经常愿意为了几小时的欢愉而牺牲生命中的其他一切。我寻求爱情，其次是因为爱情可以解除孤寂一—那是一颗震颤的心，在世界的边缘，俯瞰那冰冷死寂、深不可测的深渊。我寻求爱情，最后是因为在爱情的结合中，我看到圣徒和诗人们所想像的天堂景象的神秘缩影。这就是我所寻求的，虽然它对人生似乎过于美好，然而最终我还是得到了它。  </span><br><br><span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 16px;font-family: Georgia;\">    我以同样的热情寻求知识，我渴望了解人的心灵。我渴望知道星星为什么闪闪发光，我试图理解毕达哥拉斯的思想威力，即数字支配着万物流转。这方面我获得一些成就，然而并不多。  </span><br><br><span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 16px;font-family: Georgia;\">    爱情和知识，尽其可能地把我引上天堂，但是同情心总把我带回尘世。痛苦的呼唤经常在我心中回荡，饥饿的儿童，被压迫被折磨者，被儿女视为负担的无助的老人以及充满孤寂、贫穷和痛苦的整个世界，都是对人类应有生活的嘲讽。我渴望减轻这些不幸，但是我无能为力，而且我自己也深受其害。  </span><br><br><span style=\"color: rgb(17,17,17);background-color: rgb(255,255,255);font-size: 16px;font-family: Georgia;\">    这就是我的一生，我觉得值得为它活着。如果有机会的话，我还乐意再活一次。 </span>&nbsp;</p>\n', NULL, 1, '2018-02-02 17:24:30', 17, 1);
INSERT INTO `blg_article` VALUES (8, 'What I Have Lived For', NULL, NULL, '<p><span style=\"font-size: 18px;\">Three passions, simple but overwhelmingly strong, have governed my life: the longing for love, the search for knowledge, and unbearable pity for the suffering of mankind. These passions, like great winds have blown me hither and thither, in a wayward course, over a deep ocean of anguish, reaching to the very verge of despair. <br><br>I have sought love, first, because it brings ecstasy---ecstasy so great that I would often have sacrificed all the rest of life for a few hours of this joy. I have sought it, next because it relieves loneliness---that terrible loneliness in which one shivering consciousness looks over the rim of the world into the cold unfathomable lifeless abyss. I have sought if, finally, because in the union of love I have seen, in a mystic miniature, the prefiguring vision of the heaven that saints and poets have imagined. This is what I sought, and though it might seem too good for human life, this is what---at last---I have found.<br><br>With equal passion I have sought knowledge. I have wished to understand the hearts of men. I have wished to know why the stars shine. And I have tried to apprehend the Pythagorean power by which number holds sway above the flux. A little of this, but not much, I have achieved. <br><br>Love and knowledge, so far as they were possible, led upward toward the heavens. But always pity brought me back to earth. Echoes of cries of pain reverberate in my heart. Children in famine, victims tortured by oppressors, helpless old people a hated burden to their sons, and the whole world of loneliness, poverty, and pain make a mockery of what human life should be. I long to alleviate the evil, but I cannot, and I too suffer.<br><br>This has been my life. I have found it worth living, and would gladly live it again if the chance were offered me.</span></p>\n', NULL, 1, '2018-02-02 17:27:48', 17, 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

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
INSERT INTO `blg_category` VALUES (17, 3, 'Bertrand.Russell', 39);
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
INSERT INTO `blg_category` VALUES (39, 2, '哲学大师', 3);

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
  `article_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `article_id`(`article_id`) USING BTREE,
  CONSTRAINT `blg_links_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `blg_article` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blg_links
-- ----------------------------
INSERT INTO `blg_links` VALUES (1, 'Vue官网', 'Vue官网', 'https://cn.vuejs.org/index.html\r\n', NULL, 1);
INSERT INTO `blg_links` VALUES (2, 'React官网', 'React官网', 'https://doc.react-china.org/', NULL, 1);

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
