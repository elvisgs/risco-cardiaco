import alt from '../alt'

class PatientActions {
  updatePatient(patient) {
    this.dispatch(patient);
  }

  fetchPatient() {
    this.dispatch();
  }

  patientFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

export default alt.createActions(PatientActions);
