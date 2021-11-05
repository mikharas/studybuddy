import { connect } from 'react-redux';
import { addAttendee, removeAttendee } from '../../actions/eventsActions';
import EventsExplorer from './EventsExplorer';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  events: state.events,
});

export default connect(mapStateToProps, {})(EventsExplorer);
