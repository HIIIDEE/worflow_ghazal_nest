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
exports.TechniciensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TechniciensService = class TechniciensService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTechnicienDto) {
        return this.prisma.technicien.create({
            data: createTechnicienDto,
        });
    }
    async findAll() {
        return this.prisma.technicien.findMany({
            orderBy: {
                nom: 'asc'
            }
        });
    }
    async findAllActive() {
        return this.prisma.technicien.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                nom: 'asc'
            }
        });
    }
    async findOne(id) {
        const technicien = await this.prisma.technicien.findUnique({
            where: { id },
        });
        if (!technicien) {
            throw new common_1.NotFoundException(`Technicien avec l'ID ${id} introuvable`);
        }
        return technicien;
    }
    async update(id, updateTechnicienDto) {
        await this.findOne(id);
        return this.prisma.technicien.update({
            where: { id },
            data: updateTechnicienDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.technicien.delete({
            where: { id },
        });
    }
};
exports.TechniciensService = TechniciensService;
exports.TechniciensService = TechniciensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TechniciensService);
//# sourceMappingURL=techniciens.service.js.map