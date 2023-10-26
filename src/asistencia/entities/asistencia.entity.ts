import { ClaseEstudiante } from "src/clase/entities/clase-estudiante.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'asistencia'})
export class Asistencia {
    @PrimaryColumn({name: 'claseEstudianteClaseId'})
    claseId : number;

    @PrimaryColumn({name: 'claseEstudianteEstudianteId'})
    estudianteId : number;

    @CreateDateColumn()
    fecha: Date;

    constructor(claseId:number, estudianteId:number){
        this.claseId = claseId;
        this.estudianteId = estudianteId;
    }
    
    @ManyToOne(()=>ClaseEstudiante,claseEstudiante=>claseEstudiante.asistencias)
    @JoinColumn()
    claseEstudiante:ClaseEstudiante;

}
