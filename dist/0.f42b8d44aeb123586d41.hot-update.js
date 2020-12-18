exports.id = 0;
exports.modules = {

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseProvider = void 0;
const config_1 = __webpack_require__(9);
const typeorm_1 = __webpack_require__(13);
const mysql_config_1 = __webpack_require__(14);
const course_entity_1 = __webpack_require__(15);
const user_entity_1 = __webpack_require__(16);
const user_courses_course_entity_1 = __webpack_require__(17);
exports.DatabaseProvider = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [
        config_1.ConfigModule.forRoot({
            load: [mysql_config_1.remoteMySql],
        }),
    ],
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        return {
            ...configService.get('remoteMySql'),
            entities: [course_entity_1.Course, user_entity_1.User, user_courses_course_entity_1.UserCoursesCourse],
            keepConnectionAlive: true,
            synchronize: false,
            autoLoadEntities: true,
        };
    },
});


/***/ })

};