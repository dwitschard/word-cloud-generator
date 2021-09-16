import { Injectable } from '@angular/core';
import {Word} from "./models/word";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable()
export class WordService {

  constructor(private firestore: AngularFirestore) { }

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

  getWords() {
    return this.firestore.collection<Word>("words").valueChanges();
  }
}
