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
exports.UpdateEtapeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var EtapeStatus;
(function (EtapeStatus) {
    EtapeStatus["EN_ATTENTE"] = "EN_ATTENTE";
    EtapeStatus["EN_COURS"] = "EN_COURS";
    EtapeStatus["TERMINE"] = "TERMINE";
    EtapeStatus["BLOQUE"] = "BLOQUE";
})(EtapeStatus || (EtapeStatus = {}));
class UpdateEtapeDto {
    statut;
    formulaire;
    dateDebut;
    dateFin;
    validePar;
    assignedUserId;
    signatureGestionnaire;
    signatureTechnicien;
    signatureClientReception;
    signatureGestionnaireVerification;
    signatureClientRestitution;
    signatureControleur;
    sousStatutTechnique;
    commentaires;
}
exports.UpdateEtapeDto = UpdateEtapeDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(EtapeStatus, { message: 'Le statut doit être EN_ATTENTE, EN_COURS, TERMINE ou BLOQUE' }),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "statut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateEtapeDto.prototype, "formulaire", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateEtapeDto.prototype, "dateDebut", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], UpdateEtapeDto.prototype, "dateFin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "validePar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "assignedUserId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "signatureGestionnaire", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "signatureTechnicien", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "signatureClientReception", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "signatureGestionnaireVerification", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "signatureClientRestitution", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "signatureControleur", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['CONTROLE_TECHNICIEN', 'CONTROLE_INTEROPERATION']),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "sousStatutTechnique", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEtapeDto.prototype, "commentaires", void 0);
//# sourceMappingURL=update-etape.dto.js.map