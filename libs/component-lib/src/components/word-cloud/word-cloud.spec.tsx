import { newSpecPage } from '@stencil/core/testing';
import { WordCloud } from './word-cloud';

describe('word-cloud', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [WordCloud],
      html: '<word-cloud></word-cloud>',
    });
    expect(root).toEqualHtml(`
      <word-cloud>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </word-cloud>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [WordCloud],
      html: `<word-cloud first="Stencil" last="'Don't call me a framework' JS"></word-cloud>`,
    });
    expect(root).toEqualHtml(`
      <word-cloud first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </word-cloud>
    `);
  });
});
