import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Word} from "./word";
import {FormControl, FormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";


export interface Observer {
  receiveNotification: (msg: string) => void
}

@Injectable()
export class WordsService {
  private observers: Set<Observer>;
  constructor(   private firestore: AngularFirestore   ) {
    this.observers = new Set();
  }

  form = new FormGroup({
      text: new FormControl('')
      // weight: new FormControl(0),
  })

  subscribe (observer: Observer) {
    this.observers.add(observer)
  }

  unsubscribe (observerToRemove: Observer){
    this.observers.delete(observerToRemove)
  }

  notify(msg: string) {
    this.observers.forEach( observer => {
      observer.receiveNotification(msg)
    })
  }


  createWord(word: Word) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection("words")
        .add(word)
        .then(res => this.notify(`Created new word ${res}`), err => reject(err));
    });
  }

  getWords() {
    return
    this.firestore.collection("words").snapshotChanges();
  }

}
