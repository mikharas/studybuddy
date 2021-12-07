import { connect } from 'react-redux';
import moment from 'moment';
import EventsExplorer from './EventsExplorer';
import { setFilter, getEvents } from '../../actions/eventsActions';

const applyFilter = (filter, events) => {
  let filteredEvents = events;
  if (filter.startTime) {
    filteredEvents = filteredEvents.filter(
      (e) => moment(e.date, 'ddd MMM DD yyyy HH:mm') >= filter.startTime,
    );
  }
  if (filter.showEndTime) {
    filteredEvents = filteredEvents.filter(
      (e) => moment(e.date, 'ddd MMM DD yyyy HH:mm') <= filter.endTime,
    );
  }
  if (filter.keyword) {
    filteredEvents = filteredEvents.filter((e) =>
      e.title.includes(filter.keyword),
    );
  }
  return filteredEvents;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  events: applyFilter(state.events.filter, state.events.events),
});

export default connect(mapStateToProps, { setFilter, getEvents })(
  EventsExplorer,
);
