import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import './index.css';

export class component extends Component {
  state = {
    eventdate: null,
    title: '',
    description: '',
    location: '',
    agefrom: '',
    ageto: '',
    price: '',
    searchText: '',
    free: false,
    age: '',
    error: null,
    checked: true
  };

  handleChangeDate = date => {
    this.props.setDate(date);
  };

  handleFilterAge = event => {
    const age = event.target.value;
    this.props.setAge(age);
  };

  handleChangeFree = event => {
    const checked = event.target.checked;
    this.props.setFree(checked);
  };

  handleSearch = event => {
    const searchText = event.target.value;
    this.props.searchEvents(searchText);
  };

  componentDidUpdate(prevProps) {
    const { age, free, date, searchText } = this.props;
    if (
      age === prevProps.age &&
      free === prevProps.free &&
      date === prevProps.date &&
      searchText === prevProps.searchText
    ) {
      return;
    }
    const queryObject = {};
    if (date) {
      queryObject.eventdate = date.format('YYYY-MM-DD');
    }
    if (free === true) {
      queryObject.price = '0';
    }
    if (age || age === 0) {
      queryObject.agefrom = age;
    }
    if (searchText) {
      queryObject.q = searchText;
    }
    this.props.getEvents(queryObject);
  }

  render() {
    return (
      <div className="filter-container">
        <input
          className="search-field"
          placeholder="Search a play date..."
          type="text"
          value={this.props.searchText}
          onChange={this.handleSearch}
        />

        <DatePicker
          className="datePicker"
          placeholderText="Filter by date"
          selected={this.props.date}
          onChange={this.handleChangeDate}
          dateFormat="DD/MM/YY"
        />

        <input
          value={this.props.age}
          onChange={this.handleFilterAge}
          type="number"
          placeholder="Filter by Age"
          min="0"
        />

        <FormControlLabel
          className="toggle"
          control={
            <Switch
              checked={this.props.checked}
              onChange={this.handleChangeFree}
              value="checked"
            />
          }
          label="Only Free Events"
        />
      </div>
    );
  }
}
