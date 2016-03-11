import PatientActions from '../actions/PatientActions'

var patient = {
  birthday: '21-08-1954',
  age: 61,
  gender: 'male',
  firstName: 'João',
  lastName: 'Couves',
  tcl: 143,
  hdl: 31,
  ldl: patient.tcl - patient.hdl,
  sbp: 120,
  smoker: false,
  diabetes: false,
  trtbp: false
};

var PatientSource = {
  fetchPatient() {
    return {
      remote() {
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

      local() {
        // Never check locally, always fetch remotely.
        return null;
      },

      success: PatientActions.updatePatient,
      error: PatientActions.PatientFailed,
      loading: PatientActions.fetchPatient
    }
  }
};

module.exports = PatientSource;
