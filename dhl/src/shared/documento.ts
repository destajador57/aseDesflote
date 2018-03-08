export interface Documento {
    placaDelantera: string,
    placaTrasera: string,
    interior: string,
    tablero: string,
    motor: string,
    tarjeta: string,
    verificacion: string,
    gases: string,
    escape: string,
    transmision: string
}

export enum Tipo {
    placaDelantera=1,
    placaTrasera,
    interior,
    tablero,
    motor,
    tarjeta,
    verificacion,
    gases,
    escape,
    transmision
}