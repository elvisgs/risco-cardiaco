import React, {Component} from 'react';
import PatientStore from '../stores/PatientStore';

class BaseComponent extends Component {
  static getStores() {
    return [PatientStore];
  }

  static getPropsFromStores() {
    return PatientStore.getState();
  }
}

export default BaseComponent;
