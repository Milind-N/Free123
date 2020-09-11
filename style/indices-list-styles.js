import { css } from 'lit-element'

export const style = css`
  :host {
    display: flex;
    flex-direction: row;
    font-family: sans-serif;
  }

  .float-right  {
    float: right;
  }
  .float-left {
    float: left;
  }

  a {
    text-decoration: none;
    color: #217ff9;
  }

  paper-card { 
    border-radius: 5px;
    flex: 1; 
    padding: 12px;
    margin: 0 10px 0 0;
    background-color: #ffffff;
  }

  h2 {
    font-size: 20px;
    color: #2c3e50;
  }
`
