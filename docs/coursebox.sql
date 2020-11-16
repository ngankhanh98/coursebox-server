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

 Date: 16/11/2020 10:15:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classifies
-- ----------------------------
DROP TABLE IF EXISTS `classifies`;
CREATE TABLE `classifies`  (
  `course_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`course_id`, `tag`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  INDEX `tag`(`tag`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classifies
-- ----------------------------

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `course_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`course_id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id`) USING BTREE,
  CONSTRAINT `courses_classifies_course_id` FOREIGN KEY (`course_id`) REFERENCES `classifies` (`course_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `courses_participants_course_id` FOREIGN KEY (`course_id`) REFERENCES `participants` (`course_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members`  (
  `member_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`member_id`) USING BTREE,
  CONSTRAINT `members_participants_member_id` FOREIGN KEY (`member_id`) REFERENCES `participants` (`member_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of members
-- ----------------------------

-- ----------------------------
-- Table structure for participants
-- ----------------------------
DROP TABLE IF EXISTS `participants`;
CREATE TABLE `participants`  (
  `course_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `member_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`course_id`, `member_id`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  INDEX `member_id`(`member_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of participants
-- ----------------------------

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags`  (
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tag`) USING BTREE,
  CONSTRAINT `tags_classifies_tag` FOREIGN KEY (`tag`) REFERENCES `classifies` (`tag`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tags
-- ----------------------------

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers`  (
  `teacher_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE,
  FULLTEXT INDEX `IDX_d759adda1dbd06bfb9af3a20f2`(`fullname`),
  FULLTEXT INDEX `IDX_8554ca4826231daa07720e5e0d`(`teacher_id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES ('1', 'Nguyen Vu Phuong Nam');

SET FOREIGN_KEY_CHECKS = 1;
