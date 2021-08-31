import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'app-word',
  styleUrl: 'word.scss',
  shadow: true
})
export class Word {

  @Prop() weight: number;

  private style = () => ({
    'font-size': `${this.weight * 0.4 + 0.5}rem`
  });

  render() {
    return (
      <Host>
        <span style={this.style()}>
          <slot />
        </span>
        {`(${this.weight})`}
      </Host>
    );
  }
}
