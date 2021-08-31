import { Component } from '@angular/core';

@Component({
  selector: 'word-cloud-generator-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent {

  words: string[] = [
    "windy","windy", "windy","windy","proud","earn","earn","earn","earn","earn","complete","expansion","route","guarantee","unruly","secret","secret","secret","secret","secret","secret","secret","secret","secret","utter","tendency","tendency","tendency","tendency","tendency","tendency","add","cherry","exuberant","psychotic","moor","answer"
  ]

}
