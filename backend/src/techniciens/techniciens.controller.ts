import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { TechniciensService } from './techniciens.service';
import { CreateTechnicienDto } from './dto/create-technicien.dto';
import { UpdateTechnicienDto } from './dto/update-technicien.dto';

@Controller('techniciens')
export class TechniciensController {
  constructor(private readonly techniciensService: TechniciensService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTechnicienDto: CreateTechnicienDto) {
    return this.techniciensService.create(createTechnicienDto);
  }

  @Get()
  findAll() {
    return this.techniciensService.findAll();
  }

  @Get('active')
  findAllActive() {
    return this.techniciensService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techniciensService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTechnicienDto: UpdateTechnicienDto) {
    return this.techniciensService.update(id, updateTechnicienDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.techniciensService.remove(id);
  }
}
