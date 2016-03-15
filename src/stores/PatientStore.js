import alt from '../alt';
import PatientActions from '../actions/PatientActions';
import PatientSource from '../sources/PatientSource';
import {calcHeartAge, calcRisk} from '../util/lipidCalc';

const patient = {
  birthday: '21-08-1954',
  age: 61,
  gender: 'male',
  firstName: 'João',
  lastName: 'Couves',
  tcl: 143,
  hdl: 31,
  ldl: 112,
  sbp: 120,
  smoker: false,
  diabetes: false,
  trtbp: false,
  heartAge: 0,
  risk: 0
};

class PatientStore {
  constructor() {
    this.doCalculations();

    this.state = {patient};

    this.bindActions(PatientActions);
  }

  doCalculations() {
    let risk = calcRisk(patient);
    let heartAge = calcHeartAge(risk, patient.gender);
    patient.risk = Math.round(risk * 1000) / 10;
    patient.heartAge = Math.round(heartAge);
  }

  showPatient(patient) {
    this.setState({patient});
    this.errorMessage = null;
  }

  setHypertensionTreatment(value) {
    patient.trtbp = value;
    this.doCalculations();
    this.setState({patient});
  }

  setSmoker(value) {
    patient.smoker = value;
    this.doCalculations();
    this.setState({patient});
  }

  setDiabetes(value) {
    patient.diabetes = value;
    this.doCalculations();
    this.setState({patient});
  }

  setSistolicBloodPressure(value) {
    patient.sbp = parseInt(value, 10);
    this.doCalculations();
    this.setState({patient});
  }
}

export default alt.createStore(PatientStore, 'PatientStore');
