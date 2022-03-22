import { Router } from '@angular/router';
import { IfilmItem } from '@core/interfaces/film-home.interface';
import { ICart } from './shoppin-cart.interface';
import { Component, OnInit } from '@angular/core';
import { CartService } from '@film/core/services/cart.service.ts.service';
import { CURRENCY_SELECT } from '@core/constants/config';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart;
  currency = CURRENCY_SELECT;
  constructor(private cartService: CartService, private router: Router) { 
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
    console.log('carrito', this.cart);
  }

  closeNav() {
    this.cartService.close();
  }

  clear() {
    this.cartService.clear();
  }

  clearItem(film: IfilmItem) {
    this.manageFilmUnitInfo(0,film)
  }

  changeValue(qty: number, film: IfilmItem) {
    this.manageFilmUnitInfo(qty, film);
  }

  manageFilmUnitInfo(qty: number, film: IfilmItem){
    film.qty = qty;
    this.cartService.manageFilm(film);
  }

  process() {
    this.router.navigate(['/checkout']);
    this.closeNav();
  }
}
