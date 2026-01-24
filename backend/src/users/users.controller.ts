import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SecurityLoggerService } from '../common/logger/security-logger.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ClientInfo } from '../common/decorators/client-info.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly securityLogger: SecurityLoggerService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() currentUser: any,
    @ClientInfo() clientInfo: { ip: string; userAgent: string },
  ) {
    const newUser = await this.usersService.create(createUserDto);

    // Log user creation
    this.securityLogger.logUserCreated(
      newUser.id,
      newUser.email || `User-${newUser.id}`,
      currentUser?.userId || 'system',
      currentUser?.email || 'system',
      clientInfo.ip,
    );

    return newUser;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('technicians')
  @ApiOperation({ summary: 'Get all technicians and controllers' })
  getTechnicians() {
    return this.usersService.findTechnicians();
  }

  @Get('technicians/active')
  @ApiOperation({ summary: 'Get active technicians and controllers' })
  getActiveTechnicians() {
    return this.usersService.findActiveTechnicians();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: any,
    @ClientInfo() clientInfo: { ip: string; userAgent: string },
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    // Log user update with changes
    const changes = Object.keys(updateUserDto);
    this.securityLogger.logUserUpdated(
      updatedUser.id,
      updatedUser.email || `User-${updatedUser.id}`,
      currentUser?.userId || 'system',
      currentUser?.email || 'system',
      clientInfo.ip,
      changes,
    );

    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: any,
    @ClientInfo() clientInfo: { ip: string; userAgent: string },
  ) {
    // Get user info before deletion
    const userToDelete = await this.usersService.findOne(id);

    await this.usersService.remove(id);

    // Log user deletion
    this.securityLogger.logUserDeleted(
      userToDelete.id,
      userToDelete.email || `User-${userToDelete.id}`,
      currentUser?.userId || 'system',
      currentUser?.email || 'system',
      clientInfo.ip,
    );
  }
}
