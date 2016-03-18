import alt from '../alt'

let patientActions = alt.generateActions(
  'showPatient',
  'setHypertensionTreatment',
  'setSmoker',
  'setDiabetes',
  'setSistolicBloodPressure',
  'fetchError',
  'loading'
);

export default patientActions;
