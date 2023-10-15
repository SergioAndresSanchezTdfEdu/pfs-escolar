import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadService } from './ciudad.service';
import { CiudadDTO } from './dto/ciudad.dto';

@Controller('ciudad')
export class CiudadController {

    constructor(private readonly ciudadService: CiudadService) {}

    @Get('raw')
    async getAllRaw(): Promise<CiudadDTO[]> {
        return await this.ciudadService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm(): Promise<CiudadDTO[]> {
        return await this.ciudadService.findAllOrm();
    }

    @Get(':id')
    async getId(@Param('id')id:number): Promise<CiudadDTO> {
        return await this.ciudadService.findById(id);
    }

    @Post('crear')
    async crearCiudad(@Body() ciudadDTO: CiudadDTO): Promise<boolean> {
        return await this.ciudadService.crearCiudad(ciudadDTO);
    }
    
    @Put('actualizar/:id')
    async actualizarCiudadId(@Body() ciudadDTO: CiudadDTO, @Param('id')id:number): Promise<String> {
        return await this.ciudadService.actualizarCiudadId(ciudadDTO,id);
    }

    @Delete('eliminar/:id')
        async eliminarCiudadId(@Param('id')id:number): Promise<Ciudad> {
            return await this.ciudadService.eliminarCiudadId(id);
    }


}
