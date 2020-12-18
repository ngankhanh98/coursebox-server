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


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(13);
const crud_typeorm_1 = __webpack_require__(32);
const utils_1 = __webpack_require__(33);
const user_entity_1 = __webpack_require__(16);
const course_service_1 = __webpack_require__(40);
const participant_service_1 = __webpack_require__(41);
let UserService = UserService_1 = class UserService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(userRepository, jwtService, courseService, participantService) {
        super(userRepository);
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.courseService = courseService;
        this.participantService = participantService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async findUserByUsername(username) {
        return await this.userRepository.findOne({ username: username });
    }
    async getAccessToken(user) {
        const payload = { username: user.username };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(accessToken);
        this.logger.debug(this.jwtService);
        return await { accessToken: accessToken };
    }
    async updateOneUser(username, user) {
        const oldUser = await this.findUserByUsername(username);
        if (!oldUser)
            throw new common_1.NotFoundException();
        const newPwd = utils_1.hash(user === null || user === void 0 ? void 0 : user.password);
        const newUser = (user === null || user === void 0 ? void 0 : user.password) ? { ...oldUser, ...user, password: newPwd }
            : { ...oldUser, ...user };
        return await this.userRepository.save(newUser);
    }
    async deleteOneUser(username) {
        console.log('username', username);
        const oldUser = await this.findUserByUsername(username);
        if (!oldUser)
            throw new common_1.NotFoundException();
        return await this.userRepository.delete({ username: username });
    }
    async enrollCourse(username, courseId, roleId) {
        try {
            let user = await this.findUserByUsername(username);
            if (!user)
                throw new common_1.NotFoundException();
            const course = await this.courseService.findCourseById(courseId);
            user = { ...user, courses: [{ ...course, roleId: roleId }] };
            return await this.participantService.addEntry(user['userId'], courseId, roleId);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async findByFilter(filters) {
        const keys = Object.keys(filters);
        const values = Object.values(filters);
        const promises = keys.map((key, index) => new Promise(resolve => {
            resolve(this.repo
                .createQueryBuilder()
                .select()
                .where(`MATCH (${key}) AGAINST ('${values[index]}' IN BOOLEAN MODE)`)
                .getMany());
        }));
        return Promise.all(promises).then(value => {
            console.log(value);
            return value;
        });
    }
};
UserService = UserService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof course_service_1.CourseService !== "undefined" && course_service_1.CourseService) === "function" ? _b : Object, typeof (_c = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _c : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = __webpack_require__(8);
const swagger_1 = __webpack_require__(6);
const crud_1 = __webpack_require__(27);
const course_entity_1 = __webpack_require__(15);
const participant_service_1 = __webpack_require__(41);
const course_service_1 = __webpack_require__(40);
const course_dto_1 = __webpack_require__(45);
let CourseController = class CourseController {
    constructor(service, participantService) {
        this.service = service;
        this.participantService = participantService;
    }
    get base() {
        return this;
    }
    updateOneBase(req, dto) {
        return this.base.updateOneBase(req, dto);
    }
    async createOneCourse(req) {
        console.log('req[]', req['body']);
        return await this.service.createCourse(req['body']);
    }
    async find(filters) {
        return this.service.findByFilter(filters);
    }
    getParticipantByCourseId(param) {
        return this.participantService.getParticipantByCourseId(param['courseId']);
    }
    async removeByCourseIdAndUserId(param) {
        return await this.participantService.removeEntry(param['userId'], param['courseId']);
    }
    async getAllCourseWithTeacher() {
        return this.service.findAllCourses();
    }
    getCourseById(param) {
        return this.service.findCourseById(param['courseId']);
    }
};
__decorate([
    crud_1.Override(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof crud_1.CrudRequest !== "undefined" && crud_1.CrudRequest) === "function" ? _a : Object, typeof (_b = typeof course_dto_1.updateCourseDto !== "undefined" && course_dto_1.updateCourseDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], CourseController.prototype, "updateOneBase", null);
__decorate([
    common_1.Post('/'),
    swagger_1.ApiOperation({ summary: 'Create a course' }),
    swagger_1.ApiBody({ type: course_entity_1.Course }),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof course_dto_1.updateCourseDto !== "undefined" && course_dto_1.updateCourseDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], CourseController.prototype, "createOneCourse", null);
__decorate([
    common_1.UseInterceptors(crud_1.CrudRequestInterceptor),
    common_1.Get('/search'),
    swagger_1.ApiQuery({ name: 'title', required: false }),
    swagger_1.ApiQuery({ name: 'teacher', required: false }),
    swagger_1.ApiOperation({ summary: 'Search course' }),
    swagger_1.ApiOkResponse({
        status: 200,
        type: course_dto_1.getCourseDto,
        isArray: true,
        description: 'Found results',
    }),
    __param(0, common_1.Query('')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CourseController.prototype, "find", null);
__decorate([
    common_1.Get('/:courseId/participant'),
    swagger_1.ApiParam({ name: 'courseId' }),
    swagger_1.ApiOperation({ summary: 'Get participant in courseId' }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getParticipantByCourseId", null);
__decorate([
    common_1.Delete('/:courseId/:userId'),
    swagger_1.ApiParam({ name: 'courseId' }),
    swagger_1.ApiParam({ name: 'userId' }),
    swagger_1.ApiOperation({
        summary: 'Unenroll or reject user from course',
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "removeByCourseIdAndUserId", null);
__decorate([
    common_1.Get('/'),
    swagger_1.ApiOperation({ summary: 'Retrieve many courses' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], CourseController.prototype, "getAllCourseWithTeacher", null);
__decorate([
    common_1.Get('/:courseId'),
    swagger_1.ApiParam({ name: 'courseId' }),
    swagger_1.ApiOperation({
        summary: 'Retrieve one course',
    }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], CourseController.prototype, "getCourseById", null);
CourseController = __decorate([
    crud_1.Crud({
        model: {
            type: course_entity_1.Course,
        },
        params: {
            courseId: {
                field: 'courseId',
                type: 'string',
                primary: true,
            },
        },
        routes: {
            only: ['updateOneBase', 'replaceOneBase', 'deleteOneBase'],
        },
        serialize: {
            create: course_dto_1.updateCourseDto,
            update: course_dto_1.updateCourseDto,
        },
    }),
    swagger_1.ApiTags('Course'),
    common_1.Controller('course'),
    __metadata("design:paramtypes", [typeof (_j = typeof course_service_1.CourseService !== "undefined" && course_service_1.CourseService) === "function" ? _j : Object, typeof (_k = typeof participant_service_1.ParticipantService !== "undefined" && participant_service_1.ParticipantService) === "function" ? _k : Object])
], CourseController);
exports.CourseController = CourseController;


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(19);
const typeorm_1 = __webpack_require__(13);
const constants_1 = __webpack_require__(25);
const user_entity_1 = __webpack_require__(16);
const user_service_1 = __webpack_require__(31);
const typeorm_2 = __webpack_require__(11);
const utils_1 = __webpack_require__(33);
let AuthService = AuthService_1 = class AuthService {
    constructor(authRepository, jwtService, userService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(username, password) {
        const user = await this.userService.findUserByUsername(username);
        const verify = user ? await utils_1.compare(password, user.password) : false;
        if (user && verify) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async register(user) {
        const newUser = new user_entity_1.User();
        const { username, password } = user;
        const existedUser = await this.userService.findUserByUsername(user.username);
        if (!existedUser)
            try {
                newUser.userId = utils_1.generateId(username).slice(0, 9);
                console.log('newUser.userId', newUser.userId);
                newUser.password = utils_1.hash(password);
                newUser.username = username;
                return await this.authRepository.save(newUser);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        throw new common_1.ConflictException(constants_1.exceptionMessage.USER_ALREADY_EXIST);
    }
    async login(user) {
        const token = await this.userService.getAccessToken(user);
        const foundUser = await this.userService.findUserByUsername(user.username);
        return { ...foundUser, ...token };
    }
    async getResetPwdToken(username) {
        const existedUser = await this.userService.findUserByUsername(username);
        const payload = { username: username };
        this.logger.debug(this.jwtService);
        if (!existedUser)
            throw new common_1.NotFoundException(constants_1.exceptionMessage.USER_NOT_FOUND);
        const json = { resetPwdToken: await this.jwtService.sign(payload) };
        return json;
    }
    async setPassword(username, newPassword) {
        console.log(this.authRepository.manager);
        return await this.authRepository.update({ username: username }, { password: utils_1.hash(newPassword) });
    }
};
AuthService = AuthService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _c : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ })

};