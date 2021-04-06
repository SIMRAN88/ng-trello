import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataShareService } from 'src/app/services/data-share/data-share.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
listArray;
getListAdded$;
  constructor(private ngbModalService:NgbModal,private dataShareService:DataShareService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList(){
  this.getListAdded$=this.dataShareService.getIsListAdded().subscribe(res=>{
    if(res){
      this.listArray = this.dataShareService.listArray;
    }
  })
}
  addList(){
   const data = {
    type: 'list',
    titleText: 'Add List',
    primaryButtonName: 'OK',
    secondaryButtonName: 'CANCEL',
    callerReference: this,
    cancelAction:null,
    primaryAction:this.appendList

  };
  const modelRef = this.ngbModalService.open(ModalComponent, {
    centered: true
  });
  modelRef.componentInstance.modalConfig = data;   }

  appendList(that){
    that.listArray = that.dataShareService.listArray;
    console.log(that.listArray);
  }
  }

