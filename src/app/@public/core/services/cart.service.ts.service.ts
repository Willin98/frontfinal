import { ICart } from "./../components/shopping-cart/shoppin-cart.interface";
import { Injectable } from "@angular/core";
import { IComidaItem, IfilmItem } from "@core/interfaces/film-home.interface";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: "root",
})
export class CartService {
  films: Array<IfilmItem> = [];
  comidas: Array<IComidaItem> = [];
  cart: ICart = {
    total: 0,
    subtotal: 0,
    films: this.films,
    comidas: this.comidas
  };
  //Para gestionar los productos con las notificaciones
  public itemsVar = new Subject<ICart>();
  public itemsVar$ = this.itemsVar.asObservable();
  constructor() {}

  //Inicializar el carrito de compra para tener la informacion almacenada
  initialize() {
    const storeData = JSON.parse(localStorage.getItem("cart"));
    if (storeData !== null) {
      this.cart = storeData;
    }
    return this.cart;
  }

  orderDescription() {
    let description = '';
    let descrip = '';
    this.cart.films.map((film: IfilmItem) => {
      description += `${film.name} x ${film.qty}\n`;
    });
    return description;
  }

  public updateItemsInCart(newValue: ICart){
    this.itemsVar.next(newValue);
  }

  manageFilm(film: IfilmItem) {
    //Obtener cantidad de productos en el carrito
    const filmTotal = this.cart.films.length;
    //COmprobar si tiene peliculas
    if (filmTotal === 0) {
      console.log("añadiendo el primer producto");
      this.cart.films.push(film);
    } else {
      let actionUdateOk = false;
      //Comprobar si tenemos peliculas hacer lo siguiente
      for (let i = 0; i < filmTotal; i++) {
        //Comprobar que coincide el producto con alguno de la lista
        if (film.id === this.cart.films[i].id) {
          console.log("producto existente y gestionarlo");
          if (film.qty === 0) {
            //Quitar elemento
            this.cart.films.splice(i, 1);
          } else {
            //Actualizar con la nueva informacion
            console.log('agregando uno igual');
            this.cart.films[i] = film;
          }
          actionUdateOk = true;
          i = filmTotal;
        }
      }
      if (!actionUdateOk) {
        this.cart.films.push(film);
      }
    }
    this.checkoutTotal();
  }

  manageComida(comida: IComidaItem) {
    //Obtener cantidad de productos en el carrito
    const comidaTotal = this.cart.comidas.length;
    //COmprobar si tiene peliculas
    if (comidaTotal === 0) {
      console.log("añadiendo el primer producto");
      this.cart.comidas.push(comida);
    } else {
      let actionUdateOk = false;
      //Comprobar si tenemos peliculas hacer lo siguiente
      for (let i = 0; i < comidaTotal; i++) {
        //Comprobar que coincide el producto con alguno de la lista
        if (comida.id === this.cart.comidas[i].id) {
          console.log("producto existente y gestionarlo");
          if (comida.qty === 0) {
            //Quitar elemento
            this.cart.comidas.splice(i, 1);
          } else {
            //Actualizar con la nueva informacion
            console.log('agregando uno igual');
            this.cart.comidas[i] = comida;
          }
          actionUdateOk = true;
          i = comidaTotal;
        }
      }
      if (!actionUdateOk) {
        this.cart.comidas.push(comida);
      }
    }
    this.checkoutTotal();
  }
  //Añadir la informacion final antes de realizar la compra
  checkoutTotal() {
    let subtotal = 0;
    let total = 0;
    this.cart.films.map((film: IfilmItem) => {
      subtotal += film.qty;
      total += film.qty * film.price;
    });

    this.cart.total = total;
    this.cart.subtotal = subtotal;
    this.setInfo();
  }

  clear() {
    this.films = [];
    this.cart = {
      total: 0,
      subtotal: 0,
      films: this.films,
      comidas: this.comidas
    };
    this.setInfo();
    return this.cart;
  }

  private setInfo() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemsInCart(this.cart);
  }

  open() {
    document.getElementById("mySidenav").style.width = "500px";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("app").style.overflow = "hidden";
  }

  close() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("overlay").style.display = "none";
    document.getElementById("app").style.overflow = "auto";
  }
}
