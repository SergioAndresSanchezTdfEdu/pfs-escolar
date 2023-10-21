import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";

@Entity({name: 'ciudad_estudiante'})
export class CiudadEstudiante{
    @PrimaryGeneratedColumn()
    direccion: string;

    @ManyToOne(()=>Estudiante, estudiante=>estudiante.direccionesE)
    public estudiante:Estudiante;

    @ManyToOne(()=>Ciudad, ciudad=>ciudad.direccionesE)
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