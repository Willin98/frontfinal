import { IComidaItem } from '@core/interfaces/film-home.interface';
import { ComidasService } from '@core/services/comidas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@film/core/services/cart.service.ts.service';
import { loadData, closeAlert } from '@shared/alerts/alerts';
import { CURRENCY_SELECT } from '@core/constants/config';
import { ICartComida } from '@film/core/components/shopping-cart/shoppin-cart.interface';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.scss']
})
export class ComidaComponent implements OnInit {
  loading: boolean;
  comida: IComidaItem;
  selectImage: string;
  relationalFilms: Array<Object> = [];
  currency = CURRENCY_SELECT;
  constructor(
    private comidaService: ComidasService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      loadData("Cargando Datos", "");
      this.loading = true;
      this.loadDataValue(+params.id);
    });
    this.cartService.itemsVar$.subscribe((data: ICartComida) => {
      if (data.subtotal === 0) {
        this.comida.qty = 1;
        return;
      }
      this.comida.qty = this.findComida(+this.comida.id).qty;
      console.log('perro', this.comida);
    });
  }

  findComida (id: number) {
    console.log('prueba de id', id);
    return this.cartService.cart.comidas.find(item => +item.id === id);
  }

  loadDataValue(id: number) {
    this.comidaService.getItem(String(id)).subscribe((result) => {
      this.comida = result;
      //const saveFilmInCart = this.findComida(+this.comida.id);
      this.comida.qty = this.comida.stock;
      this.selectImage = this.comida.img;
      this.loading = false;
      closeAlert();
    })
  }

  changeValue(qty: number) {
    this.comida.qty = qty;
  }

  addTocart() {
    this.cartService.manageComida(this.comida);
  }

}
