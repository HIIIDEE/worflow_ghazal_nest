import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTechnicienDto } from './dto/create-technicien.dto';
import { UpdateTechnicienDto } from './dto/update-technicien.dto';

@Injectable()
export class TechniciensService {
  constructor(private prisma: PrismaService) {}

  async create(createTechnicienDto: CreateTechnicienDto) {
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

  async findOne(id: string) {
    const technicien = await this.prisma.technicien.findUnique({
      where: { id },
    });

    if (!technicien) {
      throw new NotFoundException(`Technicien avec l'ID ${id} introuvable`);
    }

    return technicien;
  }

  async update(id: string, updateTechnicienDto: UpdateTechnicienDto) {
    await this.findOne(id);

    return this.prisma.technicien.update({
      where: { id },
      data: updateTechnicienDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.technicien.delete({
      where: { id },
    });
  }
}
