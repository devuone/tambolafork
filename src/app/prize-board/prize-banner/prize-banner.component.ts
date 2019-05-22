import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-prize-banner',
  templateUrl: './prize-banner.component.html',
  styleUrls: ['./prize-banner.component.css']
})
export class PrizeBannerComponent implements OnInit {
@Input() prize:String;
  constructor() { }

  ngOnInit() {
  }

}