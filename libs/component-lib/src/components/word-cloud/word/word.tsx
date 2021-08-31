import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-word',
  styleUrl: 'word.scss',
  shadow: true,
})
export class Word {

  @Prop() weight: number;

  private colors = [
    '#545F66',
    '#D0F4EA',
    '#B1CC74',
    '#9A4C95',
    '#F08CAE',
    '#4D2D52',
    '#83BCFF',
    '#FF7D00',
    '#78290F',
    '#2BA84A',
    '#2D3A3A',
    '#CDE77F'
  ];

  private style = () => {
    const random_color = this.colors[Math.floor(Math.random() * this.colors.length)];
    return {
      'font-size': `${this.weight * 0.4 + 0.5}rem`,
      'color': random_color
    };
  };

  render() {
    return (
      <div class='wrapper'>
        <span style={this.style()} class='word'>
          <slot />
        </span>
        <span class='weight-badge'>
          {`${this.weight}`}
        </span>
      </div>
    );
  }
}
