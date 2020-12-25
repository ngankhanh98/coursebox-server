exports.id = 0;
exports.modules = {

/***/ 16:
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const class_transformer_1 = __webpack_require__(17);
const typeorm_1 = __webpack_require__(11);
const course_entity_1 = __webpack_require__(15);
let User = class User {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Index({ fulltext: true }),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    typeorm_1.ManyToMany(() => course_entity_1.Course, course => course.users),
    typeorm_1.JoinTable({
        name: 'user_courses_course',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'userId',
        },
        inverseJoinColumn: {
            name: 'courseId',
            referencedColumnName: 'courseId',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "courses", void 0);
__decorate([
    typeorm_1.OneToMany(() => course_entity_1.Course, course => course.teacher),
    __metadata("design:type", Array)
], User.prototype, "teaching_courses", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;


/***/ })

};