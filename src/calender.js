
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import events from "./events";
import BigCalendar from "react-big-calendar-like-google";
import moment, { now } from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
//import * as serviceWorker from './serviceWorker';
import CalDay from './calendermodal';

moment.locale("en");
BigCalendar.momentLocalizer(moment);
//https://stackoverflow.com/questions/53897005/reactjs-bigcalendar-adding-event
//put in event

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calender extends Component {
  state = {
    view: "month",
    myyear: 2015,
    mymonth: 3,
    myday: 11,
    //date: new Date(2015, 3, 13),
    width: 700,
    isModalOpen: false 
  };

  showDay = () => {
    console.log('inside day events');
  }

  handleEventClick = (e) => {
    var tday = e.toString();
    var myDay = new Date(tday);

    console.log('event clicked!', myDay.getMonth());
    if(this.state.view==="month") {
    this.setState({myday: myDay.getDate(), mymonth: myDay.getMonth(), view: "day"});
    }
  };

  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
   }

  componentDidMount() {
    window.addEventListener("resize", () => {
      /*this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });*/
    });
  }

  render() {
   // console.log((event) => console.log(event));

    return (
      <div style={{ height: 700 }}>

        <button onClick={() => this.setState({ view: "month", mymonth: this.state.mymonth - 1 })}>{'<'}</button>
        {/* <button onClick={() => this.setState({ view: "day" })}>Day</button> */}
        <button onClick={() => this.setState({ view: "month" })}>Month</button>
        <button onClick={() => this.setState({ view: "month", mymonth: this.state.mymonth + 1 })}>{'>'}</button>

        <BigCalendar
          selectable={true}
          events={events}
          //view={["month"]}
          view={this.state.view}
          style={{ height: 500, width: this.state.width }}
          onView={() => {}}
          //date={this.state.date}
          date={new Date(this.state.myyear, this.state.mymonth, this.state.myday)}
          onNavigate={date => this.setState({ date })}
          onSelectEvent={this.showDay}
          onSelectSlot={(event) => this.handleEventClick(event.slots, event)}
        />
            {/* <BigCalendar
              events={events}
              views={["month"]}
              defaultDate={new Date(2018, 3, 1)}
            /> */}
        {/* <CalDay isOpen={this.state.isModalOpen} /> */}
      </div>
    );
  }
}

export default Calender;
