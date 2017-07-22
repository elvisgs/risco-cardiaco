import axios from 'axios';
import qs from 'query-string';
require('es6-promise').polyfill();
import PatientActions from '../actions/PatientActions'

const client = axios.create({
  baseURL: 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open'
});

const params = qs.parse(window.location.search);
const patientId = params.cns || "SMART-1137192";

const patientPromise = client.get(`/Patient/${patientId}`);
const labsPromise = client.get('/Observation', {
  params: {
    patient: patientId,
    code: ['30522-7', '14647-2', '2093-3', '2085-9', '8480-6'].join(',')
  }
});

const PatientSource = {
  fetchPatient: {
    remote(state) {
      return Promise.all([patientPromise, labsPromise]).then(([patientResponse, labsResponse]) => {
        const patient = patientResponse.data;
        const labs = labsResponse.data;

        const gender = patient.gender;

        const dob = new Date(patient.birthDate.replace(/-/g, '/'));
        const age = calculate_age(dob);

        const fname = patient.name[0].given.join(" ");
        const lname = patient.name[0].family.join(" ");

        const cholesterol = byCodes(labs, ["14647-2", "2093-3"]);
        const hdl = byCodes(labs, ["2085-9"]);
        let systolic = byCodes(labs, ["8480-6"]);

        const missingData = [];
        if (cholesterol.length == 0) missingData.push("Cholesterol");
        if (hdl.length == 0) missingData.push("HDL");

        // default logic for demonstration purposes
        if (systolic.length == 0) {
          systolic = "120";
        } else {
          systolic = systolic[0].valueQuantity.value;
          if (systolic < 105) {
            systolic = 105
          }
          if (systolic > 200) {
            systolic = 200;
          }
        }

        if (missingData.length > 0) {
          let missingDataMessage = "No results (";
          let delimiter = "";
          for(let i = 0; i < missingData.length; i++) {
            missingDataMessage += delimiter + missingData[i];
            delimiter = ", ";
          }
          missingDataMessage += ") for " + fname + " " + lname + ".";
          return Promise.reject(missingDataMessage);
        }

        const res = {
          birthday: dob.toLocaleDateString(),
          age: age,
          gender: gender,
          firstName: fname,
          lastName: lname,
          tcl: cholesterol_in_mg_per_dl(cholesterol[0]),
          hdl: cholesterol_in_mg_per_dl(hdl[0]),
          sbp: systolic,
          smoker: false,
          diabetes: false,
          trtbp: false,
          heartAge: 0,
          risk: 0
        };
        res.ldl = res.tcl - res.hdl;

        return res;
      });
    },

    local(state) {
      return null;
    },

    shouldFetch() {
      return true;
    },

    success: PatientActions.showPatient,
    error: PatientActions.fetchError,
    loading: PatientActions.loading
  }
};

function byCodes(labs, codes) {
  if (labs == null) {
    return null;
  }

  return labs.entry
    .map(entry => entry.resource)
    .filter(res => res.code.coding.some(coding => codes.indexOf(coding.code) !== -1));
}

/**
* Unit conversion formula.
* See values at http://www.amamanualofstyle.com/page/si-conversion-calculator
*/
function cholesterol_in_mg_per_dl(v) {
  if (v.valueQuantity.unit === "mg/dL"){
    return parseFloat(v.valueQuantity.value);
  }
  else if (v.valueQuantity.unit === "mmol/L"){
    return parseFloat(v.valueQuantity.value) / 0.026;
  }
  throw "Unanticipated cholesterol units: " + v.valueQuantity.unit;
};

function calculate_age(dob) {
  const today = new Date();
  const dob_month = dob.getMonth();
  const today_month = today.getMonth();
  let age = today.getYear() - dob.getYear();

  if (dob_month > today_month ||
    (dob_month === today_month && dob.getDate() > today.getDate())) {
    age -= 1;
  }

  return age;
}

export default PatientSource;
