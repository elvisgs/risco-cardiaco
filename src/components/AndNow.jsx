import React, {Component} from 'react';

class AndNow extends Component {
  render() {
    let {smoker} = this.props.patient;
    let smokerTipTitle = smoker ? 'Parar de fumar' : 'Continuar sem fumar';
    let smokerTip = smoker ?
      'pode reduzir seu risco de doença cardíaca em 50% ou mais' :
      'é uma das melhores maneiras de reduzir o seu risco de doença cardíaca';

    return (
      <div>
        <h2><span>4</span>E agora?</h2>
        <div>
          <img src='' />
          <h4>Dieta e exercícios</h4>
          <p>podem melhorar seusníveis de colesterol</p>
        </div>
        <div>
          <img src='' />
          <h4>{smokerTipTitle}</h4>
          <p>{smokerTip}</p>
        </div>
        <div>
          <img src='' />
          <h4>Pergunte seu médico</h4>
          <p>sobre estatinas ou outros medicamentos que podem diminuir o colesterol</p>
        </div>
        <div>
          <img src='' />
          <h4>Considere retestar</h4>
          <p>em 1 ou 2 semanas para excluir um pico temporário nos níveis sanguíneos</p>
        </div>
      </div>
    );
  }
}

export default AndNow;
