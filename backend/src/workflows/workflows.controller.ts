import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { UpdateEtapeDto } from './dto/update-etape.dto';
import { CancelWorkflowDto } from './dto/cancel-workflow.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('workflows')
@ApiBearerAuth('JWT-auth')
@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) { }

  @Post()
  create(@Body() createWorkflowDto: CreateWorkflowDto) {
    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.workflowsService.findAll(paginationDto);
  }

  @Get('statistics')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60000) // Cache for 60 seconds
  getStatistics() {
    return this.workflowsService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workflowsService.findOneWithPermissions(
      id,
      user.userId,
      user.role,
    );
  }

  @Get(':id/etapes')
  async getEtapes(@Param('id') id: string, @CurrentUser() user: any) {
    const workflow = await this.workflowsService.findOneWithPermissions(
      id,
      user.userId,
      user.role,
    );
    return workflow?.etapes || [];
  }

  @Get(':id/user-permissions')
  getUserPermissions(@Param('id') id: string, @CurrentUser() user: any) {
    return this.workflowsService.getUserPermissionsForWorkflow(
      id,
      user.userId,
      user.role,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowsService.update(id, updateWorkflowDto);
  }

  @Patch(':id/etapes/:numeroEtape')
  async updateEtape(
    @Param('id') id: string,
    @Param('numeroEtape') numeroEtape: string,
    @Body() updateEtapeDto: UpdateEtapeDto,
    @CurrentUser() user: any,
  ) {
    // Validate permissions before updating
    await this.workflowsService.validateEtapeUpdate(
      id,
      parseInt(numeroEtape),
      updateEtapeDto,
      user.userId,
      user.role,
    );

    return this.workflowsService.updateEtape(
      id,
      parseInt(numeroEtape),
      updateEtapeDto,
      user.userId,
      user.role,
    );
  }

  @Post(':id/cancel')
  cancelWorkflow(
    @Param('id') id: string,
    @Body() cancelWorkflowDto: CancelWorkflowDto,
    @CurrentUser() user: any,
  ) {
    return this.workflowsService.cancelWorkflow(
      id,
      cancelWorkflowDto.raison,
      user.userId,
      `${user.nom} ${user.prenom}`,
      user.role, // Pass user role for authorization check
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(id);
  }
}
