import { IProximamenteItem } from "@core/interfaces/film-home.interface";
import { Injectable } from "@angular/core";
import {
  PROXIMAMENTES,
  PROXIMAMENTE_DETAILS,
} from "@graphql/operations/query/proximamente";
import { ApiService } from "@graphql/services/api.service";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class ProximamentesService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getProximamentes(page: number = 1, itemsPage: number = 20) {
    return this.get(PROXIMAMENTES, {
      include: true,
      itemsPage,
      page,
    }).pipe(
      map((result: any) => {
        const proximamenteList_ = result.proximamentes.proximamentes;
        console.log('servicio', proximamenteList_);
        const resultList: Array<IProximamenteItem> = [];
        proximamenteList_.map((shopObject) => {
          resultList.push(this.setInObject(shopObject));
        });
        return resultList;
      })
    );
  }

  private setInObject(shopObject) {
    return {
      id: shopObject.id,
      name: shopObject.film.name,
      poster: shopObject.film.poster,
      description: shopObject.film.description,
      img: shopObject.film.img,
      premiere: shopObject.premiere,
      clip: shopObject.film.clip,
    };
  }

  getItem(id: string) {
    return this.get(
      PROXIMAMENTE_DETAILS,
      {
        id,
      },
      {},
      false
    ).pipe(
      map((result: any) => {
        const data = result.proximamenteDetails;
        return {
          films: this.setInObject(data.proximamente),
        };
      })
    );
  }
}
