import { newSpecPage } from '@stencil/core/testing';
import { Word } from './word';

describe('app-word-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Word],
      html: `<app-word-input></app-word-input>`,
    });
    expect(page.root).toEqualHtml(`
      <app-word-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-word-input>
    `);
  });
});
