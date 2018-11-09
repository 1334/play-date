import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import './index.css';

export class component extends Component {
  state = {
    date: moment(),
    title: '',
    description: '',
    location: '',
    ageFrom: '',
    ageTo: '',
    price: '',
    error: null
  };

  handleChange = date => {
    this.setState({ date: date });
  };

  handleChangeInput = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFilterAge = event => {
    const age = event.target.value;
    this.props.setAge(age);
    if (age) {
      this.props.getEvents({ ageFrom: age });
    } else {
      this.props.getEvents();
    }
  };

  render() {
    return (
      <div className="navbar-container">
        <div className="logo-area">
          <Link to="/">
            <h1>Play Dates</h1>
          </Link>
        </div>
        <div className="nav-area">
          <div className="nav-links">
            <Link to="/create">
              <Tooltip title="Add">
                <Button variant="fab" aria-label="Add">
                  <AddIcon />
                </Button>
              </Tooltip>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
