import React, {Component} from 'react';

class PatientInfo extends Component {
  componentWillUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    const patient = this.props.patient;

    return (
      <div>
        <h2>Informações do paciente</h2>
        <div><label>Nome: </label>{`${patient.firstName} ${patient.lastName}`}</div>
        <div><label>Gênero: </label>{patient.gender[0].toUpperCase()}</div>
        <div><label>Idade: </label>{patient.age}</div>
        <div><label>Data nasc.: </label>{patient.birthday}</div>
      </div>
    );
  }
}

export default PatientInfo;
