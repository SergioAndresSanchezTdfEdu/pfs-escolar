import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name: 'ciudad_profesor'})
export class CiudadProfesor{

    constructor(ciudadId:number, profesorId:number, direccion:string){
        this.ciudadId = ciudadId;
        this.profesorId = profesorId;
        this.direccion = direccion;
    }
    
    @PrimaryColumn()
    ciudadId: number;

    @PrimaryColumn()
    profesorId: number;
    
    @Column()
    direccion: string;

    @ManyToOne(()=>Profesor, profesor=>profesor.direcciones)
    public profesor:Profesor;

    @ManyToOne(()=>Ciudad, ciudad=>ciudad.direcciones)
    public ciudad:Ciudad;

    //GET
    public getDireccion():string{
        return this.direccion;
    }

    //SET
    public setDireccion(direccion:string){
        this.direccion = direccion;
    }
}