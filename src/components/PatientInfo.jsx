import React from 'react';
import BaseComponent from './BaseComponent';
import connectToStores from 'alt-utils/lib/connectToStores';

class PatientInfo extends BaseComponent {
  componentWillUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const patient = this.props.patient;

    return (
      <div className='column patient-info'>
        <h2>Informações do paciente</h2>
        <div>
          <label>Nome: </label>
          <span className='name'>{`${patient.firstName} ${patient.lastName}`}</span>
        </div>
        <div>
          <label>Gênero: </label>{patient.gender[0].toUpperCase()}&nbsp;&nbsp;&nbsp;
          <label>Idade: </label>{patient.age}&nbsp;&nbsp;&nbsp;
          <label>Data nasc.: </label>{patient.birthday}
        </div>
      </div>
    );
  }
}

export default connectToStores(PatientInfo);
