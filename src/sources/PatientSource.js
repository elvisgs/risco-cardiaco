import PatientActions from '../actions/PatientActions'
import $ from 'jquery';
import fhir from '../util/fhir-client-cjs';

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

const smart = fhir.client({
  serviceUrl: "https://fhir-open-api-dstu2.smarthealthit.org",
  patientId: "1137192"
});

const pt = smart.patient.read();
const labs = smart.patient.api.fetchAll({
  type: "Observation",
  query: {code: {$or: ['30522-7', '14647-2', '2093-3', '2085-9', '8480-6']}}
});

const PatientSource = {
  fetchPatient: {
    remote(state) {
      const ret = $.Deferred();

      $.when(pt, labs).done(function(patient, labs){
        const byCodes = smart.byCodes(labs, 'code');

        const gender = patient.gender;

        const dob = new Date(patient.birthDate.replace(/-/g, '/'));
        const age = calculate_age(dob);

        const fname = patient.name[0].given.join(" ");
        const lname = patient.name[0].family.join(" ");

        const cholesterol = byCodes("14647-2", "2093-3");
        const hdl = byCodes("2085-9");
        let systolic = byCodes("8480-6");

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
          alert(missingDataMessage);
          return ret.reject();
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

        ret.resolve(res);
      });

      return ret.promise();
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

export default PatientSource;
