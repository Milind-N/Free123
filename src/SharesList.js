import { LitElement, html } from 'lit-element';
import { constants } from '../constants';
import { style } from '../style/shares-list-styles'
import { getStockList } from './helper'

export class SharesList extends LitElement {
  static get properties() {
    return {
      sharesInfo: { type: Array },
      errorMsg: { type: String },
      showDetails: { type: Boolean },
      instrument: { type: String },
    };
  }

  constructor() {
    super()
    this.sharesInfo = []
    this.errorMsg = ''
    this.showDetails = true
    this.instrument = ''
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

  _getStockInfo(display, instrument) {
    this.showDetails = display
    this.instrument = instrument
  }

  render() {
    const response = getStockList(this.sharesInfo);
    return html` ${this.errorMsg === '' 
      ? html`
        <div>
          ${this.showDetails 
            ? this._showStockList(response)
            : this._showStockDetails(response, this.instrument) }
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
          <td class="align-left">
            <a href='#' @click=${() => this._getStockInfo(false, item.name)}>${item.name}</a>
          </td>
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

  _showStockDetails(response, instrument) {
    const stockFound = response.find(index => index.name === instrument)

    return html`
      <div>
        <h1>${stockFound.name}</h1>
        <button @click=${() => this._getStockInfo(true, instrument)}>Stock List</button>
        <table class="table">
          <tr>
            <th>${constants.STOCK_SYMBOL}</th>
            <th>${constants.STOCK_CURRENT_PRICE}</th>
            <th>${constants.STOCK_OPEN_PRICE}</th>
            <th>${constants.STOCK_CLOSE_PRICE}</th>
            <th>${constants.STOCK_LOW_PRICE}</th>
            <th>${constants.STOCK_HIGH_PRICE}</th>
          </tr>
          <tr>
            <td>${stockFound.symbol}</td>
            <td>${stockFound.currentPrice}</td>
            <td>${stockFound.openPrice}</td>
            <td>${stockFound.closePrice}</td>
            <td>${stockFound.lowPrice}</td>
            <td>${stockFound.highPrice}</td>
          </tr>
          </table>
      </div>
    `;
  }
}
