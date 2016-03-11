import alt from '../alt';
import PatientActions from '../actions/PatientActions';
import PatientSource from '../sources/PatientSource';

class PatientStore {
  constructor() {
    this.patient = null;

    this.bindListeners({
      handleUpdatePatient: PatientActions.UPDATE_PATIENT,
      handleFetchPatient: PatientActions.FETCH_PATIENT,
      handlePatientFailed: PatientActions.PATIENT_FAILED
    });

    this.exportAsync(PatientSource);
  }

  handleUpdatePatient(patient) {
    this.patient = patient;
    this.errorMessage = null;
  }

  handleFetchPatient() {
    this.patient = null;
  }

  handlePatientFailed(errorMessage) {
    this.errorMessage = errorMessage;
  }
}

export default alt.createStores(PatientStore, 'PatientStore');
