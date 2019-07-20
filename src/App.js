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
    let result = "";
    for (let i = 0; i < split.length; i++) {
      result += split[i][0];
    }
    return result.toUpperCase();
  }

  checkYear(birthday, year) {
    let dateSplit = birthday.split("/");
    return year === dateSplit[2];
  }

  getDate(birthday) {
    let dateSplit = birthday.split("/");
    let correctFormat = `${dateSplit[2]}-${dateSplit[0]}-${dateSplit[1]}`;
    return new Date(correctFormat);
  }

  getDay(birthday) {
    let date = this.getDate(birthday);
    let day = date.getDay();
    return day;
  }

  sortWithAgeComparator(a, b) {
    let bday1 = this.getDate(a.birthday);
    let bday2 = this.getDate(b.birthday);
    var ageDif = bday2.getTime() - bday1.getTime();
    return ageDif;
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
    let jsonData;
    try {
      jsonData = JSON.parse(jsonText);
    } catch (e) {
      alert("JSON Data is wrong. Check again");
      return;
    }
    let data = {};
    let sortedData = jsonData
      .filter(d => {
        return this.checkYear(d.birthday, yearText);
      })
      .sort((a, b) => {
        return this.sortWithAgeComparator(a, b);
      });
    for (let i = 0; i < sortedData.length; i++) {
      let day = this.getDay(sortedData[i].birthday);
      let initials = this.getInitials(sortedData[i].name);
      if (!initials || !weeks[day]) {
        alert("Something wrong with data. Please try again");
        return;
      }
      if (!data[weeks[day]]) data[weeks[day]] = [];
      data[weeks[day]].push(initials);
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
