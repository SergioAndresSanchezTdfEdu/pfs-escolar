import { Escuela } from "src/escuela/entities/escuela.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CiudadProfesor } from "./ciudad_profesor.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { CiudadEstudiante } from "./ciudad_estudiante.entity";

@Entity({name: 'ciudad'})
export class Ciudad{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(()=>Escuela, escuela=>escuela.ciudad)
    public escuelas:Escuela[];

    @OneToMany(()=>CiudadProfesor,direcciones=>direcciones.ciudad)
    direcciones:CiudadProfesor[];

    @OneToMany(()=>CiudadEstudiante,direccionesE=>direccionesE.ciudad)
    direccionesE:CiudadEstudiante[];

    constructor(nombre: string){
        this.nombre = nombre;
    }

    public getId():number{
        return this.id;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string){
        this.nombre = nombre;
    }
}