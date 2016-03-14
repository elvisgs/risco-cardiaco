import alt from '../alt'

let patientActions = alt.generateActions(
  'showPatient',
  'setHypertensionTreatment',
  'setSmoker',
  'setDiabetes',
  'setSistolicBloodPressure'
);

window.patientActions = patientActions;
export default patientActions;
