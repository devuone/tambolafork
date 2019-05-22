import { Component,ChangeDetectionStrategy,ChangeDetectorRef,OnInit } from '@angular/core';
import { Prize } from './prize/prize';
import { GameService } from '../game.service';
import {Subject,timer,noop} from 'rxjs'
import {delay} from 'rxjs/operators'
import { PrizeComponent } from './prize/prize.component';

@Component({
  selector: 'prize-board',
  templateUrl: './prize-board.component.html',
  styleUrls: ['./prize-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrizeBoardComponent implements OnInit{

  prizes: Array<Prize>;
  showPrize = false;
  hidePrizeBanner = new Subject();
  prize:string;

  get columns(){
    return Math.floor(this.prizes.length/3);
  }

  constructor(private gameService: GameService,private cdr:ChangeDetectorRef) {       
    this.hidePrizeBanner.pipe(delay(5000)).subscribe(()=>{
      this.showPrize = false;
      cdr.detectChanges();
    })
  }

  ngOnInit(){
    this.gameService.prizeState.subscribe((prizes) => {
      this.prizes = prizes;
      
      this.cdr.detectChanges();
    });
  }

  showPrizeBanner(prize){
    if(prize.isClaimed){
    this.prize = prize.label
    this.showPrize = true;
    this.hidePrizeBanner.next();
    }
    
    this.gameService.applyPrizeState(prize);
  }

  getPrize(value){
    return this.prizes?this.prizes[value]: new Prize("");
  }

  check(){
    // to demo change changeDetection
    // console.log("prize-area");
  }

}