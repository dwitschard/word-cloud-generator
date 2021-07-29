import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-title',
  styleUrl: 'stencil-title.scss',
  shadow: true
})
export class StencilTitle {
  /**
   * The title name
   */
  @Prop() title: string;

  private getText(): string {
    return `${this.title}`;
  }

  render() {
    return (
      <div class='wrapper'>
        <span>{this.getText()}</span>
        <span class='small-text'>© Stencil</span>
      </div>
    );
  }
}
