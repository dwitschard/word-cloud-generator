import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-header',
  styleUrl: 'stencil-header.scss',
  shadow: true
})
export class StencilHeader {
  /**
   * The header name
   */
  @Prop() header: string;

  private getText(): string {
    return `${this.header}`;
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
