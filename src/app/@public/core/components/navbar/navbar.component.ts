import { ICart } from './../shopping-cart/shoppin-cart.interface';
import { Router } from "@angular/router";
import { IMeData } from "@core/interfaces/session.interface";
import { AuthService } from "@core/services/auth.service";
import { Component, OnInit } from "@angular/core";
import shopMenuItems from "@data/menus/film.json";
import { IMenuItem } from "@core/interfaces/menu-item.interface";
import { CartService } from "@film/core/services/cart.service.ts.service";
import { REDIRECTS_ROUTES } from "@core/constants/config";
import { optionsWithDetails } from '@shared/alerts/alerts';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  cartItemsTotal: number;
  menuItems: Array<IMenuItem> = shopMenuItems;
  session: IMeData = {
    status: false,
  };

  access = false;
  role: string;
  userLabel = "";
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.authService.accessVar$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.role;
      this.userLabel = `${this.session.user?.name} ${this.session.user?.lastname}`;
      this.cartService.itemsVar$.subscribe((data: ICart) => {
        if(data !== undefined && data !== null) {
          this.cartItemsTotal = data.subtotal;
        }
      });
    });
  }

  ngOnInit(): void {
    this.cartItemsTotal = this.cartService.initialize().subtotal;
  }

  async logout() {
    this.authService.resetSession(this.router.url);
  }

  open() {
    this.cartService.open();
  }
}
