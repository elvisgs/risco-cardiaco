/**
  * Source: https://www.framinghamheartstudy.org/risk-functions/cardiovascular-disease/10-year-risk.php
  */

import assign from 'object-assign';

// Coefficients
const coefsMaleNoTrtbp = {
  age: 3.06117, sbp: 1.93303, tcl: 1.1237, hdl: -0.93263, smoker: 0.65451, diabetes: 0.57367
};

const coefsFemaleNoTrtbp = {
  age: 2.32888, sbp: 2.76157, tcl: 1.20904, hdl: -0.70833, smoker: 0.52873, diabetes: 0.69154
};

const coefSbpMaleTrtbp = 1.99881; // replaces sbp coef if being treated
const coefSbpFemaleTrtbp = 2.82263; // replaces sbp coef if being treated

// Is contribution to some coef*data or coef*ln(data)?
const useLogData = {
  age: true, sbp: true, tcl: true, hdl: true, smoker: false, diabetes: false
};

// Constant term in sum
const betaZeroMale = -23.9802;
const betaZeroFemale = -26.1931;

// Base for pow() calculation
const baseMale = 0.88936;
const baseFemale = 0.95012;

// Baseline values. Need to fill in gender and age
const baselineNormalData = {
  gender: 0,  age: 30, sbp: 125, tcl: 180, hdl: 45, smoker: 0, diabetes: 0, trtbp: 0
};

export function calcHeartAge(riskVal, gender) {
  let loAge  = 10;  // no real minimum bound, but 10 is a practical one
  let hiAge = 86;          // 85 is max

  let testAge;

  let testData = assign({}, baselineNormalData);
  testData['gender'] = gender;

  // threshold should be < half of the desired accuracy (.5 in this case)
  while ( (hiAge - loAge) > .2) {
    testAge = (hiAge + loAge) / 2.0;
    testData['age'] = testAge;

    let testRisk = calcRisk(testData);

    if (testRisk < riskVal) {
      loAge = testAge;
    }
    else if (testRisk > riskVal) {
      hiAge = testAge;
    }
    else {
      hiAge = testAge;
      loAge = testAge;
    }
  }

  return testAge;
}

 export function calcRisk(data) {
  let coefs = {};
  let base;
  let betaZero;

  data.smoker = ~~data.smoker;
  data.diabetes = ~~data.diabetes;
  data.trtbp = ~~data.trtbp;

  if (data.gender === 'male') { // male
    betaZero = betaZeroMale;
    base = baseMale;
    coefs = assign({}, coefsMaleNoTrtbp); // make a copy, since we might change it
    if (data.trtbp)
      coefs['sbp'] = coefSbpMaleTrtbp;
  }
  else {
    betaZero = betaZeroFemale;
    base = baseFemale;
    coefs = assign({}, coefsFemaleNoTrtbp); // copy the array
    if (data.trtbp)
      coefs['sbp'] = coefSbpFemaleTrtbp;
  }

  // do computation
  let betaSum = betaZero;
  for(let k in coefs) {
    let m = parseFloat(data[k]);
    if (useLogData[k])
      m = Math.log(m);

    let dBeta = coefs[k] * m;

    betaSum += dBeta;
  }

  let risk =  1.0 - Math.pow(base, Math.exp(betaSum));

  return risk;
}

