import React, { Component } from "react";
import "./App.css";
import WeekView from "./components/WeekView";
import { dummyData, weeks } from "./constants";

class App extends Component {
  state = {
    jsonText: dummyData,
    yearText: "",
    weeksData: {}
  };

  constructor() {
    super();
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleYearChange(event) {
    this.setState({ yearText: event.target.value });
  }

  handleJsonChange(event) {
    this.setState({ jsonText: event.target.value });
  }

  getInitials(name) {
    let split = name.split(" ");
    return (split[0][0] + split[1][0]).toUpperCase();
  }

  checkYear(birthday, year) {
    let dateSplit = birthday.split("/");
    return year === dateSplit[2];
  }

  getDay(birthday) {
    let dateSplit = birthday.split("/");
    let correctFormat = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
    let date = new Date(correctFormat);
    let day = date.getDay();
    return day;
  }

  onUpdate() {
    const { yearText, jsonText } = this.state;

    if (!yearText || !jsonText) {
      alert("Please Enter both the field");
      return;
    }
    if (isNaN(parseFloat(yearText))) {
      alert("Please Enter Year as Number");
      return;
    }

    const jsonData = JSON.parse(jsonText);
    let data = {};
    for (let i = 0; i < jsonData.length; i++) {
      if (this.checkYear(jsonData[i].birthday, yearText)) {
        let day = this.getDay(jsonData[i].birthday);
        let initials = this.getInitials(jsonData[i].name);
        if (!data[weeks[day]]) data[weeks[day]] = [];
        data[weeks[day]].push(initials);
      }
    }

    this.setState({ weeksData: data });
  }

  render() {
    const { weeksData } = this.state;
    const weeksView = weeks.map(week => {
      let data = weeksData[week] ? weeksData[week] : [];
      return <WeekView weekName={week} data={data} key={week} />;
    });
    return (
      <div className="App">
        <div>
          <h4>Birthday Cal</h4>
        </div>
        <div className="weeks-parent">{weeksView}</div>
        <div className="input-row">
          <div className="json-input-container">
            <textarea
              rows="4"
              cols="50"
              value={this.state.jsonText}
              className="text-area"
              onChange={e => {
                this.handleJsonChange(e);
              }}
            />
          </div>
          <div className="year-input-container">
            <p> Year </p>
            <input
              type="text"
              placeholder="Enter year"
              value={this.state.yearText}
              onChange={e => {
                this.handleYearChange(e);
              }}
            />
            <button type="button" onClick={this.onUpdate}>
              {" "}
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
