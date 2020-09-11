import { css } from 'lit-element'

export const style = css`
  .price-down {
    color: #db4437;
  }

  .price-up {
    color: #0f9d58;
  }

  a {
    text-decoration: none;
    color: #217ff9;
  }

  button { 
    margin: 10px 0; 
    padding: 10px;
    font-size: 15px;
    font-weight: 800;
    background-color: #ffffff; 
    border-radius: 5px;
  }

  button:hover { 
    box-shadow: 0 0 4px rgba(3,3,3,0.8); 
    opacity: 0.9;
  }

  table.table { 
    width: 100%; 
    background-color: #ffffff; 
    border-radius: 5px;
    padding: 12px;
  }

  .table th, .table td { 
    text-align: left;
    border-bottom: 1px solid #DDD;
  }

  .table th:not(:first-child), .table td:not(:first-child) { 
    text-align: right; 
    padding: 0.25em;
  }

  @media screen and (max-width: 800px) {
    tr { 
      display: flex; 
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0.5em 0;
      border: 1px solid rgba(3,3,3,0.2);
    }
    td, th {
      flex: 1 1 150px;
      border: 0.5px solid rgba(3,3,3,0.2);
    }
  }

  * { box-model: border-box; font-family: sans-serif; }
`
