import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {combineLatest, forkJoin, of} from "rxjs";
import {map, startWith, tap, withLatestFrom} from "rxjs/operators";
import {Language, stemm} from "../../helper/stemmer";
import {WordService} from "@word-cloud-generator/shared/word-service";

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

  constructor(private wordsService: WordService) {
  }

  ngOnInit(): void {
    const selectedLanguage = this.languageSelect.valueChanges.pipe(startWith(this.language.EN));
    const isStemmingActive = this.stemmingActive.valueChanges.pipe(startWith(this.DEFAULT_STEMMING_ACTIVE));

    this.stemmingActive.patchValue(this.DEFAULT_STEMMING_ACTIVE)
    this.languageSelect.patchValue(this.language.EN);


    this.words =
      combineLatest([this.wordsService.getWords(), isStemmingActive, selectedLanguage]).pipe(
        map(([storedWords, checked, language]) => {
          if (!checked) {
            return storedWords.map(word => word.text);
          } else {
            return storedWords.filter(word => word.text).map(word => stemm(language, word.text));
        }
      }),
      tap(console.log)
    );
  }
}
