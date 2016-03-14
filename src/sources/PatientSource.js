import PatientActions from '../actions/PatientActions'

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

const PatientSource = {
  fetchPatient: {
    remote(state) {
      return new Promise(function (resolve, reject) {
        // simulate an asynchronous flow where data is fetched on
        // a remote server somewhere.
        setTimeout(function () {

          // change this to `false` to see the error action being handled.
          if (true) {
            // resolve with some mock data
            resolve(patient);
          } else {
            reject('Things have broken');
          }
        }, 1000);
      });
    },

    local(state) {
      return patient;
    },

    success: PatientActions.showPatient,
    error: PatientActions.PatientFailed,
    loading: PatientActions.fetchPatient
  }
};

export default PatientSource;
