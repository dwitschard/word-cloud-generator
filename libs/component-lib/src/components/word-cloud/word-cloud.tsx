import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'word-cloud',
  styleUrl: 'word-cloud.scss',
  shadow: true,
})
export class WordCloud {

  @Prop() words: string[];

  private getText(): string {
    return `${this.words.join(', ')}`;
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
