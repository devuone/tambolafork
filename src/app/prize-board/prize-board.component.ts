import { Component,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Prize } from './prize/prize';
import { GameService } from '../game.service';
import {Subject,timer} from 'rxjs'
import {delay} from 'rxjs/operators'

@Component({
  selector: 'prize-board',
  templateUrl: './prize-board.component.html',
  styleUrls: ['./prize-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrizeBoardComponent {

  prizes: Array<Prize>;
  showPrize = false;
  hidePrizeBanner = new Subject();
  prize:String;

  get columns(){
    return Math.floor(this.prizes.length/3);
  }

  constructor(private gameService: GameService,cdr:ChangeDetectorRef) {
    this.gameService.prizeState.subscribe((prizes) => {
      this.prizes = prizes
    });
    
    this.hidePrizeBanner.pipe(delay(5000)).subscribe(()=>{
      this.showPrize = false;
cdr.detectChanges();
    })
  }

  showPrizeBanner(prize){
    if(prize.isClaimed){
    this.prize = prize.label
    this.showPrize = true;
    this.hidePrizeBanner.next();
    }
  }

  check(){
    // to demo change changeDetection
    // console.log("prize-area");
  }

}