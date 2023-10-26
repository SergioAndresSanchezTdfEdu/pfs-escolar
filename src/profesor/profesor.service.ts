import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfesorDto } from './dto/profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { CiudadProfesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(CiudadProfesor)
    private readonly ciudadProfesorRepository: Repository<CiudadProfesor>
  ){}

  async createDomicilio(body){
    //consultar y verificar que la ciudad existe
    const { ciudadId, profesorId, domicilio} = body;

    const profesor = await this.profesorRepository.findOne({where: {id:profesorId}})
    if(!profesor)
      return 'Error - No existe este profesor';
    const ciudad = await this.ciudadRepository.findOne({where: {id:ciudadId}})
    if(!ciudad)
      return 'Error - No existe la ciudad para este profesor';

    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({where:{direccion:domicilio,profesorId:profesorId,ciudadId:ciudadId}})
    if(nuevo_domicilio)
      return 'El profesor ya tiene domicilio';
    return await this.ciudadProfesorRepository.save(new CiudadProfesor(ciudadId,profesorId,domicilio))

    //consultar y verificar que el profesor existe

    //si id del profesor y el id de la ciudadDomicilio
    return 'El profesor ya tiene un domicilio';

    //si el nombre del domicilio idorofesor e idciudad existen

    //agregar a la tabla Ciudad_Profesor
  }

  async create(profesorDto: ProfesorDto) : Promise<boolean>{
    try{
      let profesor : Profesor = await this.profesorRepository.save(new Profesor(profesorDto.nombre,profesorDto.apellido));
      
      if(profesor)
        return true;
      else
        throw new Error('No se puede crear el profesor');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Estudiante: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async findAll() : Promise<ProfesorDto[]> {
    try{
      return await this.profesorRepository.find();
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Profesor: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async findOne(id: number) : Promise<ProfesorDto> {
    try{
      const criterio : FindOneOptions = { where: {id:id} };
      let profesor : ProfesorDto = await this.profesorRepository.findOne(criterio);
      if(profesor)
        return profesor;
      else
      throw new Error('No se puede encontrar el profesor');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Profesor: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async update(id: number, profesorDto: ProfesorDto) : Promise<String>{
    try{
      const criterio : FindOneOptions = {where: {id: id}};
      let profesor : Profesor = await this.profesorRepository.findOne(criterio);

      if(profesor){
        let profesorViejo : Profesor = new Profesor(profesor.getNombre(), profesor.getApellido());

        profesor.setNombre(profesorDto.nombre);
        profesor.setApellido(profesorDto.apellido);

        profesor = await this.profesorRepository.save(profesor);

        return `OK - Se cambió: ${profesorViejo.nombre} ${profesorViejo.apellido}  por ${profesorDto.nombre} ${profesorDto.apellido}`;      }
      else
        throw new Error('No se encuentra el profesor a modificar');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Profesor: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async remove(id: number) : Promise<any> {
    try{
      const criterio : FindOneOptions = {where: {id: id}};
      let profesor : Profesor = await this.profesorRepository.findOne(criterio);

      if(profesor){
        await this.profesorRepository.remove(profesor);
        return { id:id,
          message: 'Se elimino el profesor'
        };
      }
      else
      throw new Error('No se puede eliminar el profesor');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Profesor: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }
}
