import {Component, OnInit} from '@angular/core';
import {AdvertentieModel} from '../../models/advertentie.model';
import {AdvertentieService} from '../../services/advertentie/advertentie.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-advertentie',
  templateUrl: './advertentie.component.html',
  styleUrls: ['./advertentie.component.css']
})
export class AdvertentieComponent implements OnInit {
  advertenties: AdvertentieModel[];

  constructor(private advertentieService: AdvertentieService) {
  }

  ngOnInit(): void {
     this.advertentieService.getAdvertenties().subscribe(ad => {
      this.advertenties = ad;
    });
  }

}
