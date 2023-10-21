import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator"; // npm i class-validator
import { Clase } from "src/clase/entities/clase.entity";
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";

@Entity({name:'profesor'})
export class Profesor {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @IsNotEmpty()
    nombre:string;

    @Column()
    @IsString()
    @IsNotEmpty()
    apellido:string;

    @OneToMany(()=>Clase,clases=>clases.profesor)
    public clases:Clase[];

    @OneToMany(()=>Ciudad, ciudad=>ciudad.direcciones)
    public ciudad:Ciudad[];

    @OneToMany(()=>CiudadProfesor,direcciones=>direcciones.profesor)
    direcciones:CiudadProfesor[];

    constructor(nombre:string,apellido:string) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public getId():number {
        return this.id;
    }

    public getNombre():string {
        return this.nombre;
    }

    public getApellido():string {
        return this.apellido;
    }

    public setNombre(nombre:string):void {
        this.nombre = nombre;
    }

    public setApellido(apellido:string):void {
        this.apellido = apellido;
    }
}
