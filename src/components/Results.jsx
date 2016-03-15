import React, {Component} from 'react';

class Results extends Component {
  componentWillUpdate() {
    return false;
  }

  render() {
    const {tcl, ldl, hdl} = this.props.patient;

    return (
      <div>
        <h2><span>2</span>Seus resultados</h2>
        <div>Nível de colesterol total: {tcl}</div>
        <div>LDL colesterol "ruim": {ldl}</div>
        <div>HDL colesterol "bom": {hdl}</div>
      </div>
    );
  }
}

export default Results;
