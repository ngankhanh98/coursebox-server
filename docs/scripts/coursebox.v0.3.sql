CREATE TABLE `Chapters`  (
  `chapterId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `courseId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NULL,
  PRIMARY KEY (`chapterId`, `courseId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

CREATE TABLE `Classifies`  (
  `courseId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tagId` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`courseId`, `tagId`) USING BTREE,
  INDEX `course_id`(`courseId`) USING BTREE,
  INDEX `tag`(`tagId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `Courses`  (
  `courseId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`courseId`) USING BTREE,
  INDEX `teacher_id`(`teacher_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `Roles`  (
  `roleId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 NULL,
  PRIMARY KEY (`roleId`)
);

CREATE TABLE `Tags`  (
  `tagId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`tagId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `Users`  (
  `userId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'unique',
  `password` varchar(255) CHARACTER SET utf8 NOT NULL COMMENT 'hash required',
  PRIMARY KEY (`userId`)
);

CREATE TABLE `UsersRoles`  (
  `RoleID` varchar(255) NOT NULL,
  `UserID` varchar(255) NOT NULL,
  PRIMARY KEY (`RoleID`, `UserID`)
);

ALTER TABLE `Chapters` ADD CONSTRAINT `fk_chapters_courses_1` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`courseId`);
ALTER TABLE `Classifies` ADD CONSTRAINT `fk_classifies_tags_1` FOREIGN KEY (`tagId`) REFERENCES `Tags` (`tagId`);
ALTER TABLE `Classifies` ADD CONSTRAINT `fk_classifies_courses_1` FOREIGN KEY (`courseId`) REFERENCES `Courses` (`courseId`);
ALTER TABLE `Courses` ADD CONSTRAINT `fk_courses_teachers_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);

