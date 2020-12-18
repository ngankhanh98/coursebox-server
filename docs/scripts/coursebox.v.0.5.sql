/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : coursebox

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 02/12/2020 09:37:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chapter
-- ----------------------------
DROP TABLE IF EXISTS `chapter`;
CREATE TABLE `chapter`  (
  `chapterId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`chapterId`, `courseId`) USING BTREE,
  INDEX `fk_chapter_course_1`(`courseId`) USING BTREE,
  CONSTRAINT `fk_chapter_course_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chapter
-- ----------------------------

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`courseId`) USING BTREE,
  FULLTEXT INDEX `IDX_ac5edecc1aefa58ed0237a7ee4`(`title`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('3594b8ddb', 'Data Structures and Software Design\r\n');
INSERT INTO `course` VALUES ('4ea526a1e', 'Learn to design efficient high quality software');
INSERT INTO `course` VALUES ('97a52ad5f', 'Learn the design approaches to software engineering');

-- ----------------------------
-- Table structure for participant
-- ----------------------------
DROP TABLE IF EXISTS `participant`;
CREATE TABLE `participant`  (
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`courseId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of participant
-- ----------------------------

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `permissionId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`permissionId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`roleId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('guess', 'Guess', 'Guess is the person allowed to browse some limit resources');
INSERT INTO `role` VALUES ('member', 'Member', 'Member is the person who has registered in the system, enrolled courses');
INSERT INTO `role` VALUES ('teacher', 'Teacher', 'Teacher is the person who has registered in the system, created a course and be a teacher of that couse.');
INSERT INTO `role` VALUES ('user', 'User', 'User is the person who has registered in the system, not enrolled or created course');

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permissionId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  INDEX `fk_role_permission_role_1`(`roleId`) USING BTREE,
  INDEX `fk_role_permission_permission_1`(`permissionId`) USING BTREE,
  CONSTRAINT `fk_role_permission_permission_1` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`permissionId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_role_permission_role_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permission
-- ----------------------------

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `tagId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tagId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tag
-- ----------------------------

-- ----------------------------
-- Table structure for taggable
-- ----------------------------
DROP TABLE IF EXISTS `taggable`;
CREATE TABLE `taggable`  (
  `tagId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taggableId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '// courseId',
  `taggableType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '// Course',
  INDEX `fk_taggable_course_1`(`taggableId`) USING BTREE,
  INDEX `fk_taggable_tag_1`(`tagId`) USING BTREE,
  CONSTRAINT `fk_taggable_course_1` FOREIGN KEY (`taggableId`) REFERENCES `course` (`courseId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_taggable_tag_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of taggable
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`userId`) USING BTREE,
  FULLTEXT INDEX `IDX_d82ac8613a7ccbd2669896ecc8`(`fullname`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('minhtien', '$2b$06$gki/v4K8drnuhdcoE0xkjOU6H7s/OGOaLg0r1mEBbgtKGI33bqzSi', '', '1adf2bde2');
INSERT INTO `user` VALUES ('ngankhanh', '$2b$06$b9c0TJb.pvGZiHDcsixO8OANh1lDeAmJvKdWqxSTvPar1dwImUz5q', '', '4e71e806d');

-- ----------------------------
-- Table structure for user_courses_course
-- ----------------------------
DROP TABLE IF EXISTS `user_courses_course`;
CREATE TABLE `user_courses_course`  (
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'member'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_courses_course
-- ----------------------------
INSERT INTO `user_courses_course` VALUES ('4e71e806d', '', 'member');
INSERT INTO `user_courses_course` VALUES ('4e71e806d', '3594b8ddb', 'member');

SET FOREIGN_KEY_CHECKS = 1;
