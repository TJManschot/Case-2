import {Component, OnInit} from '@angular/core';
import {AdvertentieModel} from "../../models/advertentie.model";
import {AdvertentieService} from "../../services/advertentie.service";

@Component({
  selector: 'app-advertentie',
  templateUrl: './advertentie.component.html',
  styleUrls: ['./advertentie.component.css']
})
export class AdvertentieComponent implements OnInit {
  advertenties: AdvertentieModel[] | undefined;

  constructor(private advertentieService: AdvertentieService) {
  }

  ngOnInit(): void {
    this.advertenties = this.advertentieService.getAdvertenties();
  }

}
