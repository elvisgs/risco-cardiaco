import React, {Component} from 'react';
import PatientActions from '../actions/PatientActions';

class AditionalParameters extends Component {
  onHypertensionTreatmentChange(event) {
    PatientActions.setHypertensionTreatment(event.target.checked);
  }

  onSmokerChange(event) {
    PatientActions.setSmoker(event.target.checked);
  }

  onDiabetesChange(event) {
    PatientActions.setDiabetes(event.target.checked);
  }

  onSistolicBloodPressureChange(event) {
    PatientActions.setSistolicBloodPressure(event.target.value);
  }

  render() {
    const {trtbp, smoker, diabetes, sbp} = this.props.patient;

    return (
      <div className='column params'>
        <div className='check'>
          <input id='ht' type='checkbox' defaultChecked={trtbp} onChange={this.onHypertensionTreatmentChange} />
          <label htmlFor='ht'>Faz tratamento de hipertensão?</label>
        </div>
        <div className='check'>
          <input id='smk' type='checkbox' defaultChecked={smoker} onChange={this.onSmokerChange} />
          <label htmlFor='smk'>Fumante habitual?</label>
        </div>
        <div className='check'>
          <input id='dbt' type='checkbox' defaultChecked={diabetes} onChange={this.onDiabetesChange} />
          <label htmlFor="dbt">Tem diabetes?</label>
        </div>
        <div>
          <input type='number' id='sbp' min='10' max='200' defaultValue={sbp} onChange={this.onSistolicBloodPressureChange} />
          <label htmlFor='sbp'>Pressão arterial sistólica</label>
        </div>
      </div>
    );
  }
}

export default AditionalParameters;
