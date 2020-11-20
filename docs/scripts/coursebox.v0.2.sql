CREATE TABLE `chapters`  (
  `chapter_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `course_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`chapter_id`, `course_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

CREATE TABLE `classifies`  (
  `course_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`course_id`, `tag`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  INDEX `tag`(`tag`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `courses`  (
  `course_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`course_id`) USING BTREE,
  INDEX `teacher_id`(`teacher_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `members`  (
  `member_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) NULL,
  PRIMARY KEY (`member_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `participants`  (
  `course_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `member_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`course_id`, `member_id`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  INDEX `member_id`(`member_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `tags`  (
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tag`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `teachers`  (
  `teacher_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`teacher_id`) USING BTREE,
  FULLTEXT INDEX `IDX_d759adda1dbd06bfb9af3a20f2`(`fullname`),
  FULLTEXT INDEX `IDX_8554ca4826231daa07720e5e0d`(`teacher_id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

CREATE TABLE `users`  (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
);

ALTER TABLE `chapters` ADD CONSTRAINT `fk_chapters_courses_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);
ALTER TABLE `classifies` ADD CONSTRAINT `fk_classifies_courses_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);
ALTER TABLE `classifies` ADD CONSTRAINT `fk_classifies_tags_1` FOREIGN KEY (`tag`) REFERENCES `tags` (`tag`);
ALTER TABLE `courses` ADD CONSTRAINT `fk_courses_teachers_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`);
ALTER TABLE `members` ADD CONSTRAINT `fk_members_users_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
ALTER TABLE `participants` ADD CONSTRAINT `fk_participants_courses_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);
ALTER TABLE `participants` ADD CONSTRAINT `fk_participants_members_1` FOREIGN KEY (`member_id`) REFERENCES `members` (`member_id`);
ALTER TABLE `teachers` ADD CONSTRAINT `fk_teachers_users_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);

