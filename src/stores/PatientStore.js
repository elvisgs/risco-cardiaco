import alt from '../alt';
import PatientActions from '../actions/PatientActions';
import PatientSource from '../sources/PatientSource';
import {calcHeartAge, calcRisk} from '../util/lipidCalc';

class PatientStore {
  constructor() {
    this.bindActions(PatientActions);
    this.registerAsync(PatientSource);
  }

  doCalculations() {
    let risk = calcRisk(this.patient);
    let heartAge = calcHeartAge(risk, this.patient.gender);
    this.patient.risk = (Math.round(risk * 1000) / 10).toFixed(1);
    this.patient.heartAge = Math.round(heartAge);
  }

  showPatient(patient) {
    this.patient = patient;
    this.doCalculations();
    this.setState({patient: this.patient});
  }

  setHypertensionTreatment(value) {
    this.patient.trtbp = value;
    this.doCalculations();
    this.setState({patient: this.patient});
  }

  setSmoker(value) {
    this.patient.smoker = value;
    this.doCalculations();
    this.setState({patient: this.patient});
  }

  setDiabetes(value) {
    this.patient.diabetes = value;
    this.doCalculations();
    this.setState({patient: this.patient});
  }

  setSistolicBloodPressure(value) {
    this.patient.sbp = parseInt(value, 10);
    this.doCalculations();
    this.setState({patient: this.patient});
  }

  fetchError(errorMessage) {
    alert(errorMessage);
  }
}

export default alt.createStore(PatientStore, 'PatientStore');
