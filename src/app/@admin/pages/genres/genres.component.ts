import { basicAlert } from '@shared/alerts/toasts';
import { GenresService } from './genres.service';
import { GENRE_LIST_QUERY } from '@graphql/operations/query/genre';
import { Component, OnInit } from '@angular/core';
import { IResultData } from '@core/interfaces/result-data.interface';
import { DocumentNode } from 'graphql';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { formBasicDialog, optionsWithDetails } from '@shared/alerts/alerts';
import { TYPE_ALERT } from '@shared/alerts/values.config';
import { TitleService } from '@admin/core/services/title.service';
import { LABEL } from '@admin/core/constants/title.constants';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  query: DocumentNode = GENRE_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;
 
  constructor(private service: GenresService, private titleService: TitleService) {}
  ngOnInit(): void {
    this.titleService.updateTitle(LABEL.GENRES);
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'genres',
      definitionKey: 'genres',
    };
    this.include = false;
    this.columns = [
      {
        property: 'id',
        label: '#',
      },
      {
        property: 'name',
        label: 'Nombre del genero',
      },
      {
        property: 'slug',
        label: 'Slug',
      },
    ];
  }

  async takeAction($event) {
    //Coger la informacion para las acciones
    const action = $event[0];
    const genre = $event[1];
    //Cogemos el valor por defecto
    const defaultValue =
      genre.name !== undefined && genre.name !== '' ? genre.name : '';
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" style="width : 370px; heigth : 150px" required>`;
    //Teniendo en cuenta el caso, ejecutar la accion
    switch (action) {
      case 'add':
        //Añadir el item
        this.addForm(html);
        break;
      case 'edit':
        //Editar el item
        this.updateForm(html, genre);
        break;
      case 'info':
        //Informacion del item
        const result = await optionsWithDetails(
          'Información',
          `${genre.id} ${genre.name} (${genre.slug})`,
          350,
          '<i class="fas fa-edit"></i> Editar',
          '<i class="fas fa-lock"></i> Bloquear'
        );
        if (result) {
          this.updateForm(html, genre);
        } else if (result === false) {
          this.blockForm(genre);
        }
        break;
      case 'block':
        //Bloquear el item
        this.blockForm(genre);
        break;
      default:
        break;
    }
  }

  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir genero', html, 'name');
    this.addGenre(result);
    return;
  }

  private addGenre(result) {
    if (result.value) {
      this.service.addGenre(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private updateGenre(id: string, result) {
    if (result.value) {
      this.service.updateGenre(id, result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private blockGenre(id: string) {
    this.service.block(id).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async updateForm(html: string, genre: any) {
    const result = await formBasicDialog('Modificar Genero', html, 'name');
    this.updateGenre(genre.id, result);
  }

  private async blockForm(genre: any) {
    const result = await optionsWithDetails(
      'Bloquear',
      `¿Estas seguro que quieres bloquear?`,
      350,
      '<i class="fas fa-thumbs-down"></i> NO',
      '<i class="fas fa-thumbs-up"></i> SI'
    );
    if (result === false) {
      this.blockGenre(genre.id);
    }
  }
}
