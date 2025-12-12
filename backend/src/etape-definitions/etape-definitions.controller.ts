import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { EtapeDefinitionsService } from './etape-definitions.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('etape-definitions')
@UseGuards(JwtAuthGuard)
export class EtapeDefinitionsController {
  constructor(
    private readonly etapeDefinitionsService: EtapeDefinitionsService,
  ) {}

  @Get()
  findAll() {
    return this.etapeDefinitionsService.findAll();
  }

  @Get(':numeroEtape')
  findOne(@Param('numeroEtape') numeroEtape: string) {
    return this.etapeDefinitionsService.findOneByNumero(
      parseInt(numeroEtape),
    );
  }

  @Patch(':numeroEtape/permissions')
  @UseGuards(AdminGuard)
  updatePermissions(
    @Param('numeroEtape') numeroEtape: string,
    @Body() updatePermissionsDto: UpdatePermissionsDto,
  ) {
    return this.etapeDefinitionsService.updatePermissions(
      parseInt(numeroEtape),
      updatePermissionsDto.permissions,
    );
  }

  @Get(':numeroEtape/user-permissions')
  getUserPermissions(
    @Param('numeroEtape') numeroEtape: string,
    @CurrentUser() user: any,
  ) {
    return this.etapeDefinitionsService.getUserPermissionsForEtape(
      user.userId,
      parseInt(numeroEtape),
    );
  }
}
