import { Clase } from "src/clase/entities/clase.entity";

export class EstudianteDto {
    readonly nombre: string;
    readonly apellido: string;
    readonly fecha_nacimiento: string;
    readonly fk_clases: Clase[];
}
