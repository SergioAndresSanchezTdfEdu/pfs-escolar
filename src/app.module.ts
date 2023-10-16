import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ClaseModule } from './clase/clase.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Jobara123',
    database: 'db_colegio',
    entities: [__dirname + "/**/**/**.entity{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: true // Solo en modo desarrollo, en producción debe estar el False
    // En true crea la tabla, luego pasar a false para que no borre lo cargado en la tabla
  }), CiudadModule, ProfesorModule, EscuelaModule, ClaseModule, AsistenciaModule, EstudianteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}