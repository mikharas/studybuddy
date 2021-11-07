import { v4 as uuidv4 } from 'uuid';

const initialData = [
  {
    id: '1',
    title: 'Admin gathering!',
    description: 'A gathering for admins',
    host: 'admin',
    location: { lat: 43.768454, lng: -79.4176 },
    maxSpots: 5,
    date: 'OCT 5 @8PM',
    attendees: [],
  },
  {
    id: '2',
    title: 'Event 2',
    description: 'Study with me',
    host: 'user',
    location: { lat: 43.6596184, lng: -79.39692079999999 },
    maxSpots: 5,
    date: 'OCT 15 @5AM',
    attendees: [],
  },
  {
    id: '3',
    title: 'Admin gathering!',
    description: 'A gathering for admins',
    host: 'admin',
    location: { lat: 43.66722268215065, lng: -79.39352376463985 },
    maxSpots: 5,
    date: 'OCT 10 @9PM',
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
