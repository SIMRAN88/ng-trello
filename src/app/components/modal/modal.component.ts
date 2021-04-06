import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataShareService } from "src/app/services/data-share/data-share.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() modalConfig;
  listTitle = "";
  cardTitle = "";
  cardDesc = "";
  constructor(
    public activeModal: NgbActiveModal,
    private dataShareService: DataShareService
  ) {}

  ngOnInit(): void {}
  checkDisabled() {
    if (this.modalConfig.type === "list") {
      if (this.listTitle === "") {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.cardTitle === "" || this.cardDesc === "") {
        return true;
      } else {
        return false;
      }
    }
  }
  primaryBtnAction() {
    if (this.modalConfig.type === "list") {
      this.dataShareService.setListTitle(this.listTitle);
      this.dataShareService.setIsListAdded(true);
    } else if (this.modalConfig.type === "card") {
      this.dataShareService.setCardTitle(this.cardTitle);
      this.dataShareService.setCardDesc(this.cardDesc);
    }
    if (this.modalConfig.primaryAction) {
      this.modalConfig.primaryAction(this.modalConfig.callerReference);
    }
  }

  secondaryBtnAction() {
    if (this.modalConfig.secondaryAction) {
      this.modalConfig.secondaryAction(this.modalConfig.callerReference);
    }
  }

  tertiaryBtnAction() {
    if (this.modalConfig.tertiaryAction) {
      this.modalConfig.tertiaryAction(this.modalConfig.callerReference);
    }
  }
}
