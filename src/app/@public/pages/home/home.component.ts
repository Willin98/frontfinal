import { IProximamenteItem } from '@core/interfaces/film-home.interface';
import { IfilmItem } from '@core/interfaces/film-home.interface';
import { Router } from '@angular/router';
import { FilmsService } from '@core/services/films.service';
import { UsersService } from '@core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { loadData, closeAlert } from '@shared/alerts/alerts';
import { CartService } from '@film/core/services/cart.service.ts.service';
import { ProximamentesService } from '@core/services/proximamentes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //fimlItems: Array<IMenuItem> = shopFilmItems;
  items;
  listTwo;
  film: IfilmItem;
  listProx;
  proximamente: IProximamenteItem;
  constructor(private usersApi: UsersService, private films: FilmsService, private router: Router, private cartService: CartService, private proximamentes: ProximamentesService) {}
  
  ngOnInit(): void {
    loadData('Cargando informacion', '');
    this.films.getBy(
      1, 10, ACTIVE_FILTERS.ACTIVE
    ).subscribe(result => {
      console.log('peliculas en cartelera', result);
      this.items = result;
      this.listTwo = result;
    });
    this.proximamentes.getProximamentes(1, 10).subscribe(result => {
      console.log('peliculas proximamente', result);
      this.listProx = result;
    });
    this.usersApi.getUsers(2,1).subscribe((result) => {
      console.log(result);
      url: '/film/details/'.concat(result.id);
    });
    this.usersApi.getUsers(2,1).subscribe((result) => {
      console.log(result);
      url: '/film/proximamentes/'.concat(result.id);
    });
    closeAlert();
  }
  
  open(i: number) {
  }

  showDetails(item: IfilmItem) {
    this.router.navigate(['/films/details', +item.id]);
  }

  showDetailsProx(item: IProximamenteItem) {
    this.router.navigate(['/films/proximamente', +item.id]);
  }

  addToCart(item: IfilmItem) {
    this.cartService.manageFilm(item);
  }

}
