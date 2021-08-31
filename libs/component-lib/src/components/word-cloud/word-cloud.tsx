import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { Word } from '../../../models/Word';

@Component({
  tag: 'word-cloud',
  styleUrl: 'word-cloud.scss',
  shadow: true
})
export class WordCloud {

  @Prop() words: string[];
  @State() weightedWords: Word[] = [];

  componentWillLoad(){
    this.watchWords(this.words)
  }

  @Watch('words')
  watchWords(newValues: string[]) {
    this.weightedWords = []
    this.weighWords(newValues)
  }

  private weighWords = (newValues: string[]) => {
    newValues.forEach(value => {

      const wordExists = this.weightedWords
        .some(resultItem => resultItem.text === value);

      return wordExists
        ? this.increaseWeight(value)
        : this.addToWords(value);
    });

  }

  private addToWords = (newWord: string) => {
    this.weightedWords = [...this.weightedWords, new Word(newWord, 1)];
  }

  private increaseWeight = (newWord: string) => {
    this.weightedWords = this.weightedWords.map(
      weightedWord => weightedWord.text === newWord
        ? { ...weightedWord, weight: weightedWord.weight + 1 }
        : weightedWord
    );
  }

  render() {
    return (
      <Host>
        {this.weightedWords.map(word =>
          <app-word weight={word.weight}>{word.text}</app-word>
        )}
      </Host>
    );
  }

}
