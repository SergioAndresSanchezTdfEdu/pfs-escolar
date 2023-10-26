import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { CiudadEstudiante } from "src/ciudad/entities/ciudad_estudiante.entity";
import { ClaseEstudiante } from "src/clase/entities/clase-estudiante.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'estudiante'})
export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    //@Column()
    //fecha_nacimiento: Date;
    @Column({ type: 'date' })
    fecha_nacimiento: string;

    //@ManyToMany(()=>Clase,clases=>clases.estudiantes)
    //public clases:Clase[];
    @OneToMany(()=>ClaseEstudiante,claseEstudiante=>claseEstudiante.estudiante)
    claseEstudiante:ClaseEstudiante[];

    @OneToMany(()=>CiudadEstudiante,direccionesE=>direccionesE.estudiante)
    direccionesE:CiudadEstudiante[];

    constructor(nombre: string,apellido: string,fecha_nacimiento: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getApellido(): string {
        return this.apellido;
    }

    public getFecha_nacimiento(): string {
        return this.fecha_nacimiento;
    }

    public setNombre(nombre : string){
        this.nombre = nombre;
    }

    public setApellido(apellido : string){
        this.apellido = apellido;
    }

    public setFecha_nacimiento(fecha_nacimiento : string){
        this.fecha_nacimiento = fecha_nacimiento;
    }
}
