import React, {Component} from 'react';
import Snap from 'snapsvg-cjs';

class Results extends Component {
  constructor() {
    super();

    this.width = 980;
    this.height = 330;
    this.start_x = 30;
    this.start_y = 25;
  }

  componentDidMount() {
    this.drawGraphics();
  }

  componentWillUpdate() {
    return false;
  }

  drawGraphics() {
    this.s = Snap('#holder');
    this.drawCholesterolLevel();
    this.drawLdlLevel();
    this.drawHdlLevel();
  }

  drawCholesterolLevel() {
    const s = this.s;
    const {tcl} = this.props.patient;

    const title = 'Nível de colesterol total',
        x = this.start_x,
        y = this.start_y,
        w = 710,
        h = 65,
        units_n = 30,
        unit_w = w / units_n,
        space = 2,
        cap_x = w + x,
        cap_y = y ,
        cap_mid_x = cap_x + 20,
        cap_mid_y = y + h / 2,
        cap_end_x = cap_x,
        cap_end_y = y + h;

    let rect_x, rect_y = y + h + 10;

    s.text(x, y - 8, title).attr({'font-size': '14px', 'fill': '#555'});

    s.rect(x, y, unit_w * 18 - space, h).attr({fill: '#A0BE78', stroke: 'none'});
    s.text(x, rect_y, 'Desejável').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(x, rect_y + 10, '0 mg/dL').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 18;
    s.rect(rect_x, y, unit_w * 4 - space, h).attr({fill: '#86AD52', stroke: 'none'});
    s.text(rect_x, rect_y, 'Limite').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(rect_x, rect_y + 10, '200 - 239').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 22;
    s.rect(rect_x, y, unit_w * 8, h).attr({fill: '#5E892B', stroke: 'none'});
    s.text(rect_x, rect_y, 'Alto').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(rect_x, rect_y + 10, '240+').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    s.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#5E892B', 'stroke': 'none'});

    const circle_x = (unit_w * (tcl / 10)) + x;
    s.circle(circle_x, y, 22).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    s.text(circle_x, y + 5, parseInt(tcl)).attr({'font': '20px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'});
  }

  drawLdlLevel() {
    const s = this.s;
    const {ldl} = this.props.patient;

    const title = 'LDL colesterol "ruim"',
          x = this.start_x + 100,
          y = this.start_y + 130,
          w = 610,
          h = 30,
          units_n = 30,
          unit_w = w / units_n,
          space = 2,
          cap_x = w + x,
          cap_y = y,
          cap_mid_x = cap_x + 10,
          cap_mid_y = y + h / 2,
          cap_end_x = cap_x,
          cap_end_y = y + h;

    let rect_x, rect_y = y + h + 10;

    s.text(x, y - 8, title).attr({'font-size': '14px', 'fill': '#555'})

    s.rect(x, y, unit_w * 10 - space, h).attr({fill: '#DCE6CC', stroke: 'none'});
    s.text(x, rect_y, 'Ideal').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(x, rect_y + 10, '0 mg/dL').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 10;
    s.rect(x + unit_w * 10, y, unit_w * 3 - space, h).attr({fill: '#BDD1A0', stroke: 'none'});
    s.text(rect_x, rect_y, ['Próximo', 'do ideal'])
      .attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'})
      .selectAll('tspan').forEach((ts, i) => { ts.attr({x: rect_x, y: rect_y + (12 * i)}) });
    s.text(rect_x, rect_y + 22, '100 - 129').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 13;
    s.rect(rect_x, y, unit_w * 3 - space, h).attr({fill: '#A0BE78', stroke: 'none'});
    s.text(rect_x, rect_y, ['Limite', 'alto'])
      .attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'})
      .selectAll('tspan').forEach((ts, i) => { ts.attr({x: rect_x, y: rect_y + (12 * i)}) });
    s.text(rect_x, rect_y + 22, '129 - 159').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 16;
    s.rect(rect_x, y, unit_w * 3 - space, h).attr({fill: '#86AD52', stroke: 'none'});
    s.text(rect_x, rect_y, 'Alto').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(rect_x, rect_y + 10, '160 - 189').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 19;
    s.rect(rect_x, y, unit_w * 11, h).attr({fill: '#5E892B', stroke: 'none'});
    s.text(rect_x, rect_y, 'Muito alto').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(rect_x, rect_y + 10, '190+').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    s.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#5E892B', 'stroke': 'none'});

    const circle_x = (unit_w * (ldl / 10)) + x;
    s.circle(circle_x, y, 18).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    s.text(circle_x, y + 5, parseInt(ldl)).attr({'font': '16px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'});
  }

  drawHdlLevel() {
    const s = this.s;
    const {hdl} = this.props.patient;

    var title = 'HDL colesterol "bom"',
        x = this.start_x + 100,
        y = this.start_y + 240,
        w = 610,
        h = 30,
        units_n = 10,
        unit_w = w / units_n,
        space = 2,
        cap_x = w + x,
        cap_y = y,
        cap_mid_x = cap_x + 10,
        cap_mid_y = y + h / 2,
        cap_end_x = cap_x,
        cap_end_y = y + h;

    let rect_x, rect_y = y + h + 10;

    s.text(x, y - 8, title).attr({'font-size': '16px', 'fill': '#555'});

    s.rect(x , y, unit_w * 4 - space, h).attr({fill: '#A0BE78', stroke: 'none'});
    s.text(x, rect_y, 'Risco alto').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(x, rect_y + 10, '0 mg/dL').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    rect_x = x + unit_w * 4;
    s.rect(rect_x, y, unit_w * 2 - space, h).attr({fill: '#86AD52', stroke: 'none'});
    s.text(rect_x, rect_y, 'Intermediário').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(rect_x, rect_y + 10, '40 - 59').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'})

    rect_x = x + unit_w * 6;
    s.rect(rect_x, y, unit_w * 4, h).attr({fill: '#5E892B', stroke: 'none'});
    s.text(rect_x, rect_y, 'Protetor').attr({'font-size': '12px', 'font-weight': 'normal', 'fill': '#555'});
    s.text(rect_x, rect_y + 10, '60+').attr({'font-size': '10px', 'font-weight': '200', 'fill': '#888'});

    s.path('M' + cap_x     + ' ' + cap_y +
           'L' + cap_mid_x + ' ' + cap_mid_y +
           'L' + cap_end_x + ' ' + cap_end_y +
           'z')
           .attr({'fill': '#5E892B', 'stroke': 'none'});

    const circle_x = (unit_w * (hdl / 10)) + x;
    s.circle(circle_x, y, 18).attr({'fill': '#F4804E', 'stroke': '#fff', 'stroke-width': '2px'});
    s.text(circle_x, y + 5, parseInt(hdl)).attr({'font': '16px Consolas, monospace', 'text-anchor': 'middle', 'font-weight': 'normal', 'fill': '#fff'});
  }

  render() {
    return (
      <div className='row'>
        <h2><span className='num'>2</span>Seus resultados</h2>
        <svg id='holder' width={this.width} height={this.height}></svg>
      </div>
    );
  }
}

export default Results;
