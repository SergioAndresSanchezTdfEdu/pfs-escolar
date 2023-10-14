import { Controller, Get } from '@nestjs/common';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadService } from './ciudad.service';

@Controller('ciudad')
export class CiudadController {

    constructor(private readonly ciudadService: CiudadService) {}

    @Get('raw')
    async getAllRaw(): Promise<Ciudad[]> {
        return await this.ciudadService.findAllRaw();
    }

    @Get('orm')
    async getAllOrm(): Promise<Ciudad[]> {
        return await this.ciudadService.findAllOrm();
    }

}
