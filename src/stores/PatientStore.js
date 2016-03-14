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

    this.bindListeners({
      showPatient: PatientActions.SHOW_PATIENT
    });

    this.registerAsync(PatientSource);
  }

  showPatient(patient) {
    this.setState({patient});
    this.errorMessage = null;
  }
}

export default alt.createStore(PatientStore, 'PatientStore');
