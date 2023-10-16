import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './dto/profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post('crear')
  async create(@Body() profesorDto: ProfesorDto) : Promise<boolean>{
    return await this.profesorService.create(profesorDto);
  }

  @Get('orm')
  async findAll() : Promise<ProfesorDto[]> {
    return await this.profesorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<ProfesorDto>{
    return await this.profesorService.findOne(id);
  }

  @Put('actualizar/:id')
  async update(@Param('id') id: number, @Body() estudianteDto: ProfesorDto) : Promise<String>{
    return this.profesorService.update(id, estudianteDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number) : Promise<any> {
    return await this.profesorService.remove(id);
  }
}
