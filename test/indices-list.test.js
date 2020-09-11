import { html, fixture, expect, waitUntil } from '@open-wc/testing';

import '../src/indices-list.js';

describe('StockExchangeInfo', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <indices-list></indices-list>
    `);
  });



  xit('renders a div', () => {
    const div = element.shadowRoot.querySelector('div');
    expect(div).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});