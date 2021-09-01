import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {combineLatest, forkJoin, of} from "rxjs";
import {map, startWith, tap, withLatestFrom} from "rxjs/operators";
import {Language, stemm} from "../../helper/stemmer";

@Component({
  selector: 'word-cloud-generator-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit{

  DEFAULT_STEMMING_ACTIVE = false;

  language = Language;

  stemmingActive = new FormControl();
  languageSelect = new FormControl();

  origWords: string[] = [
    "windy","windy", "windy","windy","proud","earn","earn","earn","earn","earn","complete","expansion","route","guarantee","unruly","secret","secret","secret","secret","secret","secret","secret","secret","secret","utter","tendency","tendency","tendency","tendency","tendency","tendency","add","cherry","exuberant","psychotic","moor","answer"
  ]

  words = of();

  constructor() {
  }

  ngOnInit(): void {
    const selectedLanguage = this.languageSelect.valueChanges.pipe(startWith(this.language.EN));
    const isStemmingActive = this.stemmingActive.valueChanges.pipe(startWith(this.DEFAULT_STEMMING_ACTIVE));

    this.stemmingActive.patchValue(this.DEFAULT_STEMMING_ACTIVE)
    this.languageSelect.patchValue(this.language.EN);


    this.words =
      combineLatest([isStemmingActive, selectedLanguage]).pipe(
        map(([checked, language]) => {
          if (!checked) {
            return this.origWords;
          } else {
            return this.origWords.map(word => stemm(language, word));
        }
      }),
      tap(console.log)
    );
  }
}
