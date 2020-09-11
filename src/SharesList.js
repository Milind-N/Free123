import { LitElement, html } from 'lit-element';
import { constants } from '../constants';
import { style } from '../style/shares-list-styles'
import { getStockList } from './helper'

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

  static get styles() {
    return [style]
  }

  firstUpdated() {
    this._getStockApiData()
  }

  _getStockApiData() {
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
    const response = getStockList(this.sharesInfo);
    return html` ${this.errorMsg === '' 
      ? html`
        <div>
          ${this._showStockList(response)}
        </div>
        `
      : html`<div>${constants.ERROR_MSG}</div>` }
      `;
  }

  _showStockList(response) {
    return html`
      ${this._getPollButton()}
      <table class="table">
        <tr>
          <th>${constants.STOCK_NAME}</th>
          <th>${constants.STOCK_HIGH_PRICE}</th>
          <th>${constants.STOCK_LOW_PRICE}</th>
          <th>${constants.STOCK_LAST_PRICE}</th>
          <th>${constants.CHANGE_PRICE}</th>
        </tr>
        ${response.map(item => html`
        <tr>
          <td class="align-left">${item.name}</td>
          <td>${item.highPrice}</td>
          <td>${item.lowPrice}</td>
          <td class="${item.className}">${item.currentPrice}</td>
          <td class="${item.className}">${item.change}</td>
        </tr>
        `)}
      </table>
      ${this._getPollButton()}
    `
  }

  _getPollButton() {
    return html`
      <div>
        <button @click=${() => this._getStockApiData()}>Refresh Data</button>
      </div>
    `;
  }
}
