import React from 'react';
import BaseComponent from './BaseComponent';
import connectToStores from 'alt-utils/lib/connectToStores';
import runnerImg from 'img/runner.png'
import smokerImg from 'img/smoker.png'
import doctorImg from 'img/doctor.png'
import needleImg from 'img/needle.png'

class AndNow extends BaseComponent {
  render() {
    let {smoker} = this.props.patient;
    let smokerTipTitle = smoker ? 'Parar de fumar' : 'Continuar sem fumar';
    let smokerTip = smoker ?
      'pode reduzir seu risco de doença cardíaca em 50% ou mais' :
      'é uma das melhores maneiras de reduzir o seu risco de doença cardíaca';

    return (
      <div className='row'>
        <h2><span className='num'>4</span>E agora?</h2>
        <div className='columns'>
          <div className='column tip'>
            <img src={runnerImg} />
            <h4>Dieta e exercícios</h4>
            <p>podem melhorar seus níveis de colesterol</p>
          </div>
          <div className='column tip'>
            <img src={smokerImg} />
            <h4>{smokerTipTitle}</h4>
            <p>{smokerTip}</p>
          </div>
          <div className='column tip'>
            <img src={doctorImg} />
            <h4>Pergunte seu médico</h4>
            <p>sobre estatinas ou outros medicamentos que podem diminuir o colesterol</p>
          </div>
          <div className='column tip'>
            <img src={needleImg} />
            <h4>Considere retestar</h4>
            <p>em 1 ou 2 semanas para excluir um pico temporário nos níveis sanguíneos</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToStores(AndNow);
