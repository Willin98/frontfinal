import { UsersService } from "@core/services/users.service";
import { Component, OnInit } from "@angular/core";
import { ACTIVE_FILTERS } from "@core/constants/filters";
import { IResultData } from "@core/interfaces/result-data.interface";
import { COMIDAS_LIST_QUERY } from "@graphql/operations/query/comida";
import { DocumentNode } from "graphql";
import { FilmsService } from "@core/services/films.service";
import { Router } from "@angular/router";
import { CartService } from "@film/core/services/cart.service.ts.service";
import { closeAlert, loadData } from "@shared/alerts/alerts";
import { ComidasService } from "@core/services/comidas.service";
import { IComidaItem } from "@core/interfaces/film-home.interface";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  query: DocumentNode = COMIDAS_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  items;
  constructor(
    private usersApi: UsersService,
    private films: FilmsService,
    private router: Router,
    private cartService: CartService,
    private comidaService: ComidasService
  ) {}

  ngOnInit(): void {
    loadData("Cargando informacion", "");
    this.comidaService.getComidas(1, 10).subscribe((result) => {
      console.log(result);
      this.items = result;
    });
    this.usersApi.getUsers(2, 1).subscribe((result) => {
      console.log(result);
      url: "/film/comida/".concat(result.id);
    });
    closeAlert();
  }

  showDetails(item: IComidaItem) {
    console.log("deatlesssss", item.id);
    this.router.navigate(['/films/comida', +item.id]);
  }
}
