import React, {Component} from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import PatientStore from '../stores/PatientStore';
import PatientInfo from './PatientInfo';
import AditionalParameters from './AditionalParameters';
import AboutTest from './AboutTest';
import Results from './Results';
import Risk from './Risk';
import AndNow from './AndNow';

class CardiacRisk extends Component {
  componentWillMount() {
    PatientStore.fetchPatient();
    this.toggleTitle();
  }

  toggleTitle() {
    if (window.location.href.contains('notitle'))
      document.getElementById('risk-title').remove();
  }

  static getStores() {
    return [PatientStore];
  }

  static getPropsFromStores() {
    return PatientStore.getState();
  }

  render() {
    if (PatientStore.isLoading())
      return <div className='loading'>Carregando...</div>;

    const patient = this.props.patient;

    return (
      <div>
        <div className='row'>
          <div className='columns'>
            <PatientInfo patient={patient} />
            <AditionalParameters patient={patient} />
          </div>
        </div>
        <AboutTest />
        <Results patient={patient} />
        <Risk patient={patient} />
        <AndNow patient={patient} />
      </div>
    )
  }
}

export default connectToStores(CardiacRisk);
