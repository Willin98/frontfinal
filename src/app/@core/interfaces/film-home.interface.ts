export interface IFilmCarousel {
    id: string;
    name: string;
    description: string;
    background: string;
}

export interface IfilmItem {
    id: string;
    name: string;
    description: string;
    poster: string;
    stock: number;
    price: number;
    qty?: number;
    img: string;
    clip: string;
    platform?: string;
}

export interface IProximamenteItem {
    id: string;
    name: string;
    description: string;
    poster: string;
    img: string;
    clip: string;
    premiere: string;
}

export interface IComidaItem {
    id: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    img: string;
    qty?: number;
}
