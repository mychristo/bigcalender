
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import events from "./events";
import BigCalendar from "react-big-calendar-like-google";
import moment, { now } from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
//import * as serviceWorker from './serviceWorker';
import Modal from "react-modal";

moment.locale("en");
BigCalendar.momentLocalizer(moment);
//https://stackoverflow.com/questions/53897005/reactjs-bigcalendar-adding-event
//put in event

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

const style = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.66)",
    zIndex: 10000
  },
  content: {
    margin: "0 auto"
  }
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class Calender extends Component {
  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  state = {
    view: "month",
    myyear: 2015,
    mymonth: 3,
    myday: 11,
    //date: new Date(2015, 3, 13),
    width: 700,
    modalIsOpen: false,
    eventdayStart: 0,
    eventdayEnd: 0,
    eventtitle: ""
  };

  // showDay = () => {
  //   console.log('inside day events');
  // }
 
    openModal(myday) {
      // var tday = myday.toString();
      // var sDay = new Date(tday);
      console.log('sDay: ', myday.start.toString());
      // var dstart = myday.start.getDate().toString();
      // var dend = myday.end.getDate().toString();
      var dstart = myday.start.toString();
      var dend = myday.end.toString();

      if(this.state.view==="month") {
      this.setState({ 
        modalIsOpen: true, 
        eventtitle: myday.title,
        eventdayStart: dstart,
        eventdayEnd: dend
      });
     }
    }

    afterOpenModal() {
      // references are now sync'd and can be accessed.
      // this.subtitle.style.color = "#f00";
    }

  closeModal() {
    this.setState({ modalIsOpen: false });
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

  componentDidMount = () => {
    console.log('Estado: ', this.state)
  }

  render() {
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
          onSelectEvent={(event) => this.openModal(event)}
          //onSelectEvent={this.handleOpenModal}
          onSelectSlot={(event) => this.handleEventClick(event.slots, event)}
        />

        {/* <button onClick={this.openModal}>Open Modal</button> */}

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          style={style}
        >
          <table>
            <tr>
              <td colspan='2'><b>Edit Post</b></td>
            </tr>
            <tr>
              <td>Post: </td>
              <td>{this.state.eventtitle}</td>
            </tr>
            <tr>
              <td>Start: </td>
              <td>{this.state.eventdayStart}</td>
            </tr>
            <tr>
              <td>End: </td>
              <td>{this.state.eventdayEnd}</td>
            </tr>
            <tr>
              <td colspan='2'><button onClick={this.closeModal}>close</button></td>
            </tr>
          </table>

        </Modal>

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
