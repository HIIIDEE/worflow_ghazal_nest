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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateVehicleDto {
    immatriculation;
    marque;
    modele;
    annee;
    numeroSerie;
}
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Immatriculation du véhicule (formats français)',
        example: 'AB-123-CD',
        pattern: '^[A-Z]{2}-\\d{3}-[A-Z]{2}$|^[0-9]{1,4}\\s?[A-Z]{1,3}\\s?[0-9]{2}$',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'immatriculation est obligatoire' }),
    (0, class_validator_1.Matches)(/^[A-Z]{2}-\d{3}-[A-Z]{2}$|^[0-9]{1,4}\s?[A-Z]{1,3}\s?[0-9]{2}$/i, {
        message: 'Format d\'immatriculation invalide. Formats acceptés: XX-123-XX (nouveau) ou 123 AB 12 (ancien)',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "immatriculation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Marque du véhicule',
        example: 'Peugeot',
        minLength: 1,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La marque est obligatoire' }),
    (0, class_validator_1.Length)(1, 50, { message: 'La marque doit contenir entre 1 et 50 caractères' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "marque", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Modèle du véhicule',
        example: '308',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le modèle est obligatoire' }),
    (0, class_validator_1.Length)(1, 100, { message: 'Le modèle doit contenir entre 1 et 100 caractères' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "modele", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Année de fabrication du véhicule',
        example: 2020,
        minimum: 1900,
        maximum: new Date().getFullYear() + 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'L\'année est obligatoire' }),
    (0, class_validator_1.Min)(1900, { message: 'L\'année doit être supérieure ou égale à 1900' }),
    (0, class_validator_1.Max)(new Date().getFullYear() + 1, {
        message: `L'année ne peut pas dépasser ${new Date().getFullYear() + 1}`,
    }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "annee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Numéro de série du véhicule (VIN - 17 caractères)',
        example: 'VF3LCYHZPHS123456',
        minLength: 17,
        maxLength: 17,
        pattern: '^[A-HJ-NPR-Z0-9]{17}$',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Le numéro de série (VIN) est obligatoire' }),
    (0, class_validator_1.Length)(17, 17, { message: 'Le VIN doit contenir exactement 17 caractères' }),
    (0, class_validator_1.Matches)(/^[A-HJ-NPR-Z0-9]{17}$/i, {
        message: 'Le VIN doit contenir 17 caractères alphanumériques (sans I, O, Q)',
    }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "numeroSerie", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map