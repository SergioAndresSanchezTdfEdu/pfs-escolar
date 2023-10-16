import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaDto } from './dto/escuela.dto';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Post('crear')
  async create(@Body() escuelaDto: EscuelaDto) : Promise<boolean> {
    return await this.escuelaService.create(escuelaDto);
  }

  @Get('orm')
  async findAll() : Promise<EscuelaDto[]> {
    return await this.escuelaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<EscuelaDto>{
    return await this.escuelaService.findOne(id);
  }

  @Patch('actualizar/:id')
  async update(@Param('id') id: number, @Body() escuelaDto: EscuelaDto) : Promise<String> {
    return await this.escuelaService.update(id, escuelaDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id: number) : Promise<EscuelaDto>{
    return await this.escuelaService.remove(id);
  }
}
