import { IsNotEmpty, IsString } from "class-validator";
import { Ciudad } from "src/ciudad/entities/ciudad.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'escuela'})
export class Escuela {

    //Atributos
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsString()
    @IsNotEmpty()
    nombre:string;

    @Column()
    @IsString()
    @IsNotEmpty()
    domicilio:string;

    @ManyToOne(()=>Ciudad,ciudad=>ciudad.escuelas)
    @JoinColumn({name:"fk_id_ciudad"})
    public ciudad:Ciudad;

    @OneToMany(()=>Clase,clases=>clases.escuela)
    public clases:Clase;

    //Constructor
    constructor(nombre:string,domicilio:string) {
        this.nombre = nombre;
        this.domicilio = domicilio;
    }

    //Metodos
    //Get
    public getId():number {
        return this.id;
    }

    public getNombre():string {
        return this.nombre;
    }

    public getDomicilio():string {
        return this.domicilio;
    }

    public setNombre(nombre:string):void {
        this.nombre = nombre;
    }

    //Set
    public setDomicilio(domicilio:string):void {
        this.domicilio = domicilio;
    }
}
