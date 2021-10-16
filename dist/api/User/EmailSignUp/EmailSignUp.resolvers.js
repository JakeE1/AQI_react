"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../../../entities/User"));
var createJWT_1 = __importDefault(require("../../../utils/createJWT"));
var Verification_1 = __importDefault(require("../../../entities/Verification"));
var sendEmail_1 = require("../../../utils/sendEmail");
var resolvers = {
    Mutation: {
        EmailSignUp: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var email, existingUser, phoneVerification, newUser, emailVerification, token, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = args.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, User_1.default.findOne({ email: email })];
                    case 2:
                        existingUser = _a.sent();
                        if (!existingUser) return [3 /*break*/, 3];
                        return [2 /*return*/, {
                                ok: false,
                                error: "Email is already registrated",
                                token: null
                            }];
                    case 3: return [4 /*yield*/, Verification_1.default.findOne({ payload: args.phoneNumber, verified: true })];
                    case 4:
                        phoneVerification = _a.sent();
                        if (!phoneVerification) return [3 /*break*/, 9];
                        return [4 /*yield*/, User_1.default.create(__assign({}, args)).save()];
                    case 5:
                        newUser = _a.sent();
                        if (!newUser.email) return [3 /*break*/, 8];
                        return [4 /*yield*/, Verification_1.default.create({
                                payload: newUser.email,
                                target: "EMAIL"
                            }).save()];
                    case 6:
                        emailVerification = _a.sent();
                        return [4 /*yield*/, (0, sendEmail_1.sendVerificationEmail)(newUser.fullName, emailVerification.key)];
                    case 7:
                        _a.sent(); // if we need send email not only to one acc need to upgrade acc
                        _a.label = 8;
                    case 8:
                        token = (0, createJWT_1.default)(newUser.id);
                        return [2 /*return*/, {
                                ok: true,
                                error: null,
                                token: token
                            }];
                    case 9: return [2 /*return*/, {
                            ok: false,
                            error: "You haven't verified your phone number",
                            token: null
                        }];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        return [2 /*return*/, {
                                ok: false,
                                error: error_1.message,
                                token: null
                            }];
                    case 12: return [2 /*return*/];
                }
            });
        }); }
    }
};
exports.default = resolvers;
//# sourceMappingURL=EmailSignUp.resolvers.js.map