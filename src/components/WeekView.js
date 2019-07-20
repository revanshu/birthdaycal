import React, { PureComponent } from "react";

class WeekView extends PureComponent {
  render() {
    const { weekName, data } = this.props;
    const colorGenerator = () => {
      let x = Math.floor(Math.random() * 256);
      let y = Math.floor(Math.random() * 256);
      let z = Math.floor(Math.random() * 256);
      let bgColor = "rgb(" + x + "," + y + "," + z + ")";
      return bgColor;
    };

    const root = Math.ceil(Math.sqrt(data.length));
    const contents = data.map(d => {
      const style = {
        background: colorGenerator(),
        height: 100 / root + "px",
        width: 100 / root + "px"
      };
      return (
        <div className="initials-block" style={style} key={d}>
          <span>{d}</span>
        </div>
      );
    });
    return (
      <div className="week-container" key={weekName}>
        <div className="week-header">
          <span>{weekName}</span>
        </div>
        <div className="week-content">{contents}</div>
      </div>
    );
  }
}

export default WeekView;
