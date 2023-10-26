import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Clase } from "./clase.entity";

@Entity({name: 'clase_estudiante'})
export class ClaseEstudiante {
    @PrimaryColumn()
    estudianteId : number;

    @PrimaryColumn()
    claseId : number;

    constructor(estudianteId:number,claseId:number){
        this.estudianteId = estudianteId;
        this.claseId = claseId;
    }

    @ManyToOne(()=>Estudiante, estudiante=>estudiante.claseEstudiante)
    @JoinColumn()
    estudiante:Estudiante;

    @ManyToOne(()=>Clase, clase=>clase.claseEstudiante)
    @JoinColumn()
    clase:Clase;
}