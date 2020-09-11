import { LitElement, html } from 'lit-element';
import { constants } from '../constants';
import { style } from '../style/indices-list-styles'
import { priceFormat } from './helper'

export class IndicesList extends LitElement {
  static get properties() {
    return {
      response: { type: Array },
      errorMsg: { type: String }
    }
  }

  constructor() {
    super()
    this.response = []
    this.errorMsg = ''
  }

  firstUpdated() {
    fetch(constants.INDICES_LIST_API)
      .then((indicesList) => indicesList.json())
      .then((indicesList) => {
        this.response = indicesList
      })
      .catch((error) => {
        this.errorMsg = error;
      });
  }

  render() {
    const { response } = this;
    return html` ${this.errorMsg === '' 
      ? html`<index-card .indices=${this.response}></index-card>`
      : html`<div>${constants.ERROR_MSG}</div>` }
      `
  }
}

class IndexCard extends LitElement {
  static get properties() {
    return {
      indices: { type: Array }
    };
  }

  static get styles() {
    return [style];
  }

  render() {
    return html`
      ${this.indices.map(index => {
        const priceDetails = index.indexInstrument.priceDetails;
        const priceDiff = ((priceDetails.openPrice.value/priceDetails.closePrice.value) * 100) - 100;
            
        return html`<paper-card>
            <h2><a href="#" @click=${() => this._getStockIndexData(index.name)}>${index.name}</a></h2>
            <div class="float-left">${constants.STOCK_CURRENT_PRICE}:</div> 
            <div class="float-right">${priceFormat(index.indexInstrument.currentPrice.value)}</div>
            <div class="float-left">${constants.STOCK_OPEN_PRICE}:</div> 
            <div class="float-right"> ${priceFormat(priceDetails.highPrice.value)}</div>
            <div class="float-left">${constants.STOCK_CLOSE_PRICE}:</div> 
            <div class="float-right"> ${priceFormat(priceDetails.lowPrice.value)}</div>
            <div class="float-left">${constants.CHANGE_PRICE}:</div> 
            <div class="float-right"> ${priceFormat(priceDiff)}</div>
          </paper-card>`
      })}
    `;
  }
}

customElements.define('index-card', IndexCard);