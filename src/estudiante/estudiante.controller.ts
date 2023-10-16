import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/estudiante.dto';

@Controller('estudiante')
export class EstudianteController {

  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('crear')
  async create(@Body() estudianteDto: EstudianteDto) : Promise<boolean>{
    return await this.estudianteService.create(estudianteDto);
  }

  @Get('orm')
  async findAll() : Promise<EstudianteDto[]> {
    return await this.estudianteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<EstudianteDto>{
    return await this.estudianteService.findOne(id);
  }

  @Put('actualizar/:id')
  async update(@Param('id') id: number, @Body() estudianteDto: EstudianteDto) : Promise<String>{
    return this.estudianteService.update(id, estudianteDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number) : Promise<any> {
    return await this.estudianteService.remove(id);
  }
}
