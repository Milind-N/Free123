import { html, fixture, expect } from '@open-wc/testing';

import '../src/stock-exchange-info.js';

describe('StockExchangeInfo', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <stock-exchange-info></stock-exchange-info>
    `);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Stock Market Information');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
