import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataShareService {
  listTitle = "";
  listArray = [];
  cardTitle = "";
  cardDesc = "";
  isCardAdded = new BehaviorSubject<boolean>(false);
  isListAdded = new Subject<boolean>();
  constructor() {}

  setListTitle(title) {
    const newListObj = {};
    newListObj["title"] = title;
    this.listArray.push(newListObj);
  }
  setListArray(listArray) {
    this.listArray = listArray;
    sessionStorage.setItem("listArray", JSON.stringify(this.listArray));
  }
  setCardTitle(title) {
    this.cardTitle = title;
  }
  setCardDesc(desc) {
    this.cardDesc = desc;
  }
  setIsCardAdded(bool) {
    this.isCardAdded.next(bool);
  }
  getIsCardAdded(): Observable<any> {
    return this.isCardAdded.asObservable();
  }
  setIsListAdded(bool) {
    this.isListAdded.next(bool);
  }
  getIsListAdded(): Observable<any> {
    return this.isListAdded.asObservable();
  }
}
