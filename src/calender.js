// import React from 'react';
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import events from "./events";
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
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
    view: "day",
    myyear: 2015,
    mymonth: 3,
    myday: 13,
    //date: new Date(2015, 3, 13),
    width: 700,
    isModalOpen: false 
  };

  showDay = () => {
    //this.setState({ isModalOpen: true });
    //this.setState({ view: "day", myday: });
    console.log('inside day events');
  }

  handleEventClick = (e) => {
    //const {event} = this.props;
    //this.props.onSelect(event);
    var tdate = e.toString();
    var myDate = new Date(tdate);
    console.log('event clicked!', myDate.getDate());
    this.setState({myday: myDate.getDate(), view: "day"});
  };

  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
   }

  // var dateString = "2018-05-18T04:00:00.000Z"
  // document.getElementById("results").innerHTML = formatDate(dateString);

  componentDidMount() {
    window.addEventListener("resize", () => {
      /*this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });*/
    });
  }

  render() {
    console.log('this.state.view: ', this.state.view);

    return (
      <div style={{ height: 700 }}>

        <button onClick={() => this.setState({ view: "month", mymonth: this.state.mymonth - 1 })}>{'<'}</button>
        <button onClick={() => this.setState({ view: "day" })}>Day</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button>
        <button onClick={() => this.setState({ view: "month", mymonth: this.state.mymonth + 1 })}>{'>'}</button>

        <BigCalendar
          selectable={true}
          events={events}
          //views={["month"]}
          view={this.state.view}
          style={{ height: 500, width: this.state.width }}
          onView={() => {}}
          //date={this.state.date}
          date={new Date(this.state.myyear, this.state.mymonth, this.state.myday)}
          onNavigate={date => this.setState({ date })}
          //onClick={console.log('inside click event')}
          //onSelectEvent={event => this.showDay}
          onSelectEvent={this.showDay}
          //onSelectSlot={this.handleEventClick(event)}
          //onSelectSlot={(event) => console.log(this.formatDate(event.slots))}
         // onSelectSlot={(event) => console.log(this.formatDate(event.slots))}
          //onSelectSlot={(event) => this.handleEventClick(this.formatDate(event.slots))}
          onSelectSlot={(event) => this.handleEventClick(event.slots)}

          // onSelectSlot={(event) => console.log(this.formatDate(event.slots))}
         // onSelectSlot={(event) => console.log(this.formatDate(event.slots))}

          //onSelectSlot={(event) => console.log(this.formatDate(event.slots))}
         // onSelectSlot={(event) => this.setState({day: this.formatDate(event.slots)})}
          //eventPropGetter={(this.eventStyleGetter)}
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
