import { IsNotEmpty} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clase'})
export class Clase {
    //Atributos
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    nombre:string;

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
