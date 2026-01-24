import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // Validation : doit avoir soit (email + password) soit (code)
    if (!createUserDto.email && !createUserDto.code) {
      throw new ConflictException('Vous devez fournir soit un email et mot de passe, soit un code');
    }

    // Vérifier l'unicité de l'email si fourni
    if (createUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email }
      });

      if (existingUser) {
        throw new ConflictException('Un utilisateur avec cet email existe déjà');
      }
    }

    // Vérifier l'unicité du code si fourni
    if (createUserDto.code) {
      const existingUser = await this.prisma.user.findUnique({
        where: { code: createUserDto.code }
      });

      if (existingUser) {
        throw new ConflictException('Un utilisateur avec ce code existe déjà');
      }
    }

    // Hasher le mot de passe s'il est fourni
    const dataToCreate: any = {
      ...createUserDto,
      role: createUserDto.role || UserRole.GESTIONNAIRE,
    };

    if (createUserDto.password) {
      dataToCreate.password = await bcrypt.hash(createUserDto.password, 10);
    }

    return this.prisma.user.create({
      data: dataToCreate,
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email }
    });
  }

  async findByCode(code: string) {
    return this.prisma.user.findUnique({
      where: { code }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email }
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Un utilisateur avec cet email existe déjà');
      }
    }

    const dataToUpdate: any = { ...updateUserDto };

    if (updateUserDto.password) {
      dataToUpdate.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  // Récupérer tous les techniciens et contrôleurs
  async findTechnicians() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.TECHNICIEN, UserRole.CONTROLEUR],
        },
      },
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ nom: 'asc' }, { prenom: 'asc' }],
    });
  }

  // Récupérer uniquement les techniciens/contrôleurs actifs
  async findActiveTechnicians() {
    return this.prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.TECHNICIEN, UserRole.CONTROLEUR],
        },
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        code: true,
        nom: true,
        prenom: true,
        role: true,
        telephone: true,
        specialite: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ nom: 'asc' }, { prenom: 'asc' }],
    });
  }
}
