import { newE2EPage } from '@stencil/core/testing';
import {describe, expect, it} from '@jest/globals';

describe('stencil-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<stencil-header></stencil-header>');
    const element = await page.find('stencil-title');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<stencil-header></stencil-header>');
    const component = await page.find('stencil-title');
    const element = await page.find('stencil-header >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
