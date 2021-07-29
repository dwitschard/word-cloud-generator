import { newSpecPage } from '@stencil/core/testing';
import { StencilTitle } from './stencil-title';

describe('stencil-title', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [StencilTitle],
      html: '<stencil-title></stencil-title>',
    });
    expect(root).toEqualHtml(`
      <stencil-title>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </stencil-title>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [StencilTitle],
      html: `<stencil-title first="Stencil" last="'Don't call me a framework' JS"></stencil-title>`,
    });
    expect(root).toEqualHtml(`
      <stencil-title first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </stencil-title>
    `);
  });
});
