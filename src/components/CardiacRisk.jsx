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
      <div>
        <div className='row'>
          <div className='columns'>
            <PatientInfo />
            <AditionalParameters />
          </div>
        </div>
        <AboutTest />
        <AltContainer store={PatientStore} component={Results} />
        <AltContainer store={PatientStore} component={Risk} />
        <AndNow />
      </div>
  );
  }
}

export default CardiacRisk;
