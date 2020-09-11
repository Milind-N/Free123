import { LitElement, html, css } from 'lit-element';

export class StockExchangeInfo extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: sans-serif;
      }
      
      h1 {
        margin-top: 0px;
        color: #217FF9;
      }

      #header {
        display: flex;
      }

      shares-list {
        margin: 10px;
      }
    `
  }

  render() {
    return html`
      <div id="header">
        <h1>Stock Market Information</h1>
      </div>
    `;
  }
}
