import { Component } from '@angular/core';
import {WordService} from "@word-cloud-generator/shared/word-service";
import {WordFormService} from "../word-form.service";


@Component({
  selector: 'adm-app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.scss']
})


export class WordFormComponent {


  constructor(public wordsService: WordService, public wordFormService: WordFormService){}

  onSubmit() {
    const newWord = this.wordFormService.form.value;

    this.wordsService.createWord(newWord)
      .then(res => {
        console.log(res)
      });
    this.wordFormService.form.reset()
  }

}
