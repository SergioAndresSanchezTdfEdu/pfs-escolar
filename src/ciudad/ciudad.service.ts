import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Ciudad } from './entities/ciudad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CiudadDTO } from './dto/ciudad.dto';

@Injectable()
export class CiudadService {

    private ciudades:Ciudad[] = [];

    constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>
    ){}

    async crearCiudad(ciudadDTO : CiudadDTO): Promise<boolean>{
        //let ciudad : Ciudad = new Ciudad(ciudadDTO.nombre);
        //this.ciudadRepository.save(ciudad);
        try{
            let ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
            if(ciudad)
                return true;
            else
            throw new Error('No se puede crear la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en Ciudad: ' + error
            },HttpStatus.NOT_FOUND)
        }
    }

    async findAllRaw() : Promise<CiudadDTO[]> {
        try{
            this.ciudades = [];
            let datos = await this.ciudadRepository.query("SELECT * FROM ciudad");

            datos.forEach(element => {
                let ciudad : Ciudad = new Ciudad(element['nombre']);
                this.ciudades.push(ciudad);
            });
            if(this.ciudades)
                return this.ciudades;
            else
                throw new Error('No se encuentra la ciudad');
        }catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en Ciudad: ' + error
            },HttpStatus.NOT_FOUND)
        }

    }

    async findAllOrm(): Promise<CiudadDTO[]> {
        try{
            return await this.ciudadRepository.find();    
        }catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'No se peuden obtener las ciudades: ' + error
            },HttpStatus.NOT_FOUND)
        }
    }

    async findById(id:number): Promise<CiudadDTO> {
        try {
            const criterio : FindOneOptions = { where: {id:id} };
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            if (ciudad)
                return ciudad;
            else
                throw new Error('No se encuentra la ciudad');
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'Error en Ciudad: ' + error
            },HttpStatus.NOT_FOUND)
        }
        //return await this.ciudadRepository.findOne(id);
    }

    async actualizarCiudadId(ciudadDTO : CiudadDTO, id : number): Promise<String>{
        try{
            const criterio : FindOneOptions = {where: {id:id}}
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            
            if(ciudad){
                let ciudadVieja = ciudad.getNombre();
                ciudad.setNombre(ciudadDTO.nombre);
                ciudad = await this.ciudadRepository.save(ciudad);
                
                return `OK - Se cambió: ${ciudadVieja} por ${ciudadDTO.nombre}`;
            }
            else
                throw new Error('No se pudo encontrar la ciudad a modificar');
        }catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en Ciudad: ' + error
            },HttpStatus.NOT_FOUND)
        }
    }

    async eliminarCiudadId(id:number) : Promise<any>{
        try{
            const criterio : FindOneOptions = {where: {id:id}}
            let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
            
            if(!ciudad)
                throw new Error('No se pudo eliminar la ciudad');
            else{
                await this.ciudadRepository.remove(ciudad);
                return { id:id,
                        message:'Se elimino exitosamente la ciudad'};
            }
        }
        catch(error){
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Error en Ciudad: ' + error
            },HttpStatus.NOT_FOUND)
        }
    }
}
