import { SHOP_FILM_DETAILS } from './../../@graphql/operations/query/shop-film';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { SHOP_FILM_BY_PLATFORM } from '@graphql/operations/query/shop-film';
import { ACTIVE_FILTERS } from '@core/constants/filters';
import { map } from 'rxjs/internal/operators/map';
import { IfilmItem } from '@core/interfaces/film-home.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmsService extends ApiService {

  constructor(apollo: Apollo) { 
    super(apollo);
  }

  getBy(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
  ){
    return this.get(
      SHOP_FILM_BY_PLATFORM,
      {
        page,
        itemsPage,
        active,
      }
    ).pipe(map((result: any) => {
      const filmList_ = result.shopFilms.shopFilms;
      const resultList: Array<IfilmItem> = [];
      filmList_.map((shopObject) => {
        resultList.push(this.setInObject(shopObject));
      });
      return resultList;
    }));
  }

  private setInObject (shopObject){
    return {
      id: shopObject.id,
      poster: shopObject.film.poster,
      name: shopObject.film.name,
      description: shopObject.film.description,
      img: shopObject.film.img,
      qty: 1,
      price: shopObject.price,
      stock: shopObject.stock,
      clip: shopObject.film.clip
    };
  }
  getItem(id: string) {
    return this.get(
      SHOP_FILM_DETAILS, {
        id
      }, { }, false
    ).pipe(map((result: any) => {
      const data = result.shopFilmDetails;
      return {
        films: this.setInObject(data.shopFilm),
        relational: data.shopFilm.relationalFilms,
        platform: data.shopFilm.platform
      };
    }));
  }
}
