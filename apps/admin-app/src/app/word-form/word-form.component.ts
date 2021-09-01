import { Component } from '@angular/core';

import {WordsService} from "../words.service";


@Component({
  selector: 'adm-app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})


export class WordFormComponent {


  constructor(public wordsService: WordsService){}

  onSubmit() {
    const newWord = this.wordsService.form.value;

    this.wordsService.createWord(newWord)
      .then(res => {
        console.log(res)
      });
    this.wordsService.form.reset()
  }

}
