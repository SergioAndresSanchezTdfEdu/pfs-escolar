import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClaseDto } from './dto/clase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClaseService {

  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
    ){}

  /*private async buscarPorCriterio(criterioRecibido : string) : Promise<Clase> {
    const criterio : FindOneOptions = {where:{criterioRecibido}};
    let clase : Clase = await this.claseRepository.findOne(criterio);
    return clase;
  }*/
    
  async crearClase(claseDto: Clase) : Promise<boolean>{
    try{
        //let claseACrear : Clase = new Clase(claseDto.nombre);
        //let claseCreadaEnLaBase = await this.claseRepository.save(claseACrear);
        let clase : Clase = await this.claseRepository.save(new Clase(claseDto.nombre));
        if(clase)
          return true;
        else    
          throw new Error('No s epudo crear la clase');
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase - ' + error
      },HttpStatus.NOT_FOUND);
    }

  }

  async buscarTodos() : Promise<Clase[]>{
    try{
      return await this.claseRepository.find({relations:['estudiantes']});
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase - ' + error
      },HttpStatus.NOT_FOUND);
    }
}

  async buscarPorId(id: number) : Promise<Clase>{
    try {	
        //const criterio : FindOneOptions = {where:{id:id}}
        //let clase : Clase = await this.claseRepository.findOne(criterio);
        let clase : Clase = await this.claseRepository.findOne({where:{id:id} , relations:['estudiantes']});
        if(clase)
          return clase;
        else
        throw new Error('No se encontro la ciudad');
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async actualizarClase(id: number, claseDto: Clase) : Promise<String>{
    try{
        const criterio : FindOneOptions = {where:{id:id}};
        let clase : Clase = await this.claseRepository.findOne(criterio);
        let nombreViejo = clase.getNombre();
        if(clase){
          clase.setNombre(claseDto.getNombre());
          clase = await this.claseRepository.save(clase);
          if(clase)
            return `Se reemplazo: ${nombreViejo} --> ${clase.getNombre}`;
          else 
          throw new Error('No se puedo reemplazar');
        }
        else
        throw new Error('No se encontro la clase');
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async eliminarClase(id: number) : Promise<boolean> {
    try{
        const criterio : FindOneOptions = {where:{id:id}};
        const clase : Clase = await this.claseRepository.findOne(criterio);
        if(clase){
          await this.claseRepository.remove(clase);
          return true;
        }
        else
          throw new Error('No se encontro la clase para eliminar.');
    }
    catch(error){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Problemas en Clase - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}