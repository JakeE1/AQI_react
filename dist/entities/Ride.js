"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Chat_1 = __importDefault(require("./Chat"));
var User_1 = __importDefault(require("./User"));
var Ride = /** @class */ (function (_super) {
    __extends(Ride, _super);
    function Ride() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Ride.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            type: "text",
            enum: ["ACCEPTED", "FINISHED", "CANCELED", "REQUESTING", "ONROUTE"],
            default: "REQUESTING"
        }),
        __metadata("design:type", String)
    ], Ride.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Ride.prototype, "pickUpAddress", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Ride.prototype, "pickUpLat", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Ride.prototype, "pickUpLng", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Ride.prototype, "dropOffAddress", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Ride.prototype, "dropOffLat", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Ride.prototype, "dropOffLng", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "double precision", default: 0 }),
        __metadata("design:type", Number)
    ], Ride.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Ride.prototype, "distance", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Ride.prototype, "duration", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Ride.prototype, "passengerId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.default; }, function (user) { return user.ridesAsPassenger; }),
        __metadata("design:type", User_1.default)
    ], Ride.prototype, "passenger", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Ride.prototype, "driverId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return User_1.default; }, function (user) { return user.ridesAsDriver; }, { nullable: true }),
        __metadata("design:type", User_1.default)
    ], Ride.prototype, "driver", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", Number)
    ], Ride.prototype, "chatId", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function (type) { return Chat_1.default; }, function (chat) { return chat.ride; }, { nullable: true }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Chat_1.default)
    ], Ride.prototype, "chat", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", String)
    ], Ride.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", String)
    ], Ride.prototype, "updatedAt", void 0);
    Ride = __decorate([
        (0, typeorm_1.Entity)()
    ], Ride);
    return Ride;
}(typeorm_1.BaseEntity));
exports.default = Ride;
//# sourceMappingURL=Ride.js.map