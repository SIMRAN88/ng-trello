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
  deleteCard(card, listTitle){
    for (const i in this.listArray) {
      if (this.listArray[i].title === listTitle) {
         for(const t in this.listArray[i].card){
          if(this.listArray[i].card[t].title === card.title){
            this.listArray[i].card.splice(t,1);
          }
         }
      }
    }
    this.dataShareService.setListArray(this.listArray);
    this.dataShareService.setIsListAdded(true);
    this.dataShareService.setIsCardAdded(true);
  }
}
