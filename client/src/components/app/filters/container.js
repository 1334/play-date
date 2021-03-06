import { connect } from 'react-redux';

import { component } from './component';
import { redux } from '../../../redux';

const mapStateToProps = state => ({
  events: state.getEvents.data.data || [],
  age: state.filters.age,
  free: state.filters.free,
  date: state.filters.date,
  searchText: state.filters.searchText
});
const mapDispatchToProps = dispatch => ({
  getEvents: params => dispatch(redux.rest.actions.getEvents(params)),
  setAge: age => dispatch(redux.filters.actionCreators.setAge(age)),
  setFree: value => dispatch(redux.filters.actionCreators.setFree(value)),
  setDate: date => dispatch(redux.filters.actionCreators.setDate(date)),
  searchEvents: searchText =>
    dispatch(redux.filters.actionCreators.searchEvents(searchText))
});

export const container = connect(
  mapStateToProps,
  mapDispatchToProps
)(component);
