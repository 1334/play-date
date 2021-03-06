import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/styles';
import { Like } from 'react-facebook';

import './index.css';

const styles = theme => ({
  cadre: {
    boxShadow: '8px 8px 6px #888888',
    margin: 10
  }
});

export class componentWithStyle extends React.Component {
  static propTypes = {
    event: PropTypes.shape({
      eventdate: PropTypes.string,
      eventtime: PropTypes.string,
      title: PropTypes.string,
      agefrom: PropTypes.number,
      ageto: PropTypes.number,
      price: PropTypes.price
    }),
    getEvents: PropTypes.func,
    history: PropTypes.object
  };

  handleClick = () => {
    this.props.history.push(`/${this.props.event.id}`);
  };

  render() {
    const { classes } = this.props;
    const auth = this.props.auth;
    return (
      <React-Fragment>
        <Card className={classes.cadre}>
          <CardActionArea>
            <div className="single-event" onClick={this.handleClick}>
              <CardContent>
                <img src={this.props.event.image} alt="event" />

                <div className="fields">
                  <div className="title">
                    <h2>{this.props.event.title}</h2>
                  </div>

                  <div className="date">
                    <h3>
                      {moment(new Date(this.props.event.eventdate)).format(
                        'dddd, MMMM Do YYYY'
                      )}
                    </h3>
                  </div>

                  <div className="time">
                    <h3>
                      {moment(this.props.event.eventtime).format('h:mm a')}
                    </h3>
                  </div>

                  <div className="location">
                    <h3> {this.props.event.location}</h3>
                  </div>

                  <div className="agefrom">
                    <h3>
                      Age From: {this.props.event.agefrom} -{' '}
                      {this.props.event.ageto}
                    </h3>
                  </div>
                  <div className="price">
                    {this.props.event.price === '0' ? (
                      <h3>Price: Free</h3>
                    ) : (
                      <h3>Price: {this.props.event.price}</h3>
                    )}
                  </div>
                </div>
                {auth.includes('facebook') ? (
                  <Like
                    href="http://codeworks.me"
                    colorScheme="dark"
                    showFaces
                    share
                  />
                ) : null}
              </CardContent>
            </div>
          </CardActionArea>
        </Card>
      </React-Fragment>
    );
  }
}

const component = withStyles(styles)(componentWithStyle);

export { component };
