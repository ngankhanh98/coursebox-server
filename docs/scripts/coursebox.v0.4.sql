CREATE TABLE `chapter`  (
  `chapterId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`chapterId`, `courseId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `course`  (
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `participant`  (
  `courseId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`courseId`, `roleId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `permission`  (
  `permissionId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`permissionId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `role`  (
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `role_permission`  (
  `roleId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `permissionId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `tag`  (
  `tagId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tagId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `taggable`  (
  `tagId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `taggableId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '// courseId',
  `taggableType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '// Course'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `user`  (
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

ALTER TABLE `chapter` ADD CONSTRAINT `fk_chapter_course_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`);
ALTER TABLE `participant` ADD CONSTRAINT `fk_participant_course_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`);
ALTER TABLE `participant` ADD CONSTRAINT `fk_participant_user_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);
ALTER TABLE `participant` ADD CONSTRAINT `fk_participant_role_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`);
ALTER TABLE `role_permission` ADD CONSTRAINT `fk_role_permission_role_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`);
ALTER TABLE `role_permission` ADD CONSTRAINT `fk_role_permission_permission_1` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`permissionId`);
ALTER TABLE `taggable` ADD CONSTRAINT `fk_taggable_course_1` FOREIGN KEY (`taggableId`) REFERENCES `course` (`courseId`);
ALTER TABLE `taggable` ADD CONSTRAINT `fk_taggable_tag_1` FOREIGN KEY (`tagId`) REFERENCES `tag` (`tagId`);

