import { Component, OnInit } from '@angular/core';
import {InlogService} from '../../services/inlog/inlog.service';

@Component({
  selector: 'app-loguit',
  templateUrl: './loguit.component.html',
  styleUrls: ['./loguit.component.css']
})
export class LoguitComponent implements OnInit {

  constructor(private inlogService: InlogService) { }

  loguit(): void {
    this.inlogService.loguit();
  }
  ngOnInit(): void {
  }

}
