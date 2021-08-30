import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'word-cloud-generator-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements OnInit {

  words: string[] = [
    "windy","invite","doubtful","jagged","rare","shocking","wrong","volleyball","permissible","proud","earn","complete","expansion","route","guarantee","unruly","fortunate","questionable","treatment","prevent","belligerent","meat","graceful","narrow","lighten","wistful","page","look","secret","utter","tendency","add","cherry","exuberant","psychotic","moor","answer","relation","organic","unlock","bloody","cycle","fear","song","murder","remember","quizzical","special","cabbage"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
