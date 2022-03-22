import { ICart } from './../../../../core/components/shopping-cart/shoppin-cart.interface';
import { Component, OnInit } from '@angular/core';
import { CURRENCY_CODE, CURRENCY_SELECT } from '@core/constants/config';
import { CartService } from '@film/core/services/cart.service.ts.service';

@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss']
})
export class CheckoutResumeComponent implements OnInit {
  currencySelect = CURRENCY_SELECT;
  currencyCode = CURRENCY_CODE;
  cart: ICart;
  constructor(private cartService: CartService) { 
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if (data !== undefined && data !== null) {
        this.cart = data;
      }
    });
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
  }

}
