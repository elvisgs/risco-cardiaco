import React, {Component} from 'react';
import AltContainer from 'alt-container';
import PatientStore from '../stores/PatientStore';
import PatientInfo from './PatientInfo';

class CardiacRisk extends Component {
  render() {
    return (
      <AltContainer store={PatientStore}>
        <PatientInfo />
      </AltContainer>
  );
  }
}

export default CardiacRisk;
