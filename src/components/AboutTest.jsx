import React, {Component} from 'react';

export default class AboutTest extends Component {
  componentWillUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <h2>
          <span>1</span>Sobre esse teste
        </h2>
        <p>Este relatório avalia o seu potencial risco de doença cardíaca, ataque cardíaco e acidente vascular cerebral.</p>
      </div>
    );
  }
}
