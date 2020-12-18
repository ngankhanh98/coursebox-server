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

 Date: 15/12/2020 21:22:42
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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `teacherUserId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`courseId`) USING BTREE,
  INDEX `FK_436670f9f10516b3c8e240d8861`(`teacherUserId`) USING BTREE,
  FULLTEXT INDEX `IDX_ac5edecc1aefa58ed0237a7ee4`(`title`),
  CONSTRAINT `FK_436670f9f10516b3c8e240d8861` FOREIGN KEY (`teacherUserId`) REFERENCES `user` (`userId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('030f2a6f9', 'Master at Angular', '4e71e806d', '2020-12-14 17:27:54.685886');
INSERT INTO `course` VALUES ('3731ad43d', 'Business English', '4e71e806d', '2020-12-14 17:31:54.352945');
INSERT INTO `course` VALUES ('585d0e44b', 'Frontend with React', '1adf2bde2', '2020-12-15 19:21:56.241415');
INSERT INTO `course` VALUES ('8b0fca6e2', 'Adobe Photoshop', '4e71e806d', '2020-12-14 17:42:47.788059');
INSERT INTO `course` VALUES ('9ea2be288', 'Master at Visual Studio Code ', '4e71e806d', '2020-12-14 17:25:07.140627');
INSERT INTO `course` VALUES ('f8ed7440b', 'Adobe Effect', '4e71e806d', '2020-12-14 17:25:29.626235');

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'member',
  PRIMARY KEY (`userId`, `courseId`) USING BTREE,
  INDEX `IDX_e99d8f99eff1a45a772b11060e`(`userId`) USING BTREE,
  INDEX `IDX_d67262674f71493825eb35e2e2`(`courseId`) USING BTREE,
  CONSTRAINT `FK_d67262674f71493825eb35e2e2c` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_e99d8f99eff1a45a772b11060e5` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_courses_course
-- ----------------------------
INSERT INTO `user_courses_course` VALUES ('1adf2bde2', '030f2a6f9', 'member');
INSERT INTO `user_courses_course` VALUES ('1adf2bde2', 'f8ed7440b', 'member');

SET FOREIGN_KEY_CHECKS = 1;
