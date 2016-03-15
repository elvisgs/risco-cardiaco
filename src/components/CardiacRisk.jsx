import React, {Component} from 'react';
import AltContainer from 'alt-container';
import PatientStore from '../stores/PatientStore';
import PatientInfo from './PatientInfo';
import AditionalParameters from './AditionalParameters';
import AboutTest from './AboutTest';
import Results from './Results';
import Risk from './Risk';
import AndNow from './AndNow';

class CardiacRisk extends Component {
  render() {
    return (
      <AltContainer store={PatientStore}>
        <PatientInfo />
        <AditionalParameters />
        <AboutTest />
        <Results />
        <Risk />
        <AndNow />
      </AltContainer>
  );
  }
}

export default CardiacRisk;
