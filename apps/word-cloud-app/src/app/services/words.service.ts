import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Injectable} from "@angular/core";
import {Word} from "../../../../../libs/shared/models/word";
import {Observable} from "rxjs";


export interface Observer {
  receiveNotification: (msg: string) => void
}

@Injectable()
export class WordsService {
  private observers: Set<Observer>;
  constructor(   private firestore: AngularFirestore   ) {
    this.observers = new Set();
  }

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
        .then(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          res => this.notify(`Created new word ${res}`), err => reject(err));
    });
  }

  getWords(): Observable<Word[]> {
    return this.firestore.collection<Word>("words").valueChanges();
  }

}
