import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EscuelaDto } from './dto/escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelaService {

  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>
  ){}

  async create(escuelaDto: EscuelaDto) : Promise<boolean>{
    try{
      let escuela : Escuela = await this.escuelaRepository.save(new Escuela(escuelaDto.nombre,escuelaDto.domicilio));
      if(escuela)
          return true;
      else
      throw new Error('No se puede crear la escuela');
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: 'Error en Ciudad: ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

  async findAll() : Promise<EscuelaDto[]> {
    try{
        return await this.escuelaRepository.find();
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'No se pueden obtener las escuelas: ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: number) : Promise<EscuelaDto> {
    try{
        const criterio : FindOneOptions = { where: {id:id} };
        let escuela : EscuelaDto = await this.escuelaRepository.findOne(criterio);
        if (escuela)
            return escuela;
        else
            throw new Error('No se encuentra la escuela');
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'No se pueden obtener las escuelas: ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, escuelaDto: EscuelaDto) : Promise<String> {
    try{
      const criterio : FindOneOptions = { where: {id:id} };
      let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
      
      if (escuela){
          let escuelaVieja : Escuela = new Escuela(escuela.getNombre(),escuela.getDomicilio());
          escuela.setNombre(escuelaDto.nombre);
          escuela.setDomicilio(escuelaDto.domicilio)
          escuela = await this.escuelaRepository.save(escuela);

          return `OK - Se cambió: ${escuelaVieja.nombre} con ${escuelaVieja.domicilio} por ${escuelaDto.nombre} con ${escuelaDto.domicilio}`;
      }
      else
          throw new Error('No se encuentra la escuela a modificar');
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'No se pueden obtener las escuelas: ' + error
      },HttpStatus.NOT_FOUND)
    }
  }

  async remove(id: number) :Promise<any> {
    try{
      const criterio : FindOneOptions = { where: {id:id} };
      let escuela : Escuela = await this.escuelaRepository.findOne(criterio);
      
      if (escuela){
        await this.escuelaRepository.remove(escuela);
          return { id:id,
                  message: 'Se elimino la escuela'
          };
      }
      else
          throw new Error('No se encuentra la escuela a eliminar');
    }catch(error){
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'No se pueden obtener las escuelas: ' + error
      },HttpStatus.NOT_FOUND)
    }
  }
}
