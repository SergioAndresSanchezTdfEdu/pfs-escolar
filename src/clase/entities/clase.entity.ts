import { IsNotEmpty} from "class-validator";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clase'})
export class Clase {
    //Atributos
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    nombre:string;

    //Relaciones
    @ManyToOne(()=>Profesor,profesor=>profesor.clases)
    @JoinColumn({name:"fk_id_profesor"})
    public profesor:Profesor;

    @ManyToOne(()=>Escuela,escuela=>escuela.clases)
    @JoinColumn({name:"fk_id_escuela"})
    public escuela:Escuela;

    @ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
    @JoinTable({name:"clase_estudiante"})
    public estudiantes:Estudiante[];

    //Constructor
    constructor(nombre:string) {
        this.nombre = nombre;
    }

    //Metodos
    //Get
    public getId():number {
        return this.id;
    }

    public getNombre():string {
        return this.nombre;
    }

    //Set
    public setNombre(nombre:string):void {
        this.nombre = nombre;
    }
}
