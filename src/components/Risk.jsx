import React, {Component} from 'react';

class Risk extends Component {
  render() {
    const {heartAge, smoker, trtbp, diabetes, sbp, risk} = this.props.patient;

    return (
      <div>
        <h2><span>3</span>Seu risco</h2>
        <p>A idade do seu coração é: {heartAge}</p>
        <div>
          Se você {!smoker ? 'não ' : ''}é um fumante com pressão arterial
          de {sbp}mm/Hg, {!trtbp ? 'não ' : ''}faz tratamento de hipertensão,
          {!diabetes ? ' não ' : ' '}tem diabetes, seu risco em 10 anos é: {risk}%
          </div>
      </div>
    );
  }
}

export default Risk;
