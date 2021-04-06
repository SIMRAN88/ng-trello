import { Component, Input, OnInit } from '@angular/core';
import { DataShareService } from '../../services/data-share/data-share.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
@Input() listTitle;
cardAddedObs$;
listArray;
cardStore;
  constructor(private dataShareService:DataShareService) { }

  ngOnInit(): void {
   this.getCardAdded();
  }
  getCardAdded(){
    this.cardAddedObs$ = this.dataShareService.getIsCardAdded().subscribe(res=>{
      if(res){
        this.listArray = this.dataShareService.listArray;
        this.getCardStore();
      }
    }) 
   }
   getCardStore(){
    for (const i in this.listArray) {
      if (this.listArray[i].title === this.listTitle) {
        this.cardStore = this.listArray[i].card;
      }
    }
   }
   dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
}
