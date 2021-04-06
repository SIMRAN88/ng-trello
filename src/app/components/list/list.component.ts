import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataShareService } from "../../services/data-share/data-share.service";
import { ModalComponent } from "../modal/modal.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  @Input() list;
  listTitle = "";
  cardTitle="";
  cardDesc="";
  listArray;
  getListAdded$;
  cardAddedObs$;
  cardStore;
  constructor(
    private dataShareService: DataShareService,
    private ngbModalService: NgbModal
  ) {}

  ngOnInit(): void {
  }
  addCard(listTitle) {
    this.listTitle = listTitle;
    const data = {
      type: "card",
      titleText: "Add Card",
      primaryButtonName: "OK",
      secondaryButtonName: "CANCEL",
      callerReference: this,
      cancelAction: null,
      primaryAction: this.appendCard,
    };
    const modelRef = this.ngbModalService.open(ModalComponent, {
      centered: true,
    });
    modelRef.componentInstance.modalConfig = data;
  }

  appendCard(that) {
    that.listArray = that.dataShareService.listArray;
    that.cardTitle = that.dataShareService.cardTitle;
    that.cardDesc = that.dataShareService.cardDesc;
    const cardObj={}
    cardObj['title']=that.cardTitle;
    cardObj['desc']=that.cardDesc;
    const cardStore=[];
    cardStore.push(cardObj);
    for (const i in that.listArray) {
      if (that.listArray[i].title === that.listTitle) {
        if(that.listArray[i].card){
          that.listArray[i].card.push(cardObj)
        }else{
          that.listArray[i].card = cardStore;
        }
      }
    }
    that.dataShareService.listArray = that.listArray;
    that.dataShareService.setIsCardAdded(true);
  }
  deleteListItem(title){
    this.listArray = this.dataShareService.listArray;
    for (const i in this.listArray) {
      if (this.listArray[i].title === title) {
        this.listArray.splice(i,1);
      }
    }
    this.dataShareService.listArray = this.listArray;
    this.dataShareService.setIsListAdded(true);
  }
  allowDrop($event) {
    $event.preventDefault();
  }
  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
    let target = $event.target;
    const targetClassName = target.className;
    while (target.className !== "list") {
      target = target.parentNode;
    }
    target = target.querySelector(".cards");
    if (targetClassName === "card") {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === "list__title") {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }
}
