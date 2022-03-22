import { IComidaItem, IfilmItem } from "@core/interfaces/film-home.interface";

export interface ICart {
    total: number; //Almacenamos el total a pagar
    subtotal: number; //NUmero de unidades totales
    films: Array<IfilmItem>; //Peliculas almacenadas
    comidas: Array<IComidaItem>;
}

export interface ICartComida {
    total: number; //Almacenamos el total a pagar
    subtotal: number; //NUmero de unidades totales
    comidas: Array<IComidaItem>;
}