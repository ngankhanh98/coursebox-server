exports.id = 0;
exports.modules = {

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
        return { ...foundUser, token: token };
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