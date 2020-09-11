import { LitElement, html } from 'lit-element';
import { constants } from '../constants';

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
      ? html`
          <ul>
            ${response.map(item => html`
              <li>${item.name}</li>
            `)}
          </ul>
        `
      : html`<div>An error occurred while fetching the data</div>` }
      `
  }
}
