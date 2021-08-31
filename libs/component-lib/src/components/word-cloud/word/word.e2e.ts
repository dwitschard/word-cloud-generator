import { newE2EPage } from '@stencil/core/testing';

describe('app-word-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-word-input></app-word-input>');

    const element = await page.find('app-word-input');
    expect(element).toHaveClass('hydrated');
  });
});
