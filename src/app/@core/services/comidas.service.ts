import { Apollo } from "apollo-angular";
import { ApiService } from "@graphql/services/api.service";
import { Injectable } from "@angular/core";
import { map } from "rxjs/internal/operators/map";
import {
  COMIDAS_LIST_QUERY,
  COMIDA_LIST_QUERY,
} from "@graphql/operations/query/comida";
import { IComidaItem } from "@core/interfaces/film-home.interface";

@Injectable({
  providedIn: "root",
})
export class ComidasService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  getComidas(page: number = 1, itemsPage: number = 20) {
    return this.get(COMIDAS_LIST_QUERY, {
      include: true,
      itemsPage,
      page,
    }).pipe(
      map((result: any) => {
        const comidaList_ = result.comidas.comidas;
        const resultList: Array<IComidaItem> = [];
        comidaList_.map((shopObject) => {
          resultList.push(this.setInObject(shopObject));
        });
        return resultList;
      })
    );
  }

  private setInObject(shopObject) {
    return {
      name: shopObject.name,
      description: shopObject.description,
      stock: shopObject.stock,
      price: shopObject.price,
      img: shopObject.img,
      id: shopObject.id,
      qty: 1,
    };
  }

  getItem(id: string) {
    return this.get(
      COMIDA_LIST_QUERY,
      {
        id,
      },
      {},
      false
    ).pipe(
      map((result: any) => {
        return result.comida.comida;
      })
    );
  }
}
