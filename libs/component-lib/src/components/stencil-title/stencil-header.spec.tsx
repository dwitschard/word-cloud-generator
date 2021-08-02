import { newSpecPage } from '@stencil/core/testing';
import { StencilHeader } from './stencil-header.component';

describe('stencil-header', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [StencilHeader],
      html: '<stencil-header></stencil-header>',
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
      components: [StencilHeader],
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
