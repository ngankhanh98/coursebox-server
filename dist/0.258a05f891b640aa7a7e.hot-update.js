exports.id = 0;
exports.modules = {

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


/***/ })

};