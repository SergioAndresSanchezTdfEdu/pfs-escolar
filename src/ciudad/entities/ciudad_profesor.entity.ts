import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name: 'ciudad_profesor'})
export class CiudadProfesor{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    direccion: string;

    @ManyToOne(()=>Profesor, profesor=>profesor.direcciones)
    public profesor:Profesor;

    @ManyToOne(()=>Ciudad, ciudad=>ciudad.direcciones)
    public ciudad:Ciudad;

    //GET
    public getId():number{
        return this.id;
    }
 
    public getDireccion():string{
        return this.direccion;
    }

    //SET
    public setDireccion(direccion:string){
        this.direccion = direccion;
    }
}