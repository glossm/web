
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func
};

const defaultProps = {
  onClick: null
};

const characters = [
  [['m'], ['n'], [], [], ['ŋ'], [], []],
  [['p', 'b'], ['t', 'd'], [], [], ['k', 'ɡ'], ['q'], []],
  [[], ['s', 'z'], ['ʂ', 'ʐ'], ['ɕ'], [], [], []],
  [['f', 'v'], ['θ', 'ð'], [], [], [], ['χ', 'ʁ'], ['h']],
  [[], ['r'], [], [], [], [], []],
  [[], ['l'], [], ['j'], ['w'], [], []],
  [[], [], [], [], [], [], []],
];

const colHeaders = [
  'Labial', 'Alveolar', 'Retroflex', 
  'Palatal', 'Velar', 'Uvular', 'Glottal'
];

const rowHeaders = [
  'Nasal', 'Plosive', 'Sibilant\nFricative', 
  'Non-sibilant\nFricative', 'Trill', 'Approximant'
];

class PhoneticTable extends Component {
  constructor(props) {
    super(props);
    this.createTable = this.createTable.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
  }

  onClick(ch) {
    this.props.onClick(ch);
  }

  createTable() {
    let table = [];
    let thead = [<th></th>];
    let tbody = [];
    for (let i = 0; i < colHeaders.length; i++) {
      thead.push(<th>{colHeaders[i]}</th>);
    }
    table.push(<thead>{thead}</thead>);
    for (let j = 0; j < rowHeaders.length; j++) {
      let row = [];
      row.push(<th>{rowHeaders[j].split('\n').map( line => {
          return (<span>{line}<br/></span>);
      })}</th>);
      for (let i = 0; i < colHeaders.length; i++) {
        let td = [];
        for (let k = 0; k < characters[j][i].length; k++) {
          td.push(<button onClick={() => {this.onClick(characters[j][i][k])}}>{characters[j][i][k]}</button>);
        }
        row.push(<td>{td}</td>);
      }
      tbody.push(<tr>{row}</tr>);
    }
    table.push(<tbody>{tbody}</tbody>);
    return table;
  }

  render() {
    return (
      <table className="phoneme-table">
        {this.createTable()}
      </table>
    );
  }
}

PhoneticTable.propTypes = propTypes;
PhoneticTable.defaultProps = defaultProps;

export default PhoneticTable;
