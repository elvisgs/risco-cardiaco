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
        <label>
          <input type='checkbox' defaultChecked={trtbp} onChange={this.onHypertensionTreatmentChange} />
          Faz tratamento de hipertensão?
        </label><br/>
        <label>
          <input type='checkbox' defaultChecked={smoker} onChange={this.onSmokerChange} />
          Fumante habitual?
        </label><br/>
        <label>
          <input type='checkbox' defaultChecked={diabetes} onChange={this.onDiabetesChange} />
          Tem diabetes?
        </label><br/>
        <input type='text' id='sbp' defaultValue={sbp} onChange={this.onSistolicBloodPressureChange} />
        <label htmlFor='sbp'>Pressão arterial sistólica</label>
      </div>
    );
  }
}

export default AditionalParameters;
