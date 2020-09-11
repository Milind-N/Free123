import { html, fixture, expect } from '@open-wc/testing';

import '../src/shares-list.js';

describe('StockExchangeInfo', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <shares-list></shares-list>
    `);
  });

  it('renders a div', () => {
    const ul = element.shadowRoot.querySelector('ul');
    expect(ul).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});