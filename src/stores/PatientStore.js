import alt from '../alt';
import PatientActions from '../actions/PatientActions';
import PatientSource from '../sources/PatientSource';

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
  trtbp: false
};

class PatientStore {
  constructor() {
    this.state = {patient};

    this.bindActions(PatientActions);
  }

  showPatient(patient) {
    this.setState({patient});
    this.errorMessage = null;
  }

  setHypertensionTreatment(value) {
    patient.trtbp = value;
    this.setState({patient});
  }

  setSmoker(value) {
    patient.smoker = value;
    this.setState({patient});
  }

  setDiabetes(value) {
    patient.diabetes = value;
    this.setState({patient});
  }

  setSistolicBloodPressure(value) {
    patient.sbp = parseInt(value, 10);
    this.setState({patient});
  }
}

export default alt.createStore(PatientStore, 'PatientStore');
