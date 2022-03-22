import { ComidasService } from './comidas.service';
import { Component, OnInit } from "@angular/core";
import { IResultData } from "@core/interfaces/result-data.interface";
import { ITableColumns } from "@core/interfaces/table-columns.interface";
import { COMIDAS_LIST_QUERY } from "@graphql/operations/query/comida";
import { DocumentNode } from "graphql";
import { TitleService } from "@admin/core/services/title.service";
import { LABEL } from "@admin/core/constants/title.constants";
import { formBasicDialog, optionsWithDetails } from "@shared/alerts/alerts";
import { basicAlert } from "@shared/alerts/toasts";
import { TYPE_ALERT } from "@shared/alerts/values.config";

@Component({
  selector: "app-comidas",
  templateUrl: "./comidas.component.html",
  styleUrls: ["./comidas.component.scss"],
})
export class ComidasComponent implements OnInit {
  query: DocumentNode = COMIDAS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;

  constructor(
    private service: ComidasService,
    private titleService: TitleService
  ) {}
  ngOnInit(): void {
    this.titleService.updateTitle(LABEL.COMIDAS);
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: "comidas",
      definitionKey: "comidas",
    };
    this.include = false;
    this.columns = [
      {
        property: "id",
        label: "#",
      },
      {
        property: "name",
        label: "Nombre de la comida",
      },
      {
        property: "stock",
        label: "Stock",
      },
      {
        property: "price",
        label: "Precio",
      },
      {
        property: "img",
        label: "Imagen",
      },
    ];
  }

  async takeAction($event) {
    //Coger la informacion para las acciones
    const action = $event[0];
    const comida = $event[1];
    //Cogemos el valor por defecto
    const defaultValue =
      comida.name !== undefined && comida.name !== "" ? comida.name : "";
    const html = `<input id="name" value="${defaultValue}" class="swal2-input" style="width : 370px; heigth : 150px" required>`;
    //Teniendo en cuenta el caso, ejecutar la accion
    switch (action) {
      case "add":
        //Añadir el item
        this.addForm(html);
        break;
      case "edit":
        //Editar el item
        this.updateForm(html, comida);
        break;
      case "info":
        //Informacion del item
        const result = await optionsWithDetails(
          "Información",
          `${comida.id} ${comida.name}`,
          350,
          '<i class="fas fa-edit"></i> Editar',
          '<i class="fas fa-lock"></i> Bloquear'
        );
        if (result) {
          this.updateForm(html, comida);
        } else if (result === false) {
          this.blockForm(comida);
        }
        break;
      case "block":
        //Bloquear el item
        this.blockForm(comida);
        break;
      default:
        break;
    }
  }

  private async addForm(html: string) {
    const result = await formBasicDialog('Añadir Comida', html, 'name');
    this.addComida(result);
    return;
  }

  private addComida(result) {
    if (result.value) {
      this.service.addComida(result.value).subscribe((res: any) => {
        console.log(res);
        if (res.status) {
          basicAlert(TYPE_ALERT.SUCCESS, res.message);
          return;
        }
        basicAlert(TYPE_ALERT.WARNING, res.message);
      });
    }
  }

  private updateComida(id: string, result) {
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

  private blockComida(id: string) {
    console.log('pruebas');
  }

  private async updateForm(html: string, Comida: any) {
    const result = await formBasicDialog('Modificar Combo', html, 'name');
    this.updateComida(Comida.id, result);
  }

  private async blockForm(Comida: any) {
    const result = await optionsWithDetails(
      'Bloquear',
      `¿Estas seguro que quieres bloquear?`,
      350,
      '<i class="fas fa-thumbs-down"></i> NO',
      '<i class="fas fa-thumbs-up"></i> SI'
    );
    if (result === false) {
      this.blockComida(Comida.id);
    }
  }
}
