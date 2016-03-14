import React, {Component} from 'react';
import AltContainer from 'alt-container';
import PatientStore from '../stores/PatientStore';
import PatientInfo from './PatientInfo';
import AditionalParameters from './AditionalParameters'

class CardiacRisk extends Component {
  render() {
    return (
      <AltContainer store={PatientStore}>
        <PatientInfo />
        <AditionalParameters />
      </AltContainer>
  );
  }
}

export default CardiacRisk;
