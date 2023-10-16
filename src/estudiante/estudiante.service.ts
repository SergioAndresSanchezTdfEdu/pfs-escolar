import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>
  ){}

  async create(estudianteDto: EstudianteDto) : Promise<boolean>{
    try{
      let estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre,estudianteDto.apellido,estudianteDto.fecha_nacimiento));
      
      if(estudiante)
        return true;
      else
        throw new Error('No se puede crear el estudiante');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Estudiante: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async findAll() : Promise<EstudianteDto[]> {
    try{
      return await this.estudianteRepository.find();
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Estudiante: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async findOne(id: number) : Promise<EstudianteDto> {
    try{
      const criterio : FindOneOptions = { where: {id:id} };
      let estudiante : EstudianteDto = await this.estudianteRepository.findOne(criterio);
      if(estudiante)
        return estudiante;
      else
      throw new Error('No se puede encontrar el estudiante');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Estudiante: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async update(id: number, estudianteDto: EstudianteDto) : Promise<String>{
    try{
      const criterio : FindOneOptions = {where: {id: id}};
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);

      if(estudiante){
        let estudianteViejo : Estudiante = new Estudiante(estudiante.getNombre(), estudiante.getApellido(), estudiante.getFecha_nacimiento());

        estudiante.setNombre(estudianteDto.nombre);
        estudiante.setApellido(estudianteDto.apellido);
        estudiante.setFecha_nacimiento(estudianteDto.fecha_nacimiento);

        estudiante = await this.estudianteRepository.save(estudiante);

        return `OK - Se cambió: ${estudianteViejo.nombre} ${estudianteViejo.apellido} nacido el ${estudianteViejo.fecha_nacimiento} por ${estudianteDto.nombre} ${estudianteDto.apellido} nacido el ${estudianteDto.fecha_nacimiento}`;
      }
      else
        throw new Error('No se encuentra el estudiante a modificar');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Estudiante: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }

  async remove(id: number) : Promise<any> {
    try{
      const criterio : FindOneOptions = {where: {id: id}};
      let estudiante : Estudiante = await this.estudianteRepository.findOne(criterio);

      if(estudiante){
        await this.estudianteRepository.remove(estudiante);
        return { id:id,
          message: 'Se elimino el estudiante'
        };
      }
      else
      throw new Error('No se puede eliminar el estudiante');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Estudiante: ' + error
      },HttpStatus.NOT_FOUND)
    } 
  }
}
