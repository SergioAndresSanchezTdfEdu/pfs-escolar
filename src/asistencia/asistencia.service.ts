import { Injectable } from '@nestjs/common';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { Repository } from 'typeorm';
import { ClaseEstudiante } from 'src/clase/entities/clase-estudiante.entity';

@Injectable()
export class AsistenciaService {

  constructor(@InjectRepository(Asistencia)
              private readonly asistenciaRepository: Repository<Asistencia>,
              @InjectRepository(ClaseEstudiante)
              private readonly claseEstudianteRepository: Repository<ClaseEstudiante>){}

  async create(createAsistenciaDto: CreateAsistenciaDto) : Promise<any>{
    const {estudianteId,claseId} = createAsistenciaDto;

    const asistencia_estudiante = await this.claseEstudianteRepository.findOne({where:{estudianteId:estudianteId,claseId:claseId}});
    if(!asistencia_estudiante)
      return `ERROR - No exite Clase Estudiante`;
    return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId))

  }

  findAll() {
    return `This action returns all asistencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asistencia`;
  }

  update(id: number, createAsistenciaDto: CreateAsistenciaDto) {
    return `This action updates a #${id} asistencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} asistencia`;
  }
}
