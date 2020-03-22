// import React from 'react';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import events from "./events";
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import * as serviceWorker from './serviceWorker';

moment.locale("en");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calender extends Component {
  state = {
    view: "day",
    date: new Date(2015, 3, 12),
    //date: new Date(2015, 3, 13),
    width: 700
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      /*this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });*/
    });
  }

  render() {
    return (
      <div style={{ height: 700 }}>

        <button onClick={() => this.setState({ view: "month" })}>{'<'}</button>
        <button onClick={() => this.setState({ view: "day" })}>Day</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button>
        <button onClick={() => this.setState({ view: "month" })}>{'>'}</button>

        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={events}
          step={60}
          views={allViews}
          view={this.state.view}
          onView={() => {}}
          //date={this.state.date}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    );
  }
}

export default Calender;
