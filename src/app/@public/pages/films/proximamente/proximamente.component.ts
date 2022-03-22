import { ProximamentesService } from '@core/services/proximamentes.service';
import { IProximamenteItem } from '@core/interfaces/film-home.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { closeAlert, loadData } from '@shared/alerts/alerts';

@Component({
  selector: 'app-proximamente',
  templateUrl: './proximamente.component.html',
  styleUrls: ['./proximamente.component.scss']
})
export class ProximamenteComponent implements OnInit {
  loading: boolean;
  proximamente: IProximamenteItem;
  selectImage: string;
  relationalFilms: Array<Object> = [];
  selectVideo: string;
  constructor(
    private proximamenteService: ProximamentesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      loadData("Cargando Datos", "");
      this.loading = true;
      this.loadDataValue(+params.id);
    });
  }

  loadDataValue(id: number) {
    this.proximamenteService.getItem(String(id)).subscribe((result) => {
      this.proximamente = result.films;
      console.log('ya cargando', this.proximamente);
      //const saveFilmInCart = this.findComida(+this.comida.id);
      this.selectImage = this.proximamente.poster;
      this.selectVideo = this.proximamente.clip;
      this.loading = false;
      closeAlert();
    })
  }

}
