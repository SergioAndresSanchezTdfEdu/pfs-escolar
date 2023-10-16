import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { Clase } from './entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  //CRUD
  //READ la lectura pueden ser todos los elementos o uno en especifico

  @Get('buscarTodos')
  async buscarTodos() : Promise<Clase[]>{
    return await this.claseService.buscarTodos();
  }

   @Get('buscar/:id')
  async buscarPorId(@Param('id') id : number) : Promise<Clase>{
    return await this.claseService.buscarPorId(id);
  }
  
  //CREATE

  @Post('crear')
  async crearClase(@Body() clase : Clase) : Promise<boolean>{
    return await this.claseService.crearClase(clase);
  }

  //UPDATE

  @Put('actualizar/:id')
  async actualizarClase(@Param('id') id : number, @Body() clase : Clase) : Promise<String>{
    return await this.claseService.actualizarClase(id,clase);
  }

  //DELETE

  @Delete('eliminar/:id')
  async eliminarClase(@Param('id') id : number) : Promise<boolean>{
    return await this.claseService.eliminarClase(id);
  }
}
