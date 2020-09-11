import { LitElement, html } from 'lit-element';
import { constants } from '../constants';

export class SharesList extends LitElement {
  static get properties() {
    return {
      sharesInfo: { type: Array },
      errorMsg: { type: String }
    };
  }

  constructor() {
    super()
    this.sharesInfo = []
    this.errorMsg = ''
  }

  firstUpdated() {
    fetch(constants.STOCK_LIST_API)
    .then((shareList) => shareList.json())
    .then((shareList) => {
      this.sharesInfo = shareList.instruments
    })
    .catch((error) => {
      this.errorMsg = error
    });
  }

  render() {
    const response = this.sharesInfo;
    return html` ${this.errorMsg === '' 
      ? html`
          <ul>
            ${response.map(item => html`
              <li>${item.name}</li>
            `)}
          </ul>
        `
      : html`<div>${constants.ERROR_MSG}</div>` }
      `;
  }
}