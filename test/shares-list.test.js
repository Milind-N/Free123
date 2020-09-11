import { html, fixture, expect } from '@open-wc/testing';

import '../src/shares-list.js';

describe('StockExchangeInfo', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <shares-list></shares-list>
    `);
  });

  it('renders a button', () => {
    const button = element.shadowRoot.querySelector('button');
    expect(button).to.exist;
  });

  it('renders a table', () => {
    const table = element.shadowRoot.querySelector('table');
    expect(table).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});