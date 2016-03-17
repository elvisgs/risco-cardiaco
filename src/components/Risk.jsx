import React, {Component} from 'react';

class Risk extends Component {
  render() {
    const {heartAge, smoker, trtbp, diabetes, sbp, risk} = this.props.patient;

    return (
      <div className='row'>
        <h2><span className='num'>3</span>Seu risco</h2>
        <div className='columns'>
          <div className='column heart-age'>
            <p>A idade do seu coração é:<br/><em>{heartAge}</em></p>
          </div>
          <div className='column is-half'>
            <p>Se você {!smoker ? 'não ' : ''}é um fumante com pressão arterial
            de {sbp}mm/Hg, {!trtbp ? 'não ' : ''}faz tratamento de hipertensão,
            {!diabetes ? ' não ' : ' '}tem diabetes, seu risco em 10 anos é:</p>
          </div>
          <div className='column risk-percentage'>{`${risk}%`}</div>
        </div>
      </div>
    );
  }
}

export default Risk;
