import { ApiService } from '@graphql/services/api.service';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ADD_COMIDA, MODIFY_COMIDA } from '@graphql/operations/mutation/comida';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class ComidasService extends ApiService {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  addComida(genre: string) {
    return this.set(
      ADD_COMIDA,
      {
        genre,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.addComida;
      })
    );
  }

  updateGenre(id: string, comida: string) {
    return this.set(
      MODIFY_COMIDA,
      {
        id,
        comida,
      },
      {}
    ).pipe(
      map((result: any) => {
        return result.updateComida;
      })
    );
  }
}
