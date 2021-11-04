import { v4 as uuidv4 } from 'uuid';

const initialData = [
  {
    id: '1',
    title: 'Admin gathering!',
    description: 'A gathering for admins',
    host: 'admin',
    location: 'bahen',
    maxSpots: 5,
    date: 1,
    attendees: [],
  },
  {
    id: '2',
    title: 'Event 2',
    description: 'Study with me',
    host: 'user',
    location: 'campus',
    maxSpots: 5,
    date: 2,
    attendees: [],
  },
  {
    id: '3',
    title: 'Admin gathering!',
    description: 'A gathering for admins',
    host: 'admin',
    location: 'bahen',
    maxSpots: 5,
    date: 1,
    attendees: [],
  },
];

const eventsReducer = (state = initialData, { type, payload }) => {
  switch (type) {
    case 'CREATE_EVENT':
      return [
        ...state,
        {
          id: uuidv4(),
          title: payload.title,
          description: payload.description,
          host: payload.title,
          date: payload.date,
          location: payload.location,
          maxSpots: payload.maxSpots,
          attendees: [],
        },
      ];
    case 'ADD_ATTENDEE':
      return state.map((e) => {
        if (e.id === payload.eventID) {
          const newAttendees = e.attendees.slice();
          newAttendees.push(payload.attendee);
          return {
            ...e,
            attendees: newAttendees,
          };
        }
        return e;
      });
    case 'REMOVE_ATTENDEE':
      return state.map((e) => {
        if (e.id === payload.eventID) {
          const newAttendees = e.attendees.filter(
            (a) => a !== payload.attendee,
          );
          return {
            ...e,
            attendees: newAttendees,
          };
        }
        return e;
      });
    default:
      return state;
  }
};

export default eventsReducer;
