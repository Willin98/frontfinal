import { ICart } from './../../../core/components/shopping-cart/shoppin-cart.interface';
import { CartService } from "./../../../core/services/cart.service.ts.service";
import { ActivatedRoute } from "@angular/router";
import { FilmsService } from "@core/services/films.service";
import { Component, OnInit } from "@angular/core";
import { IfilmItem } from "@core/interfaces/film-home.interface";
import { loadData, closeAlert } from "@shared/alerts/alerts";
import { CURRENCY_SELECT } from "@core/constants/config";
@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"],
})
export class DetailsComponent implements OnInit {
  product: IfilmItem;
  //= products[Math.floor(Math.random() * products.length)];
  selectImage: string;
  platform: string;
  loading: boolean;
  relationalFilms: Array<Object> = [];
  currency = CURRENCY_SELECT;
  selectVideo: string;
  constructor(
    private filmService: FilmsService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      loadData("Cargando Datos", "");
      this.loading = true;
      this.loadDataValue(+params.id);
    });
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data.subtotal === 0) {
        this.product.qty = 1;
        return;
      }
      this.product.qty = this.findFilm(+this.product.id).qty;
    });
  }

  findFilm (id: number) {
    console.log(this.cartService.cart.films);
    return this.cartService.cart.films.find(item => +item.id === id);
    
  }

  loadDataValue(id: number) {
    this.filmService.getItem(String(id)).subscribe((result) => {
      this.product = result.films;
      console.log('video', this.product);
      const saveFilmInCart = this.findFilm(+this.product.id);
      this.product.qty = (saveFilmInCart) !== undefined ? saveFilmInCart.qty : this.product.qty;
      this.selectImage = this.product.poster;
      this.relationalFilms = result.relational;
      this.selectVideo = this.product.clip;
      this.platform = result.platform.name;
      this.loading = false;
      closeAlert();
    });
  }
  changeValue(qty: number) {
    this.product.qty = qty;
  }

  selectOtherPlatform($event) {
    this.loadDataValue(+$event.target.value);
  }

  addTocart() {
    this.cartService.manageFilm(this.product);
  }
}
